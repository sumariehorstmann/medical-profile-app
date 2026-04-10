import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🔒 LOCKED PRICING
const BASE_PRICE = 429;
const AFFILIATE_PRICE = 399;
const COMMISSION_RATE = 0.08;

function encodePayFastValue(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignatureFromRawBody(rawBody: string, passphrase?: string) {
  const parts = rawBody
    .split("&")
    .filter((part) => !part.startsWith("signature="));

  if (passphrase && passphrase.trim() !== "") {
    parts.push(`passphrase=${encodePayFastValue(passphrase)}`);
  }

  return parts.join("&");
}

function md5(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);

    const data: Record<string, string> = {};
    params.forEach((value, key) => {
      data[key] = value;
    });

    const paymentStatus = data.payment_status ?? "";
    const paymentId = data.m_payment_id ?? "";
    const publicId = data.custom_str1 ?? "";
    const affiliateCode = (data.custom_str3 ?? "").trim().toUpperCase();
    const amountGross = parseFloat(data.amount_gross ?? "0");
    const receivedSignature = (data.signature ?? "").toLowerCase();
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

    const signatureString = buildSignatureFromRawBody(rawBody, passphrase);
    const calculatedSignature = md5(signatureString).toLowerCase();

    console.log("ITN HIT");
    console.log("PAYMENT:", paymentId);
    console.log("AFFILIATE:", affiliateCode || "none");
    console.log("AMOUNT:", amountGross);

    if (!paymentId || !publicId) {
      return new NextResponse("OK", { status: 200 });
    }

    // 🔐 Signature check
    if (receivedSignature !== calculatedSignature) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    // ✅ Only process completed payments
    if (paymentStatus !== "COMPLETE") {
      return new NextResponse("OK", { status: 200 });
    }

    // 🔥 Correct expected amount logic
    const expectedAmount = affiliateCode
      ? AFFILIATE_PRICE
      : BASE_PRICE;

    if (Number(amountGross.toFixed(2)) !== Number(expectedAmount.toFixed(2))) {
      console.error("INVALID AMOUNT:", amountGross, "EXPECTED:", expectedAmount);
      return new NextResponse("OK", { status: 200 });
    }

    // 🔎 Get payment row
    const { data: paymentRow } = await supabase
      .from("payments")
      .select("id, user_id, status")
      .eq("provider_payment_id", paymentId)
      .maybeSingle();

    if (!paymentRow || paymentRow.status === "paid") {
      return new NextResponse("OK", { status: 200 });
    }

    // 🔎 Get profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, user_id")
      .eq("public_id", publicId)
      .single();

    if (!profile || profile.user_id !== paymentRow.user_id) {
      return new NextResponse("OK", { status: 200 });
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    // ✅ Mark payment paid
    await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: now.toISOString(),
        raw_payload: data,
      })
      .eq("id", paymentRow.id);

    // ✅ Activate profile
    await supabase
      .from("profiles")
      .update({ is_paid: true })
      .eq("id", profile.id);

    // ✅ Subscription
    await supabase.from("subscriptions").upsert(
      {
        user_id: profile.user_id,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
        provider: "payfast",
        provider_subscription_id: paymentId,
        auto_renew: false,
        plan: "premium_annual",
        price: expectedAmount,
        price_cents: expectedAmount * 100,
        updated_at: now.toISOString(),
      },
      { onConflict: "user_id" }
    );

    // 🔥 AFFILIATE LOGIC (FIXED)
    if (affiliateCode) {
      const { data: affiliate } = await supabase
        .from("affiliates")
        .select("id, user_id, total_earned")
        .eq("affiliate_code", affiliateCode)
        .eq("status", "active")
        .maybeSingle();

      if (affiliate && affiliate.user_id !== profile.user_id) {
        // 🚫 Prevent duplicate commissions
        const { data: existingReferral } = await supabase
          .from("affiliate_referrals")
          .select("id")
          .eq("payment_id", paymentId)
          .maybeSingle();

        if (!existingReferral) {
          const commission = Number(
            (AFFILIATE_PRICE * COMMISSION_RATE).toFixed(2)
          );

          await supabase.from("affiliate_referrals").insert({
            affiliate_id: affiliate.id,
            user_id: profile.user_id,
            payment_id: paymentId,
            amount: AFFILIATE_PRICE,
            commission,
            status: "confirmed",
          });

          await supabase
            .from("affiliates")
            .update({
              total_earned: Number(
                ((affiliate.total_earned ?? 0) + commission).toFixed(2)
              ),
            })
            .eq("id", affiliate.id);

          console.log("COMMISSION PAID:", commission);
        }
      }
    }

    console.log("ITN SUCCESS");
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}