import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendTrackingEmail } from "@/app/lib/email/sendTrackingEmail";
import { requireAdmin } from "@/lib/admin/requireAdmin";

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);

if (adminCheck.error) {
  return NextResponse.json(
    { error: adminCheck.error },
    { status: adminCheck.status }
  );
}
    const { orderId, courierName, trackingNumber, trackingUrl } =
      await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId." }, { status: 400 });
    }

    if (!courierName || !trackingNumber) {
      return NextResponse.json(
        { error: "Courier name and tracking number are required." },
        { status: 400 }
      );
    }

    const admin = createSupabaseAdmin();

    const { data: order, error } = await admin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const emailSent = await sendTrackingEmail({
      to: order.email,
      customerName: order.customer_name,
      orderReference: order.payment_id || order.id,
      courierName,
      trackingNumber,
      trackingUrl,
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: "Tracking email failed to send." },
        { status: 500 }
      );
    }

    await admin
      .from("orders")
      .update({
        courier_name: courierName,
        tracking_number: trackingNumber,
        tracking_url: trackingUrl || null,
        tracking_email_sent: true,
        tracking_email_sent_at: new Date().toISOString(),
        status: "shipped",
      })
      .eq("id", orderId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}
