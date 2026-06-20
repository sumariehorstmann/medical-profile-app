import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { sendStoreOrderConfirmationEmail } from "@/app/lib/email/sendStoreOrderConfirmationEmail";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_PRICE = 499;
const AFFILIATE_PRICE = 469;
const AFFILIATE_COMMISSION = 30;

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

function splitFullName(fullName?: string | null) {
  const clean = (fullName ?? "").trim();
  if (!clean) {
    return { name: "", surname: "" };
  }

  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return { name: parts[0], surname: "" };
  }

  return {
    name: parts.slice(0, -1).join(" "),
    surname: parts.slice(-1).join(""),
  };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);

    const data: Record<string, string> = {};
    params.forEach((value, key) => {
      data[key] = value;
    });

    const payment_status = data.payment_status;
const paymentId = String(data.m_payment_id || "").trim();
const user_id = data.custom_str1;

// ✅ check duplicate
if (!paymentId) {
  return new Response("Missing payment_id", { status: 400 });
}
const userId = data.custom_str1;
const type = data.custom_str2;
const amountGross = parseFloat(data.amount_gross ?? "0");
const expectedEmail = String(
  data.email_address || ""
).trim().toLowerCase();
const affiliateCode = String(data.custom_str3 || "").trim().toUpperCase();


  
    const publicId = String(data.custom_str1 || "").trim();

    const receivedSignature = (data.signature ?? "").toLowerCase();
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

    const signatureString = buildSignatureFromRawBody(rawBody, passphrase);
    const calculatedSignature = md5(signatureString).toLowerCase();

    console.log("ITN HIT");
    console.log("PAYMENT:", paymentId);
    console.log("PUBLIC ID:", publicId);
    console.log("AFFILIATE:", affiliateCode || "none");
    console.log("AMOUNT:", amountGross);

    if (!paymentId || !publicId) {
      console.error("MISSING PAYMENT ID OR PUBLIC ID");
      return new NextResponse("OK", { status: 200 });
    }

    if (receivedSignature !== calculatedSignature) {
      console.error("INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    if (payment_status !== "COMPLETE") {
      console.log("ITN IGNORED - PAYMENT NOT COMPLETE");
      return new NextResponse("OK", { status: 200 });
    }
if (type === "renewal") {
  console.log("RENEWAL ITN START:", paymentId, userId);

  const { data: paymentRow, error: paymentLookupError } = await supabase
    .from("payments")
    .select("id, user_id, amount, status")
    .eq("provider_payment_id", paymentId)
    .maybeSingle();

  if (paymentLookupError || !paymentRow) {
    console.error("RENEWAL PAYMENT ROW NOT FOUND:", paymentLookupError);
    return new NextResponse("OK", { status: 200 });
  }

  const realUserId = paymentRow.user_id;
  const expectedAmount = Number(paymentRow.amount);

  if (Math.abs(amountGross - expectedAmount) > 0.01) {
    console.error("RENEWAL INVALID PAYMENT AMOUNT:", amountGross, expectedAmount);
    return new NextResponse("OK", { status: 200 });
  }

  const now = new Date();

  const { data: sub, error: subLookupError } = await supabase
    .from("subscriptions")
    .select("current_period_end, renewal_count")
    .eq("user_id", realUserId)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subLookupError) {
    console.error("RENEWAL SUBSCRIPTION LOOKUP ERROR:", subLookupError);
  }

  const expiryValue = sub?.current_period_end;
  const currentExpiry = expiryValue ? new Date(expiryValue) : now;
  const baseDate = currentExpiry > now ? currentExpiry : now;

  const newExpiry = new Date(baseDate);
  newExpiry.setFullYear(newExpiry.getFullYear() + 1);

  const { error: subscriptionError } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: realUserId,
        status: "active",
        plan: "premium_annual",
        provider: "payfast",
        provider_subscription_id: paymentId,
        current_period_start: now.toISOString(),
        current_period_end: newExpiry.toISOString(),
        auto_renew: false,
        price: amountGross,
        price_cents: Math.round(expectedAmount * 100),
        renewal_30_email_sent: false,
        renewal_7_email_sent: false,
        last_renewal_reminder_sent_at: null,
        renewal_count: (sub?.renewal_count || 0) + 1,
        updated_at: now.toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (subscriptionError) {
    console.error("RENEWAL SUBSCRIPTION UPSERT ERROR:", subscriptionError);
    return new NextResponse("OK", { status: 200 });
  }

  const { data: updatedProfiles, error: profileError } = await supabase
    .from("profiles")
    .update({ is_paid: true })
    .eq("user_id", realUserId)
    .select("id, user_id, is_paid");

  if (profileError) {
    console.error("RENEWAL PROFILE UPDATE ERROR:", profileError);
    return new NextResponse("OK", { status: 200 });
  }

  if (!updatedProfiles || updatedProfiles.length === 0) {
    console.error("RENEWAL PROFILE UPDATE FOUND NO MATCHING PROFILE:", realUserId);
    return new NextResponse("OK", { status: 200 });
  }

  const { error: paymentUpdateError } = await supabase
    .from("payments")
    .update({
      status: "paid",
      paid_at: now.toISOString(),
      raw_payload: data,
    })
    .eq("id", paymentRow.id);

  if (paymentUpdateError) {
    console.error("RENEWAL PAYMENT UPDATE ERROR:", paymentUpdateError);
    return new NextResponse("OK", { status: 200 });
  }

  console.log("RENEWAL SUCCESS:", realUserId);
  return new NextResponse("OK", { status: 200 });
}
 const { data: paymentAmountRow, error: paymentAmountLookupError } = await supabase
  .from("payments")
  .select("amount")
  .eq("provider_payment_id", paymentId)
  .single();

