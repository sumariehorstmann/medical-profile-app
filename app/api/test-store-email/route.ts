import { NextResponse } from "next/server";
import { sendStoreOrderConfirmationEmail } from "@/app/lib/email/sendStoreOrderConfirmationEmail";

export async function GET() {
  const emailWasSent = await sendStoreOrderConfirmationEmail({
    to: "support@rroi.co.za",
    customerName: "Su-Marie Horstmann",
    paymentReference: "TEST-ORDER-EMAIL",
    items: [
      {
        name: "Black Anodised Aluminium QR Tag",
        quantity: 1,
        unit_price: 150,
        total: 150,
      },
    ],
    totalAmount: 150,
  });

  return NextResponse.json({
    success: emailWasSent,
  });
}