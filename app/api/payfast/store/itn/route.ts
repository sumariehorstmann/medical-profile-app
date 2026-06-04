import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendStoreOrderConfirmationEmail } from "@/app/lib/email/sendStoreOrderConfirmationEmail";

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

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);

    const data: Record<string, string> = {};
    params.forEach((value, key) => {
      data[key] = value;
    });

    const receivedSignature = String(data.signature || "").toLowerCase();
    const calculatedSignature = md5(
      buildSignatureFromRawBody(rawBody, process.env.PAYFAST_PASSPHRASE)
    ).toLowerCase();

    if (receivedSignature !== calculatedSignature) {
      console.error("STORE ITN INVALID SIGNATURE");
      return new NextResponse("OK", { status: 200 });
    }

    const paymentId = String(data.m_payment_id || "").trim();
const paymentStatus = String(data.payment_status || "").trim();
const amountGross = Number(data.amount_gross || 0);

if (!paymentId) {
  return new NextResponse("Missing payment reference", { status: 400 });
}

if (paymentStatus.toUpperCase() !== "COMPLETE") {
  console.log("STORE ITN IGNORED - PAYMENT NOT COMPLETE");
  return new NextResponse("OK", { status: 200 });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const { data: pendingOrder, error: pendingOrderLookupError } =
  await supabase
    .from("store_pending_orders")
    .select("*")
    .eq("payment_reference", paymentId)
    .maybeSingle();

if (pendingOrderLookupError || !pendingOrder) {
  console.error(
    "STORE PENDING ORDER NOT FOUND:",
    pendingOrderLookupError
  );

  return new NextResponse("OK", { status: 200 });
}

if (pendingOrder.status === "paid") {
  console.log("STORE ORDER ALREADY PROCESSED");

  return new NextResponse("OK", { status: 200 });
}

const expectedAmount = Number(pendingOrder.total_amount);

if (Math.abs(amountGross - expectedAmount) > 0.01) {
  console.error(
    "STORE ITN INVALID AMOUNT:",
    amountGross,
    expectedAmount
  );

  return new NextResponse("OK", { status: 200 });
}
await supabase.from("payments").upsert(
  {
    user_id: pendingOrder.user_id,
    public_id: pendingOrder.public_id ?? null,
    provider: "payfast",
    provider_payment_id: paymentId,
    amount: amountGross,
    status: "paid",
    paid_at: new Date().toISOString(),
    raw_payload: data,
  },
  { onConflict: "provider_payment_id" }
);
const { data: existingOrder } = await supabase
  .from("orders")
  .select("id")
  .eq("payfast_payment_id", paymentId)
  .eq("order_type", "store")
  .maybeSingle();

if (existingOrder) {
  await supabase
    .from("store_pending_orders")
    .update({ status: "paid" })
    .eq("id", pendingOrder.id);

  console.log("STORE ORDER ALREADY EXISTS:", paymentId);

  return new NextResponse("OK", { status: 200 });
}
const { error: createOrderError } = await supabase
  .from("orders")
  .insert({
    user_id: pendingOrder.user_id,

    status: "paid",
    payment_status: "paid",

    order_type: "store",
    payfast_payment_id: paymentId,

    customer_name: pendingOrder.customer_name,
    email: pendingOrder.email,

    shipping_phone: pendingOrder.shipping_phone,

    shipping_unit: pendingOrder.shipping_unit,
    shipping_street: pendingOrder.shipping_street,
    shipping_city: pendingOrder.shipping_city,
    shipping_province: pendingOrder.shipping_province,
    shipping_postal_code: pendingOrder.shipping_postal_code,
    shipping_country: pendingOrder.shipping_country,

    qr_url: pendingOrder.qr_url,

    first_name: pendingOrder.first_name,
    last_name: pendingOrder.last_name,

    blood_type: pendingOrder.blood_type,
    allergies: pendingOrder.allergies,

    emergency_contact_name:
      pendingOrder.emergency_contact_name,

    emergency_contact_surname:
      pendingOrder.emergency_contact_surname,

    emergency_contact_phone:
      pendingOrder.emergency_contact_phone,

    dog_tag_qty: pendingOrder.dog_tag_qty,
    card_qty: pendingOrder.card_qty,

    items: pendingOrder.items,

    subtotal: pendingOrder.subtotal,
    delivery_fee: pendingOrder.delivery_fee,
    total_amount: pendingOrder.total_amount,
  });

if (createOrderError) {
  console.error(
    "STORE CREATE ORDER ERROR:",
    createOrderError
  );

  return new NextResponse("OK", { status: 200 });
}

await supabase
  .from("store_pending_orders")
  .update({
    status: "paid",
  })
  .eq("id", pendingOrder.id);

console.log("STORE EMAIL CHECK:", {
  email: pendingOrder.email,
  paymentId,
});

if (pendingOrder.email) {
  console.log("STORE EMAIL SENDING:", pendingOrder.email);

  await sendStoreOrderConfirmationEmail({
    to: pendingOrder.email,
    customerName: pendingOrder.customer_name,
    paymentReference: paymentId,
    items: pendingOrder.items,
    totalAmount: Number(pendingOrder.total_amount || 0),
  });

  console.log("STORE EMAIL FUNCTION FINISHED:", pendingOrder.email);
} else {
  console.error("STORE EMAIL NOT SENT - NO EMAIL ON PENDING ORDER");
}

console.log("STORE PAYMENT COMPLETE:", paymentId);

return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("STORE ITN ERROR:", error);
    return new NextResponse("OK", { status: 200 });
  }
}