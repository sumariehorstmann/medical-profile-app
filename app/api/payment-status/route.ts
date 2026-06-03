import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("payment_id");

  if (!paymentId) {
    return NextResponse.json({ status: "missing_payment_id" }, { status: 400 });
  }

  const { data: payment, error } = await supabase
    .from("payments")
    .select("status")
    .eq("provider_payment_id", paymentId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }

  return NextResponse.json({
    status: payment?.status || "pending",
  });
}