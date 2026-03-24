import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function payfastProcessUrl() {
  return process.env.PAYFAST_ENV === "sandbox"
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";
}

function encodeValue(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignatureString(data: Record<string, string>, passphrase?: string) {
  const pairs: string[] = [];

  for (const key in data) {
    const value = data[key];

    if (
      key !== "signature" &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      pairs.push(`${key}=${encodeValue(String(value))}`);
    }
  }

  if (passphrase && passphrase.trim() !== "") {
    pairs.push(`passphrase=${encodeValue(passphrase)}`);
  }

  return pairs.join("&");
}

function buildSignature(data: Record<string, string>, passphrase?: string) {
  const signatureString = buildSignatureString(data, passphrase);
  return crypto.createHash("md5").update(signatureString).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    if (!merchantId || !merchantKey) {
      return NextResponse.json(
        { error: "Missing PAYFAST_MERCHANT_ID or PAYFAST_MERCHANT_KEY in environment variables" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const publicId = String(body?.publicId ?? "").trim();
    const buyerEmail = String(body?.buyerEmail ?? "").trim();
    const buyerFirstName = String(body?.firstName ?? "").trim();
    const buyerLastName = String(body?.lastName ?? "").trim();

    if (!publicId || !buyerEmail) {
      return NextResponse.json(
        { error: "Missing publicId or buyerEmail" },
        { status: 400 }
      );
    }

    const amount = "299.00";
    const paymentId = `rroi_${publicId}_${Date.now()}`;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, public_id")
      .eq("public_id", publicId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const { error: paymentInsertError } = await supabase
      .from("payments")
      .insert({
        user_id: profile.user_id,
        public_id: profile.public_id,
        provider: "payfast",
        provider_payment_id: paymentId,
        amount: 299.00,
        status: "pending",
      });

    if (paymentInsertError) {
      console.error("PAYMENT INSERT ERROR:", paymentInsertError);
      return NextResponse.json(
        { error: "Failed to create payment record" },
        { status: 500 }
      );
    }

    const data: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/billing/success`,
      cancel_url: `${baseUrl}/billing/cancel`,
      notify_url: `${baseUrl}/api/payfast/itn`,
      name_first: buyerFirstName,
      name_last: buyerLastName,
      email_address: buyerEmail,
      m_payment_id: paymentId,
      amount,
      item_name: "RROI Premium Annual Plan",
      item_description: `Annual premium access for ${publicId}`,
      custom_str1: publicId,
      custom_str2: buyerEmail,
    };

    data.signature = buildSignature(data, passphrase);

    return NextResponse.json({
      processUrl: payfastProcessUrl(),
      fields: data,
    });
  } catch (error: any) {
    console.error("PAYFAST INIT ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}