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
  console.log("ITN VERSION 24 MAR FINAL");
  console.log("ITN HIT");

  try {
    const formData = await req.formData();

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    console.log("ITN DATA:", data);

    const paymentStatus = data.payment_status;
    const paymentId = data.m_payment_id;
    const publicId = data.custom_str1;
    const amountGross = data.amount_gross;

    const isValid = verifySignature(
      data,
      process.env.PAYFAST_PASSPHRASE || ""
    );

    console.log("SIGNATURE VALID:", isValid);
    console.log("STATUS:", paymentStatus);
    console.log("PAYMENT ID:", paymentId);
    console.log("PUBLIC ID:", publicId);
    console.log("AMOUNT:", amountGross);

    if (paymentStatus === "COMPLETE" && publicId) {
      const { error: paymentUpdateError } = await supabase
        .from("payments")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          raw_payload: data,
        })
        .eq("provider_payment_id", paymentId);

      if (paymentUpdateError) {
        console.error("PAYMENT UPDATE ERROR:", paymentUpdateError);
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, user_id, is_paid")
        .eq("public_id", publicId)
        .single();

      if (profileError) {
        console.error("PROFILE LOOKUP ERROR:", profileError);
      } else if (!profile) {
        console.error("PROFILE NOT FOUND");
      } else if (profile.is_paid) {
        console.log("ALREADY PAID");
      } else {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);

        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({ is_paid: true })
          .eq("id", profile.id);

        if (profileUpdateError) {
          console.error("PROFILE UPDATE ERROR:", profileUpdateError);
        } else {
          const { error: subscriptionError } = await supabase
            .from("subscriptions")
            .upsert(
              {
                user_id: profile.user_id,
                status: "active",
                current_period_start: startDate.toISOString(),
                current_period_end: endDate.toISOString(),
                provider: "payfast",
                provider_subscription_id: paymentId || null,
                auto_renew: false,
                plan: "premium_annual",
                price: 299,
                price_cents: 29900,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" }
            );

          if (subscriptionError) {
            console.error("SUBSCRIPTION UPSERT ERROR:", subscriptionError);
          } else {
            console.log("USER ACTIVATED:", profile.user_id);
          }
        }
      }
    } else {
      console.log("ITN IGNORED");
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN FATAL ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}