import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: order, error: orderLookupError } = await supabase
      .from("orders")
      .select("id, total_amount, payment_status")
      .eq("payfast_payment_id", paymentId)
      .eq("order_type", "store")
      .maybeSingle();

    if (orderLookupError || !order) {
      console.error("STORE ITN ORDER NOT FOUND:", orderLookupError);
      return new NextResponse("OK", { status: 200 });
    }

    if (order.payment_status === "paid") {
      console.log("STORE ORDER ALREADY PAID");
      return new NextResponse("OK", { status: 200 });
    }

    const expectedAmount = Number(order.total_amount);

    if (Math.abs(amountGross - expectedAmount) > 0.01) {
      console.error("STORE ITN INVALID AMOUNT:", amountGross, expectedAmount);
      return new NextResponse("OK", { status: 200 });
    }

    const isPaid = paymentStatus.toUpperCase() === "COMPLETE";

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: isPaid ? "paid" : paymentStatus.toLowerCase(),
        status: isPaid ? "paid" : "pending",
        
      })
      .eq("id", order.id);

    if (updateError) {
      console.error("STORE ITN UPDATE ERROR:", updateError);
      return new NextResponse("OK", { status: 200 });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("STORE ITN ERROR:", error);
    return new NextResponse("OK", { status: 200 });
  }
}