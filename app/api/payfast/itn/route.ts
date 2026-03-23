import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🔒 PayFast signature verification
function verifySignature(data: Record<string, string>, passphrase: string) {
  const pfData = { ...data };
  delete pfData.signature;

  const sortedKeys = Object.keys(pfData).sort();

  const payload = sortedKeys
    .map((key) => `${key}=${encodeURIComponent(pfData[key])}`)
    .join("&");

  const stringToHash = passphrase ? `${payload}&passphrase=${passphrase}` : payload;

  const generatedSignature = crypto
    .createHash("md5")
    .update(stringToHash)
    .digest("hex");

  return generatedSignature === data.signature;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    const paymentStatus = data.payment_status;
    const paymentId = data.m_payment_id;
    const publicId = data.custom_str1;

    console.log("ITN RECEIVED:", data);

    // 🔒 VERIFY SIGNATURE
    const isValid = verifySignature(data, process.env.PAYFAST_PASSPHRASE || "");

    if (!isValid) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    if (paymentStatus !== "COMPLETE") {
      return new NextResponse("Payment not complete", { status: 200 });
    }

    if (!publicId) {
      return new NextResponse("Missing public_id", { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, user_id")
      .eq("public_id", publicId)
      .single();

    if (profileError || !profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: profile.user_id,
          status: "active",
          current_period_start: startDate.toISOString(),
          current_period_end: endDate.toISOString(),
          provider: "payfast",
          provider_subscription_id: paymentId,
          auto_renew: false,
          plan: "premium_annual",
          price: 299,
          price_cents: 29900,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (subscriptionError) {
      return new NextResponse("Failed to update subscription", { status: 500 });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error: any) {
    console.error("ITN ERROR:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}