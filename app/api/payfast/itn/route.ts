import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifySignature(data: Record<string, string>, passphrase: string) {
  try {
    const pfData = { ...data };
    delete pfData.signature;

    const sortedKeys = Object.keys(pfData).sort();

    const payload = sortedKeys
      .map((key) => `${key}=${encodeURIComponent(pfData[key] ?? "")}`)
      .join("&");

    const stringToHash = passphrase
      ? `${payload}&passphrase=${encodeURIComponent(passphrase)}`
      : payload;

    const generatedSignature = crypto
      .createHash("md5")
      .update(stringToHash)
      .digest("hex");

    return generatedSignature === data.signature;
  } catch (err) {
    console.error("SIGNATURE ERROR:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    console.log("ITN HIT");
    console.log("ITN DATA:", data);

    const paymentStatus = data.payment_status;
    const paymentId = data.m_payment_id;
    const publicId = data.custom_str1;
    const amountGross = data.amount_gross;

    const isValidSignature = verifySignature(
      data,
      process.env.PAYFAST_PASSPHRASE || ""
    );

    console.log("SIGNATURE VALID:", isValidSignature);
    console.log("PAYMENT STATUS:", paymentStatus);
    console.log("PAYMENT ID:", paymentId);
    console.log("PUBLIC ID:", publicId);
    console.log("AMOUNT GROSS:", amountGross);

    if (!paymentId || !publicId) {
      console.error("MISSING PAYMENT ID OR PUBLIC ID");
      return new NextResponse("OK", { status: 200 });
    }

    if (!isValidSignature) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentStatus !== "COMPLETE") {
      console.log("ITN IGNORED - NOT COMPLETE");
      return new NextResponse("OK", { status: 200 });
    }

    if (amountGross !== "299.00") {
      console.error("INVALID AMOUNT:", amountGross);
      return new NextResponse("OK", { status: 200 });
    }

    const { data: paymentRow, error: paymentLookupError } = await supabase
      .from("payments")
      .select("id, user_id, public_id, status")
      .eq("provider_payment_id", paymentId)
      .maybeSingle();

    if (paymentLookupError) {
      console.error("PAYMENT LOOKUP ERROR:", paymentLookupError);
      return new NextResponse("OK", { status: 200 });
    }

    if (!paymentRow) {
      console.error("PAYMENT ROW NOT FOUND FOR:", paymentId);
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentRow.status === "paid") {
      console.log("PAYMENT ALREADY PROCESSED:", paymentId);
      return new NextResponse("OK", { status: 200 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, user_id, public_id, is_paid")
      .eq("public_id", publicId)
      .single();

    if (profileError || !profile) {
      console.error("PROFILE LOOKUP ERROR:", profileError);
      return new NextResponse("OK", { status: 200 });
    }

    if (profile.user_id !== paymentRow.user_id) {
      console.error("PAYMENT USER / PROFILE USER MISMATCH");
      return new NextResponse("OK", { status: 200 });
    }

    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const { error: paymentUpdateError } = await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: now.toISOString(),
        raw_payload: data,
      })
      .eq("id", paymentRow.id);

    if (paymentUpdateError) {
      console.error("PAYMENT UPDATE ERROR:", paymentUpdateError);
      return new NextResponse("OK", { status: 200 });
    }

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        is_paid: true,
      })
      .eq("id", profile.id);

    if (profileUpdateError) {
      console.error("PROFILE UPDATE ERROR:", profileUpdateError);
      return new NextResponse("OK", { status: 200 });
    }

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: profile.user_id,
          status: "active",
          current_period_start: now.toISOString(),
          current_period_end: endDate.toISOString(),
          provider: "payfast",
          provider_subscription_id: paymentId,
          auto_renew: false,
          plan: "premium_annual",
          price: 299,
          price_cents: 29900,
          updated_at: now.toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (subscriptionError) {
      console.error("SUBSCRIPTION UPSERT ERROR:", subscriptionError);
      return new NextResponse("OK", { status: 200 });
    }

    console.log("ITN PROCESSED SUCCESSFULLY FOR USER:", profile.user_id);

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN FATAL ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}