import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rroi.co.za";

const adminEmails = ["sumariehorstmann@gmail.com", "support@rroi.co.za"];

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function splitFullName(fullName?: string | null) {
  const clean = (fullName ?? "").trim();
  if (!clean) return { name: "", surname: "" };

  const parts = clean.split(/\s+/);
  if (parts.length === 1) return { name: parts[0], surname: "" };

  return {
    name: parts.slice(0, -1).join(" "),
    surname: parts.slice(-1).join(""),
  };
}

async function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return { ok: false, error: "Missing auth token.", status: 401 };
  }

  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const {
    data: { user },
    error,
  } = await userClient.auth.getUser();

  if (error || !user?.email) {
    return { ok: false, error: "Unauthorized.", status: 401 };
  }

  if (!adminEmails.includes(user.email.toLowerCase())) {
    return { ok: false, error: "Admin access denied.", status: 403 };
  }

  return { ok: true, email: user.email };
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);

  if (!admin.ok) {
    return NextResponse.json(
      { error: admin.error },
      { status: admin.status }
    );
  }

  const { data: paidPayments, error: paymentsError } = await supabase
    .from("payments")
    .select("id, user_id, public_id, provider_payment_id, amount, status, raw_payload")
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (paymentsError) {
    return NextResponse.json(
      { error: paymentsError.message },
      { status: 500 }
    );
  }

  const payments = paidPayments ?? [];

  const paymentIds = payments
    .map((payment) => payment.provider_payment_id)
    .filter(Boolean);

  if (paymentIds.length === 0) {
    return NextResponse.json({
      success: true,
      checked: 0,
      recovered: 0,
      skipped: 0,
    });
  }

  const { data: existingOrders, error: ordersError } = await supabase
    .from("orders")
    .select("payment_id")
    .in("payment_id", paymentIds);

  if (ordersError) {
    return NextResponse.json(
      { error: ordersError.message },
      { status: 500 }
    );
  }

  const existingOrderPaymentIds = new Set(
    (existingOrders ?? []).map((order) => order.payment_id)
  );

  let recovered = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const payment of payments) {
    const paymentId = String(payment.provider_payment_id || "").trim();
    if (!paymentId) {
      skipped += 1;
      continue;
    }

    if (existingOrderPaymentIds.has(paymentId)) {
      skipped += 1;
      continue;
    }

    const rawPayload = (payment.raw_payload || {}) as Record<string, any>;
    const paymentType = String(rawPayload.custom_str2 || "").toLowerCase();

    if (paymentType === "renewal" || Number(payment.amount ?? 0) === 99) {
      skipped += 1;
      continue;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(`
        id,
        user_id,
        public_id,
        first_name,
        last_name,
        blood_type,
        allergies,
        emergency1_fullname,
        emergency1_phone
      `)
      .eq("user_id", payment.user_id)
      .maybeSingle();

    if (profileError || !profile) {
      errors.push(`Profile missing for payment ${paymentId}`);
      skipped += 1;
      continue;
    }

    const qrUrl = `${SITE_URL}/e/${profile.public_id}`;

    const { data: orderForm } = await supabase
      .from("premium_order_forms")
      .select("*")
      .eq("user_id", profile.user_id)
      .maybeSingle();

    const profileName = `${profile.first_name || ""} ${
      profile.last_name || ""
    }`.trim();

    const fallbackSplit = splitFullName(profileName);
    const fallbackName = `${fallbackSplit.name} ${fallbackSplit.surname}`.trim();

    const shippingName = orderForm
      ? `${orderForm.first_name || ""} ${orderForm.last_name || ""}`.trim()
      : fallbackName;

    const shippingAddress = orderForm
      ? [
          orderForm.shipping_unit,
          orderForm.shipping_street,
          orderForm.shipping_city,
          orderForm.shipping_province,
          orderForm.shipping_postal_code,
          orderForm.shipping_country,
        ]
          .filter(Boolean)
          .join(", ")
      : "";

    const { error: insertError } = await supabase.from("orders").insert({
      user_id: profile.user_id,
      public_id: String(profile.public_id),
      payment_id: paymentId,
      customer_name: shippingName,
      email: orderForm?.email ?? rawPayload.email_address ?? "",
      shipping_name: shippingName,
      shipping_phone: orderForm?.cellphone ?? "",
      shipping_address: shippingAddress,
      shipping_unit: orderForm?.shipping_unit ?? "",
      shipping_street: orderForm?.shipping_street ?? "",
      shipping_city: orderForm?.shipping_city ?? "",
      shipping_province: orderForm?.shipping_province ?? "",
      shipping_postal_code: orderForm?.shipping_postal_code ?? "",
      shipping_country: orderForm?.shipping_country ?? "South Africa",
      qr_url: qrUrl,
      status: "pending",
      first_name: orderForm?.first_name ?? fallbackSplit.name,
      last_name: orderForm?.last_name ?? fallbackSplit.surname,
      emergency_contact_name:
        orderForm?.emergency_contact_name ?? profile.emergency1_fullname ?? "",
      emergency_contact_surname: orderForm?.emergency_contact_surname ?? "",
      emergency_contact_phone:
        orderForm?.emergency_contact_phone ?? profile.emergency1_phone ?? "",
      blood_type: orderForm?.blood_type ?? profile.blood_type ?? "",
      allergies: orderForm?.allergies ?? profile.allergies ?? "",
      product_type: "premium_bundle",
      layout_type: orderForm ? "standard_v1" : "recovered_missing_order_form",
    });

    if (insertError) {
      errors.push(`Order insert failed for payment ${paymentId}: ${insertError.message}`);
      skipped += 1;
      continue;
    }

    recovered += 1;
  }

  return NextResponse.json({
    success: true,
    checked: payments.length,
    recovered,
    skipped,
    errors,
  });
}