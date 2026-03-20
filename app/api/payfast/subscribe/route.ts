import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

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
        { error: "Missing PAYFAST_MERCHANT_ID or PAYFAST_MERCHANT_KEY in .env.local" },
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
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}