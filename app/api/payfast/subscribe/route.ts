import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function encode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function generateSignature(
  data: Record<string, string>,
  passphrase?: string
) {
  const pfData: string[] = [];

  for (const key in data) {
    if (key !== "signature" && data[key] !== "") {
      pfData.push(`${key}=${encode(data[key])}`);
    }
  }

  if (passphrase) {
    pfData.push(`passphrase=${encode(passphrase)}`);
  }

  const string = pfData.join("&");

  return crypto.createHash("md5").update(string).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const text = await req.text(); // IMPORTANT: raw body
    const params = new URLSearchParams(text);

    const data: Record<string, string> = {};
    params.forEach((value, key) => {
      data[key] = value;
    });

    console.log("ITN DATA:", data);

    const receivedSignature = data.signature;
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

    const calculatedSignature = generateSignature(data, passphrase);

    if (receivedSignature !== calculatedSignature) {
      console.error("INVALID SIGNATURE");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ✅ VALID PAYMENT
    if (data.payment_status !== "COMPLETE") {
      return NextResponse.json({ ok: true });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const paymentId = data.m_payment_id;
    const publicId = data.custom_str1;
    const email = data.custom_str2;

    // update payment
    await supabase
      .from("payments")
      .update({ status: "complete" })
      .eq("provider_payment_id", paymentId);

    // create subscription
    await supabase.from("subscriptions").insert({
      user_id: null, // optional if you don’t track here
      public_id: publicId,
      status: "active",
      provider: "payfast",
      provider_payment_id: paymentId,
      current_period_end: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });

    // mark profile paid
    await supabase
      .from("profiles")
      .update({ is_paid: true })
      .eq("public_id", publicId);

    console.log("SUBSCRIPTION CREATED");

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("ITN ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}