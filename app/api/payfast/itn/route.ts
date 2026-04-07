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
const COMMISSION_RATE = 0.1;

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
    const amountGross = data.amount_gross ?? "";
    const receivedSignature = (data.signature ?? "").toLowerCase();
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

    const signatureString = buildSignatureFromRawBody(rawBody, passphrase);
    const calculatedSignature = md5(signatureString).toLowerCase();

    console.log("ITN HIT");
    console.log("PAYMENT ID:", paymentId);
    console.log("PUBLIC ID:", publicId);
    console.log("AFFILIATE CODE:", affiliateCode || "(none)");
    console.log("AMOUNT GROSS:", amountGross);

    if (!paymentId || !publicId) {
      console.error("MISSING PAYMENT ID OR PUBLIC ID");
      return new NextResponse("OK", { status: 200 });
    }

    if (receivedSignature !== calculatedSignature) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentStatus !== "COMPLETE") {
      console.log("ITN IGNORED - PAYMENT NOT COMPLETE");
      return new NextResponse("OK", { status: 200 });
    }

    const expectedAmount = affiliateCode
      ? BASE_PRICE - DISCOUNT_AMOUNT
      : BASE_PRICE;

    if (parseFloat(amountGross).toFixed(2) !== expectedAmount.toFixed(2)) {
      console.error("INVALID AMOUNT:", amountGross, "EXPECTED:", expectedAmount);
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
      console.error("PAYMENT ROW NOT FOUND");
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentRow.status === "paid") {
      console.log("PAYMENT ALREADY PROCESSED");
      return new NextResponse("OK", { status: 200 });
    }

    const { data: profile, error: profileLookupError } = await supabase
      .from("profiles")
      .select("id, user_id, public_id")
      .eq("public_id", publicId)
      .single();

    if (profileLookupError) {
      console.error("PROFILE LOOKUP ERROR:", profileLookupError);
      return new NextResponse("OK", { status: 200 });
    }

    if (!profile) {
      console.error("PROFILE NOT FOUND");
      return new NextResponse("OK", { status: 200 });
    }

    if (profile.user_id !== paymentRow.user_id) {
      console.error("PAYMENT USER / PROFILE USER MISMATCH");
      return new NextResponse("OK", { status: 200 });
    }

    const now = new Date();
    const endDate = new Date();
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
      .update({ is_paid: true })
      .eq("id", profile.id);

    if (profileUpdateError) {
      console.error("PROFILE UPDATE ERROR:", profileUpdateError);
      return new NextResponse("OK", { status: 200 });
    }

    const { error: subscriptionUpsertError } = await supabase
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
          price: expectedAmount,
          price_cents: expectedAmount * 100,
          updated_at: now.toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (subscriptionUpsertError) {
      console.error("SUBSCRIPTION UPSERT ERROR:", subscriptionUpsertError);
      return new NextResponse("OK", { status: 200 });
    }

    if (affiliateCode) {
      const { data: affiliate, error: affiliateLookupError } = await supabase
        .from("affiliates")
        .select("id, user_id, status, total_earned")
        .eq("affiliate_code", affiliateCode)
        .eq("status", "active")
        .maybeSingle();

      if (affiliateLookupError) {
        console.error("AFFILIATE LOOKUP ERROR:", affiliateLookupError);
      } else if (!affiliate) {
        console.log("AFFILIATE CODE NOT FOUND OR NOT ACTIVE");
      } else if (affiliate.user_id === profile.user_id) {
        console.log("SELF REFERRAL BLOCKED");
      } else {
        const {
          data: existingReferralByPayment,
          error: existingPaymentReferralError,
        } = await supabase
          .from("affiliate_referrals")
          .select("id")
          .eq("payment_id", paymentId)
          .maybeSingle();

        if (existingPaymentReferralError) {
          console.error(
            "EXISTING REFERRAL BY PAYMENT LOOKUP ERROR:",
            existingPaymentReferralError
          );
        } else if (existingReferralByPayment) {
          console.log("REFERRAL ALREADY EXISTS FOR THIS PAYMENT");
        } else {
          const {
            data: existingReferralByUser,
            error: existingUserReferralError,
          } = await supabase
            .from("affiliate_referrals")
            .select("id")
            .eq("user_id", profile.user_id)
            .maybeSingle();

          if (existingUserReferralError) {
            console.error(
              "EXISTING REFERRAL BY USER LOOKUP ERROR:",
              existingUserReferralError
            );
          } else if (existingReferralByUser) {
            console.log("USER ALREADY HAS A REFERRAL - SKIPPING COMMISSION");
          } else {
            const commission = Number((BASE_PRICE * COMMISSION_RATE).toFixed(2));

            const { error: referralInsertError } = await supabase
              .from("affiliate_referrals")
              .insert({
                affiliate_id: affiliate.id,
                user_id: profile.user_id,
                payment_id: paymentId,
                amount: expectedAmount,
                commission,
                status: "confirmed",
              });

            if (referralInsertError) {
              console.error("REFERRAL INSERT ERROR:", referralInsertError);
            } else {
              const newTotalEarned = Number(
                (Number(affiliate.total_earned ?? 0) + commission).toFixed(2)
              );

              const { error: affiliateUpdateError } = await supabase
                .from("affiliates")
                .update({ total_earned: newTotalEarned })
                .eq("id", affiliate.id);

              if (affiliateUpdateError) {
                console.error(
                  "AFFILIATE TOTAL UPDATE ERROR:",
                  affiliateUpdateError
                );
              } else {
                console.log("AFFILIATE COMMISSION RECORDED:", commission);
              }
            }
          }
        }
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!siteUrl) {
      console.error("NEXT_PUBLIC_SITE_URL IS NOT SET");
      return new NextResponse("OK", { status: 200 });
    }

    const qrUrl = `${siteUrl}/e/${publicId}`;

    try {
      const { data: existingOrder, error: existingOrderLookupError } =
        await supabase
          .from("orders")
          .select("id")
          .eq("payment_id", paymentId)
          .maybeSingle();

      if (existingOrderLookupError) {
        console.error("ORDER LOOKUP ERROR:", existingOrderLookupError);
      } else if (existingOrder) {
        console.log("ORDER ALREADY EXISTS");
      } else {
        const { data: profileDetails, error: profileDetailsError } =
          await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("public_id", publicId)
            .maybeSingle();

        if (profileDetailsError) {
          console.error("PROFILE DETAILS LOOKUP ERROR:", profileDetailsError);
        }

        const { data: shippingDetails, error: shippingDetailsError } =
          await supabase
            .from("shipping_details")
            .select(
              "name, surname, email, cellphone, street_address, city_town, postal_code, province, unit_complex_building"
            )
            .eq("user_id", profile.user_id)
            .maybeSingle();

        if (shippingDetailsError) {
          console.error("SHIPPING DETAILS LOOKUP ERROR:", shippingDetailsError);
        }

        const customerName = profileDetails
          ? `${profileDetails.first_name || ""} ${profileDetails.last_name || ""}`.trim()
          : "";

        const shippingName = shippingDetails
          ? `${shippingDetails.name || ""} ${shippingDetails.surname || ""}`.trim()
          : "";

        const shippingAddress = shippingDetails
          ? [
              shippingDetails.unit_complex_building,
              shippingDetails.street_address,
              shippingDetails.city_town,
              shippingDetails.province,
              shippingDetails.postal_code,
            ]
              .filter(Boolean)
              .join(", ")
          : "";

        const { error: orderInsertError } = await supabase.from("orders").insert({
          user_id: profile.user_id,
          public_id: publicId,
          payment_id: paymentId,
          customer_name: customerName,
          email: shippingDetails?.email ?? "",
          shipping_name: shippingName,
          shipping_phone: shippingDetails?.cellphone ?? "",
          shipping_address: shippingAddress,
          qr_url: qrUrl,
          status: "pending",
        });

        if (orderInsertError) {
          console.error("ORDER INSERT ERROR:", orderInsertError);
        } else {
          console.log("ORDER CREATED SUCCESSFULLY");
        }
      }
    } catch (orderErr) {
      console.error("ORDER CREATION ERROR:", orderErr);
    }

    console.log("ITN PROCESSED SUCCESSFULLY");
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}