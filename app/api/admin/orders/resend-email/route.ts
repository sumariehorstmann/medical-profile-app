import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendStoreOrderConfirmationEmail } from "@/app/lib/email/sendStoreOrderConfirmationEmail";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId." },
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
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const emailSent = await sendStoreOrderConfirmationEmail({
  to: order.email,
  customerName: order.customer_name,
  paymentReference: order.payfast_payment_id || order.id,
  items: order.items || [],
  totalAmount: Number(order.total_amount || 0),
  hideItemTotals: order.order_type === "premium_kit",
  emailType: order.order_type === "premium_kit" ? "premium_kit" : "store",
});

    if (!emailSent) {
      return NextResponse.json(
        { error: "Email failed to send." },
        { status: 500 }
      );
    }

    await admin
      .from("orders")
      .update({
        email_sent: true,
      })
      .eq("id", orderId);

    return NextResponse.json({
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Server error.",
      },
      { status: 500 }
    );
  }
}