if (paymentAmountLookupError || !paymentAmountRow) {
  console.error("PAYMENT AMOUNT LOOKUP FAILED:", paymentAmountLookupError, paymentId);
  return new Response("Payment not found", { status: 400 });
}

const expectedAmount = Number(paymentAmountRow.amount);

const receivedEmail = String(
  data.email_address || ""
).trim().toLowerCase();

if (!receivedEmail) {
  console.error("MISSING EMAIL ADDRESS");
  return new Response("Missing email", { status: 400 });
}

if (Math.abs(amountGross - expectedAmount) > 0.01) {
  console.error("INVALID PAYMENT AMOUNT:", amountGross, expectedAmount);
  return new Response("Invalid payment amount", { status: 400 });
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
      .select(
        `
        id,
        user_id,
        public_id,
        first_name,
        last_name,
        blood_type,
        allergies,
        emergency1_fullname,
        emergency1_phone
      `
      )
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

    const { data: shippingDetails, error: shippingDetailsError } = await supabase
      .from("shipping_details")
      .select(
        "name, surname, email, cellphone, street_address, city_town, postal_code, province, unit_complex_building"
      )
      .eq("user_id", profile.user_id)
      .maybeSingle();

    if (shippingDetailsError) {
      console.error("SHIPPING DETAILS LOOKUP ERROR:", shippingDetailsError);
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
          price_cents: Math.round(expectedAmount * 100),
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
        .select("id, user_id, total_earned")
        .eq("affiliate_code", affiliateCode)
        .eq("status", "approved")
        .maybeSingle();

      if (affiliateLookupError) {
        console.error("AFFILIATE LOOKUP ERROR:", affiliateLookupError);
      } else if (!affiliate) {
        console.log("AFFILIATE CODE NOT FOUND OR NOT ACTIVE");
      } else {
        const { data: existingReferral, error: existingReferralError } =
          await supabase
            .from("affiliate_referrals")
            .select("id")
            .eq("payment_id", paymentId)
            .maybeSingle();

        if (existingReferralError) {
          console.error("EXISTING REFERRAL LOOKUP ERROR:", existingReferralError);
        } else if (!existingReferral) {
          const commission = 30;

          const { error: referralInsertError } = await supabase
            .from("affiliate_referrals")
            .insert({
              affiliate_id: affiliate.id,
              user_id: profile.user_id,
              payment_id: paymentId,
              amount: AFFILIATE_PRICE,
              commission,
              status: "confirmed",
            });

          if (referralInsertError) {
            console.error("REFERRAL INSERT ERROR:", referralInsertError);
          } else {
            const { error: affiliateUpdateError } = await supabase
              .from("affiliates")
              .update({
                total_earned: Number(
                  ((affiliate.total_earned ?? 0) + commission).toFixed(2)
                ),
              })
              .eq("id", affiliate.id);

            if (affiliateUpdateError) {
              console.error("AFFILIATE TOTAL UPDATE ERROR:", affiliateUpdateError);
            } else {
              console.log("COMMISSION PAID:", commission);
            }
          }
        }
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

if (!siteUrl) {
  console.error("NEXT_PUBLIC_BASE_URL IS NOT SET");
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
    const { data: orderForm, error: orderFormError } = await supabase
      .from("premium_order_forms")
      .select("*")
      .eq("user_id", profile.user_id)
      .maybeSingle();

    if (orderFormError) {
      console.error("ORDER FORM LOOKUP ERROR:", orderFormError);
      return new NextResponse("OK", { status: 200 });
    }

    if (!orderForm) {
  console.error("NO ORDER FORM FOUND — FALLBACK ORDER CREATION");

  const { name, surname } = splitFullName(profile.first_name + " " + profile.last_name);

  const fallbackName = `${name} ${surname}`.trim();

  const { error: orderInsertError } = await supabase.from("orders").insert({
    user_id: profile.user_id,
    public_id: String(profile.public_id),
    payment_id: paymentId,
    customer_name: fallbackName,
    email: data.email_address ?? "",
    shipping_name: fallbackName,
    shipping_phone: "",
    shipping_address: "",
    shipping_unit: "",
    shipping_street: "",
    shipping_city: "",
    shipping_province: "",
    shipping_postal_code: "",
    shipping_country: "South Africa",
    qr_url: qrUrl,
    status: "paid",
    payment_status: "paid",
    first_name: name,
    last_name: surname,
    emergency_contact_name: profile.emergency1_fullname ?? "",
    emergency_contact_surname: "",
    emergency_contact_phone: profile.emergency1_phone ?? "",
    blood_type: profile.blood_type ?? "",
    allergies: profile.allergies ?? "",
    product_type: "premium_bundle",
    layout_type: "fallback_missing_form",
  });

  if (orderInsertError) {
    console.error("FALLBACK ORDER FAILED:", orderInsertError);
  } else {
    console.log("FALLBACK ORDER CREATED");
  }

  return new NextResponse("OK", { status: 200 });
}

    const shippingName =
      `${orderForm.first_name || ""} ${orderForm.last_name || ""}`.trim();

    const shippingAddress = [
      orderForm.shipping_unit,
      orderForm.shipping_street,
      orderForm.shipping_city,
      orderForm.shipping_province,
      orderForm.shipping_postal_code,
      orderForm.shipping_country,
    ]
      .filter(Boolean)
      .join(", ");

    const { error: orderInsertError } = await supabase.from("orders").insert({
      user_id: profile.user_id,
      public_id: String(profile.public_id),
      payment_id: paymentId,
      customer_name: shippingName,
      email: orderForm.email ?? data.email_address ?? "",
      shipping_name: shippingName,
      shipping_phone: orderForm.cellphone ?? "",
      shipping_address: shippingAddress,
      shipping_unit: orderForm.shipping_unit ?? "",
      shipping_street: orderForm.shipping_street ?? "",
      shipping_city: orderForm.shipping_city ?? "",
      shipping_province: orderForm.shipping_province ?? "",
      shipping_postal_code: orderForm.shipping_postal_code ?? "",
      shipping_country: orderForm.shipping_country ?? "South Africa",
      qr_url: qrUrl,
      status: "paid",
      payment_status: "paid",
      first_name: orderForm.first_name ?? "",
      last_name: orderForm.last_name ?? "",
      emergency_contact_name: orderForm.emergency_contact_name ?? "",
      emergency_contact_surname: orderForm.emergency_contact_surname ?? "",
      emergency_contact_phone: orderForm.emergency_contact_phone ?? "",
      blood_type: orderForm.blood_type ?? "",
      allergies: orderForm.allergies ?? "",
      product_type: "premium_bundle",
      layout_type: "standard_v1",
    });

    if (orderInsertError) {
  console.error("ORDER INSERT ERROR:", orderInsertError);
} else {
  console.log("ORDER CREATED SUCCESSFULLY");

  const emailWasSent = await sendStoreOrderConfirmationEmail({
  to: orderForm.email ?? data.email_address ?? "",
  customerName: shippingName,
  paymentReference: paymentId,
  items: [
    {
      name: "Premium Kit QR Card",
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
    {
      name: "Premium Kit QR Tag",
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
    {
      name: "1 Year Premium Subscription",
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
    {
      name: "Nationwide Delivery",
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
  ],
  totalAmount: Number(expectedAmount),
  hideItemTotals: true,
  emailType: "premium_kit",
});

  console.log("PREMIUM KIT EMAIL SENT:", emailWasSent);
}
  }
} catch (orderErr) {
  console.error("ORDER CREATION ERROR:", orderErr);
}

    console.log("ITN SUCCESS");
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("ITN ERROR:", err);
    return new NextResponse("OK", { status: 200 });
  }
}