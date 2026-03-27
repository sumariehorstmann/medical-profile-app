import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_PRICE = 349;
const DISCOUNT_AMOUNT = 50;
const COMMISSION_RATE = 0.10;

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
    const buyerEmail = data.custom_str2 ?? "";
    const affiliateCode = (data.custom_str3 ?? "").trim().toUpperCase();
    const amountGross = data.amount_gross ?? "";
    const receivedSignature = (data.signature ?? "").toLowerCase();
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

    const signatureString = buildSignatureFromRawBody(rawBody, passphrase);
    const calculatedSignature = md5(signatureString).toLowerCase();

    if (!paymentId || !publicId) {
      return new NextResponse("OK", { status: 200 });
    }

    if (receivedSignature !== calculatedSignature) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentStatus !== "COMPLETE") {
      return new NextResponse("OK", { status: 200 });
    }

    // ✅ FIX: dynamic expected amount
    const expectedAmount = affiliateCode
      ? BASE_PRICE - DISCOUNT_AMOUNT
      : BASE_PRICE;

    if (parseFloat(amountGross).toFixed(2) !== expectedAmount.toFixed(2)) {
      console.error("INVALID AMOUNT:", amountGross, "EXPECTED:", expectedAmount);
      return new NextResponse("OK", { status: 200 });
    }

    const { data: paymentRow } = await supabase
      .from("payments")
      .select("id, user_id, status")
      .eq("provider_payment_id", paymentId)
      .maybeSingle();

    if (!paymentRow) return new NextResponse("OK", { status: 200 });

    if (paymentRow.status === "paid") {
      return new NextResponse("OK", { status: 200 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, user_id")
      .eq("public_id", publicId)
      .single();

    if (!profile) return new NextResponse("OK", { status: 200 });

    const now = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: now.toISOString(),
        raw_payload: data,
      })
      .eq("id", paymentRow.id);

    await supabase
      .from("profiles")
      .update({ is_paid: true })
      .eq("id", profile.id);

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

    // ✅ Affiliate handling stays correct
    if (affiliateCode) {
      const { data: affiliate } = await supabase
        .from("affiliates")
        .select("id, user_id, total_earned")
        .eq("affiliate_code", affiliateCode)
        .eq("status", "active")
        .maybeSingle();

      if (affiliate && affiliate.user_id !== profile.user_id) {
        const commission = Number(
          (BASE_PRICE * COMMISSION_RATE).toFixed(2)
        );

        await supabase.from("affiliate_referrals").insert({
          affiliate_id: affiliate.id,
          user_id: profile.user_id,
          payment_id: paymentId,
          amount: expectedAmount,
          commission,
          status: "confirmed",
        });

        await supabase
          .from("affiliates")
          .update({
            total_earned: Number(
              (Number(affiliate.total_earned ?? 0) + commission).toFixed(2)
            ),
          })
          .eq("id", affiliate.id);
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}