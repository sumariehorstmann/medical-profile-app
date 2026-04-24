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
      created_at,
      customer_name,
      email,
      shipping_phone,
      shipping_unit,
      shipping_street,
      shipping_city,
      shipping_province,
      shipping_postal_code,
      shipping_country,
      qr_url,
      first_name,
      last_name,
      blood_type,
      allergies,
      emergency_contact_name,
      emergency_contact_surname,
      emergency_contact_phone
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}