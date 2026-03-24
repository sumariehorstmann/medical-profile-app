import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function payfastProcessUrl() {
  return process.env.PAYFAST_ENV === "sandbox"
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";
}

function encode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignature(
  data: Record<string, string>,
  passphrase?: string
) {
  const pairs: string[] = [];

  for (const key in data) {
    if (key !== "signature" && data[key]) {
      pairs.push(`${key}=${encode(data[key])}`);
    }
  }

  if (passphrase) {
    pairs.push(`passphrase=${encode(passphrase)}`);
  }

  return crypto.createHash("md5").update(pairs.join("&")).digest("hex");
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
          setAll() {
            // no-op in this route
          },
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

    const body = await req.json();

    const publicId = String(body?.publicId ?? "").trim();
    const email = String(body?.buyerEmail ?? "").trim();
    const firstName = String(body?.firstName ?? "").trim();
    const lastName = String(body?.lastName ?? "").trim();

    if (!publicId || !email) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("user_id, public_id")
      .eq("public_id", publicId)
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const { data: existingSub, error: existingSubError } = await supabaseAdmin
      .from("subscriptions")
      .select("user_id, status, current_period_end")
      .eq("user_id", user.id)
      .eq("status", "active")
      .gt("current_period_end", new Date().toISOString())
      .maybeSingle();

    if (existingSubError) {
      console.error("SUBSCRIPTION CHECK ERROR:", existingSubError);
      return NextResponse.json(
        { error: "Failed to check existing subscription." },
        { status: 500 }
      );
    }

    if (existingSub) {
      return NextResponse.json(
        { error: "This profile is already on Premium." },
        { status: 400 }
      );
    }

    const paymentId = `rroi_${publicId}_${Date.now()}`;

    const { error: paymentError } = await supabaseAdmin
      .from("payments")
      .insert({
        user_id: profile.user_id,
        public_id: profile.public_id,
        provider: "payfast",
        provider_payment_id: paymentId,
        amount: 299,
        status: "pending",
      });

    if (paymentError) {
      console.error("PAYMENT INSERT ERROR:", paymentError);
      return NextResponse.json(
        { error: "Payment insert failed" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    const data: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${baseUrl}/billing/success`,
      cancel_url: `${baseUrl}/billing/cancel`,
      notify_url: `${baseUrl}/api/payfast/itn`,
      name_first: firstName,
      name_last: lastName,
      email_address: email,
      m_payment_id: paymentId,
      amount: "299.00",
      item_name: "RROI Premium",
      custom_str1: publicId,
      custom_str2: email,
    };

    data.signature = buildSignature(
      data,
      process.env.PAYFAST_PASSPHRASE
    );

    console.log("PAYFAST BASE URL:", baseUrl);
    console.log("PAYFAST NOTIFY URL:", `${baseUrl}/api/payfast/itn`);

    return NextResponse.json({
      processUrl: payfastProcessUrl(),
      fields: data,
    });
  } catch (err) {
    console.error("SUBSCRIBE ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}