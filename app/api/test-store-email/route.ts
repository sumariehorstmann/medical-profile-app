import { NextResponse } from "next/server";
import { sendStoreOrderConfirmationEmail } from "@/app/lib/email/sendStoreOrderConfirmationEmail";

export async function GET() {
  const emailWasSent = await sendStoreOrderConfirmationEmail({
    to: "sumariehorstmann@gmail.com",
    customerName: "Su-Marie Horstmann",
    paymentReference: "TEST-ORDER-EMAIL",
    items: [
      {
        name: "Black Anodised Aluminium QR Tag",
        quantity: 1,
        unit_price: 99,
        total: 99,
      },
    ],
    totalAmount: 29.7,
  });

  return NextResponse.json({
    success: emailWasSent,
  });
}