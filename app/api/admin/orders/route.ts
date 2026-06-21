import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select(`
  id,
  status,
  payment_status,
  order_type,
  created_at,

  customer_name,
  email,
  shipping_phone,

  shipping_name,
  shipping_address,
  shipping_unit,
  shipping_street,
  shipping_city,
  shipping_province,
  shipping_postal_code,
  shipping_country,

  public_id,
  qr_url,

  first_name,
  last_name,
  blood_type,
  allergies,
  emergency_contact_name,
  emergency_contact_surname,
  emergency_contact_phone,

  product_type,
  layout_type,

  payment_id,
  payfast_payment_id,

  dog_tag_qty,
  card_qty,
  items,
subtotal,
delivery_fee,
total_amount,
discount_code,
email_sent,
courier_name,
tracking_number,
tracking_url,
tracking_email_sent,
tracking_email_sent_at
`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}