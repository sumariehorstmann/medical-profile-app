import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const DOG_TAG_PRICE = 99;
const QR_CARD_PRICE = 99;
const DELIVERY_FEE = 99;

function toPayFastString(data: Record<string, string>) {
  return Object.entries(data)
    .filter(([, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}`
    )
    .join("&");
}

function createSignature(data: Record<string, string>, passphrase?: string) {
  let pfOutput = toPayFastString(data);

  if (passphrase) {
    pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(
      /%20/g,
      "+"
    )}`;
  }

  return crypto.createHash("md5").update(pfOutput).digest("hex");
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();

    const dogTags = Math.max(0, Number(body.dogTags || 0));
    const cards = Math.max(0, Number(body.cards || 0));

    if (dogTags === 0 && cards === 0) {
      return NextResponse.json(
        { error: "Please select at least one item." },
        { status: 400 }
      );
    }

    const customerName = String(body.customerName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const unit = String(body.unit || "").trim();
    const street = String(body.street || "").trim();
    const city = String(body.city || "").trim();
    const province = String(body.province || "").trim();
    const postalCode = String(body.postalCode || "").trim();
    const country = String(body.country || "South Africa").trim();

    if (!customerName || !email || !phone || !street || !city || !province || !postalCode) {
      return NextResponse.json(
        { error: "Please complete all required delivery fields." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        `
        public_id,
        first_name,
        last_name,
        blood_type,
        allergies,
        emergency_contact_name,
        emergency_contact_surname,
        emergency_contact_phone
      `
      )
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile?.public_id) {
      return NextResponse.json(
        { error: "Profile or QR code not found." },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.rroi.co.za";

    const qrUrl = `${siteUrl}/e/${profile.public_id}`;

    const subtotal = dogTags * DOG_TAG_PRICE + cards * QR_CARD_PRICE;
    const total = subtotal + DELIVERY_FEE;

    const paymentReference = `store_${Date.now()}_${user.id.slice(0, 8)}`;

    const items = [
      dogTags > 0
        ? {
            name: "Black Anodised Aluminium Dog Tag",
            quantity: dogTags,
            unit_price: DOG_TAG_PRICE,
            total: dogTags * DOG_TAG_PRICE,
          }
        : null,
      cards > 0
        ? {
            name: "Black Anodised Aluminium QR Card",
            quantity: cards,
            unit_price: QR_CARD_PRICE,
            total: cards * QR_CARD_PRICE,
          }
        : null,
    ].filter(Boolean);

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      status: "pending",
      order_type: "store",
      payment_status: "pending",
      payfast_payment_id: paymentReference,

      customer_name: customerName,
      email,
      shipping_phone: phone,
      shipping_unit: unit,
      shipping_street: street,
      shipping_city: city,
      shipping_province: province,
      shipping_postal_code: postalCode,
      shipping_country: country,

      qr_url: qrUrl,
      first_name: profile.first_name,
      last_name: profile.last_name,
      blood_type: profile.blood_type,
      allergies: profile.allergies,
      emergency_contact_name: profile.emergency_contact_name,
      emergency_contact_surname: profile.emergency_contact_surname,
      emergency_contact_phone: profile.emergency_contact_phone,

      dog_tag_qty: dogTags,
      card_qty: cards,
      items,
      subtotal,
      delivery_fee: DELIVERY_FEE,
      total_amount: total,
    });

    if (orderError) {
      console.error("STORE ORDER INSERT ERROR:", orderError);
      return NextResponse.json(
        { error: "Failed to create store order." },
        { status: 500 }
      );
    }

    const payfastData: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${siteUrl}/payment/success`,
      cancel_url: `${siteUrl}/payment/cancel`,
      notify_url: `${siteUrl}/api/payfast/store/itn`,

      m_payment_id: paymentReference,
      amount: total.toFixed(2),
      item_name: "RROI Store QR Products",
      item_description: `Dog tags: ${dogTags}, QR cards: ${cards}, delivery included`,

      name_first: customerName,
      email_address: email,
      custom_str1: user.id,
      custom_str2: profile.public_id,
      custom_str3: "store",
    };

    const signature = createSignature(
      payfastData,
      process.env.PAYFAST_PASSPHRASE
    );

    const paymentDataWithSignature = {
      ...payfastData,
      signature,
    };

    const payfastBase =
      process.env.PAYFAST_SANDBOX === "true"
        ? "https://sandbox.payfast.co.za/eng/process"
        : "https://www.payfast.co.za/eng/process";

    const redirectUrl = `${payfastBase}?${toPayFastString(
      paymentDataWithSignature
    )}`;

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("STORE PAYFAST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to start store payment." },
      { status: 500 }
    );
  }
}