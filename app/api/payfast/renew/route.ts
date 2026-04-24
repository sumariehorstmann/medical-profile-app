import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const PAYFAST_URL = process.env.PAYFAST_URL!;
const MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID!;
const MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY!;
const PASSPHRASE = process.env.PAYFAST_PASSPHRASE!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function encode(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

function buildQueryString(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${encode(value)}`)
    .join("&");
}

function buildSignature(data: Record<string, string>) {
  const query = buildQueryString(data);
  const finalQuery = PASSPHRASE
    ? `${query}&passphrase=${encode(PASSPHRASE)}`
    : query;

  return crypto.createHash("md5").update(finalQuery).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const paymentId = `rroi_renew_${user.id}_${Date.now()}`;

    const paymentData: Record<string, string> = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: `${BASE_URL}/payment/success`,
      cancel_url: `${BASE_URL}/payment/cancel`,
      notify_url: `${BASE_URL}/api/payfast/itn`,
      name_first: user.user_metadata?.first_name || "",
      name_last: user.user_metadata?.last_name || "",
      email_address: user.email || "",
      m_payment_id: paymentId,
      amount: "99.00",
      item_name: "RROI Premium Annual Renewal",
      custom_str1: user.id,
      custom_str2: "renewal",
    };

    const signature = buildSignature(paymentData);
const queryString = `${buildQueryString(paymentData)}&signature=${signature}`;

return NextResponse.json({
  redirectUrl: `${PAYFAST_URL}?${queryString}`,
});
  } catch (error) {
    console.error("Renewal payment error:", error);
    return NextResponse.json(
      { error: "Failed to create renewal payment." },
      { status: 500 }
    );
  }
}