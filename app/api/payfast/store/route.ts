import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const DOG_TAG_PRICE = 99;
const QR_CARD_PRICE = 99;
const DELIVERY_FEE = 99;

function payfastProcessUrl() {
  return process.env.PAYFAST_URL!;
}

function encode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignature(data: Record<string, string>, passphrase?: string) {
  const pairs: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (
      key !== "signature" &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      pairs.push(`${key}=${encode(String(value))}`);
    }
  }

  if (passphrase && passphrase.trim() !== "") {
    pairs.push(`passphrase=${encode(passphrase)}`);
  }

  return crypto.createHash("md5").update(pairs.join("&")).digest("hex");
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
const discountCode = String(body?.discountCode ?? "").trim().toUpperCase();
    const dogTags = Math.max(0, Number(body.dogTags || 0));
    const cards = Math.max(0, Number(body.cards || 0));

    if (dogTags === 0 && cards === 0) {
      return NextResponse.json(
        { error: "Please select at least one item." },
        { status: 400 }
      );
    }

    const firstName = String(body.first_name || "").trim();
    const lastName = String(body.last_name || "").trim();
    const bloodType = String(body.blood_type || "").trim();
    const allergies = String(body.allergies || "").trim();
    const emergencyContactName = String(body.emergency_contact_name || "").trim();
    const emergencyContactSurname = String(body.emergency_contact_surname || "").trim();
    const emergencyContactPhone = String(body.emergency_contact_phone || "").trim();
    const email = String(body.email || "").trim();
    const cellphone = String(body.cellphone || "").trim();
    const shippingUnit = String(body.shipping_unit || "").trim();
    const shippingStreet = String(body.shipping_street || "").trim();
    const shippingCity = String(body.shipping_city || "").trim();
    const shippingProvince = String(body.shipping_province || "").trim();
    const shippingPostalCode = String(body.shipping_postal_code || "").trim();
    const shippingCountry = String(body.shipping_country || "South Africa").trim();

    if (
      !firstName ||
      !lastName ||
      !bloodType ||
      !allergies ||
      !emergencyContactName ||
      !emergencyContactSurname ||
      !emergencyContactPhone ||
      !email ||
      !cellphone ||
      !shippingUnit ||
      !shippingStreet ||
      !shippingCity ||
      !shippingProvince ||
      !shippingPostalCode ||
      !shippingCountry
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("public_id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile?.public_id) {
      return NextResponse.json(
        { error: "Profile or QR code not found." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!.trim();
    const qrUrl = `${baseUrl}/e/${profile.public_id}`;

    const subtotal = dogTags * DOG_TAG_PRICE + cards * QR_CARD_PRICE;
    const totalBeforeDiscount = subtotal + DELIVERY_FEE;

let discountPercent = 0;
let discountAmount = 0;
let appliedDiscountCode: string | null = null;

if (discountCode) {
  const { data: discount } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", discountCode)
    .eq("active", true)
    .single();

  if (discount) {
    discountPercent = Number(discount.discount_percent || 0);

    discountAmount = Math.round(
      totalBeforeDiscount * (discountPercent / 100)
    );

    appliedDiscountCode = discount.code;
  }
}

const total = Math.max(1, totalBeforeDiscount - discountAmount);
    const paymentReference = `store_${Date.now()}_${user.id.slice(0, 8)}`;

    const items = [
      dogTags > 0
        ? {
            name: "Black Anodised Aluminium QR Tag",
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

    const customerName = `${firstName} ${lastName}`.trim();

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      status: "pending",
      order_type: "store",
      payment_status: "pending",
      payfast_payment_id: paymentReference,

      customer_name: customerName,
      email,
      shipping_phone: cellphone,
      shipping_unit: shippingUnit,
      shipping_street: shippingStreet,
      shipping_city: shippingCity,
      shipping_province: shippingProvince,
      shipping_postal_code: shippingPostalCode,
      shipping_country: shippingCountry,

      qr_url: qrUrl,
      first_name: firstName,
      last_name: lastName,
      blood_type: bloodType,
      allergies,
      emergency_contact_name: emergencyContactName,
      emergency_contact_surname: emergencyContactSurname,
      emergency_contact_phone: emergencyContactPhone,

      dog_tag_qty: dogTags,
      card_qty: cards,
      items,
      subtotal,
      delivery_fee: DELIVERY_FEE,
      total_amount: total,

discount_code: appliedDiscountCode,
discount_percent: discountPercent,
discount_amount: discountAmount,
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
      return_url: `${baseUrl}/payment/success`,
      cancel_url: `${baseUrl}/payment/cancel`,
      notify_url: `${baseUrl}/api/payfast/store/itn`,
      name_first: firstName,
      name_last: lastName,
      email_address: email,
      m_payment_id: paymentReference,
      amount: total.toFixed(2),
      item_name: "RROI Store QR Products",
      item_description: `Dog tags: ${dogTags}, QR cards: ${cards}, delivery included`,
      custom_str1: user.id,
      custom_str2: profile.public_id,
      custom_str3: "store",
    };

    payfastData.signature = buildSignature(
      payfastData,
      process.env.PAYFAST_PASSPHRASE
    );

    const redirectUrl = `${payfastProcessUrl()}?${Object.entries(payfastData)
      .map(([key, value]) => `${key}=${encode(String(value))}`)
      .join("&")}`;

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("STORE PAYFAST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to start store payment." },
      { status: 500 }
    );
  }
}