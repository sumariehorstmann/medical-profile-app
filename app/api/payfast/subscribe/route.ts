import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// 🔒 LOCKED PRICING
const BASE_PRICE = 399;
const AFFILIATE_PRICE = 369;
const DISCOUNT_AMOUNT = 30;

function payfastProcessUrl() {
  return process.env.PAYFAST_URL!;
}

function encode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignature(data: Record<string, string>, passphrase?: string) {
  const keys = Object.keys(data)
    .filter((key) => {
      const value = data[key];
      return (
        key !== "signature" &&
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      );
    })
    .sort();

  const pairs: string[] = keys.map(
    (key) => `${key}=${encode(String(data[key]))}`
  );

  

  return crypto.createHash("md5").update(pairs.join("&")).digest("hex");
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    const publicId = String(body?.publicId ?? "").trim();
    const email = String(body?.buyerEmail ?? "").trim();
    const firstName = String(body?.firstName ?? "").trim();
    const lastName = String(body?.lastName ?? "").trim();
    const affiliateCode = String(body?.affiliateCode ?? "")
      .trim()
      .toUpperCase();
    const agreedToLegal = body?.agreedToLegal === true;

    if (!agreedToLegal) {
      return NextResponse.json(
        { error: "You must agree to the Terms, Privacy Policy, and Refund Policy." },
        { status: 400 }
      );
    }

    if (!publicId || !email) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const requiredEnv = [
      "PAYFAST_MERCHANT_ID",
      "PAYFAST_MERCHANT_KEY",
      "PAYFAST_URL",
      "NEXT_PUBLIC_BASE_URL",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        return NextResponse.json(
          { error: `Missing ${key}` },
          { status: 500 }
        );
      }
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("user_id, public_id")
      .eq("public_id", publicId)
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { data: existingSub } = await supabaseAdmin
      .from("subscriptions")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("status", "approved")
      .gt("current_period_end", new Date().toISOString())
      .maybeSingle();

    if (existingSub) {
      return NextResponse.json(
        { error: "Already on Premium." },
        { status: 400 }
      );
    }

    let finalAmount = BASE_PRICE;

    if (affiliateCode) {
      const { data: affiliate } = await supabaseAdmin
        .from("affiliates")
        .select("id")
        .eq("affiliate_code", affiliateCode)
        .eq("status", "approved")
        .maybeSingle();

      if (!affiliate) {
        return NextResponse.json(
          { error: "Invalid affiliate code." },
          { status: 400 }
        );
      }

      finalAmount = AFFILIATE_PRICE;
    } else {
      finalAmount = BASE_PRICE;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!.trim();
    const agreedAt = new Date().toISOString();
    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent");

    const { error: consentError } = await supabaseAdmin
      .from("payment_consents")
      .insert({
        user_id: user.id,
        consent_type: "premium_checkout",
        terms_url: `${baseUrl}/terms`,
        privacy_url: `${baseUrl}/privacy`,
        refund_url: `${baseUrl}/refund-policy`,
        agreed_at: agreedAt,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (consentError) {
      console.error("CONSENT LOG ERROR:", consentError);
      return NextResponse.json(
        { error: "Failed to record legal agreement." },
        { status: 500 }
      );
    }

    const paymentId = `rroi_${publicId}_${Date.now()}`;

    const { error: paymentError } = await supabaseAdmin.from("payments").insert({
      user_id: profile.user_id,
      public_id: profile.public_id,
      provider: "payfast",
      provider_payment_id: paymentId,
      amount: finalAmount,
      status: "pending",
    });

    if (paymentError) {
      console.error("PAYMENT INSERT ERROR:", paymentError);
      return NextResponse.json(
        { error: "Failed to create payment record." },
        { status: 500 }
      );
    }

    console.log("FINAL AMOUNT SENT TO PAYFAST:", finalAmount);

    const data: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${baseUrl}/billing/success`,
      cancel_url: `${baseUrl}/billing/cancel`,
      notify_url: `${baseUrl}/api/payfast/itn`,
      name_first: firstName || "RROI",
      name_last: lastName,
      email_address: email,
      m_payment_id: paymentId,
      amount: finalAmount.toFixed(2),
      item_name: "RROI Premium Kit",
      item_description: "RROI Premium Kit",
      custom_str1: publicId,
      custom_str2: email,
      
    };

    data.signature = buildSignature(data);

    return NextResponse.json({
      processUrl: payfastProcessUrl(),
      fields: data,
    });
  } catch (err) {
    console.error("SUBSCRIBE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}