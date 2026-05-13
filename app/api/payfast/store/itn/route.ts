import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const paymentId = String(formData.get("m_payment_id") || "");
    const paymentStatus = String(formData.get("payment_status") || "");

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const isPaid = paymentStatus.toUpperCase() === "COMPLETE";

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: isPaid ? "paid" : paymentStatus.toLowerCase(),
        status: isPaid ? "pending" : "pending",
      })
      .eq("payfast_payment_id", paymentId)
      .eq("order_type", "store");

    if (error) {
      console.error("STORE ITN UPDATE ERROR:", error);
      return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("STORE ITN ERROR:", error);
    return NextResponse.json({ error: "Store ITN failed." }, { status: 500 });
  }
}