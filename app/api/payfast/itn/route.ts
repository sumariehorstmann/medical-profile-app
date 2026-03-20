import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const paymentStatus = String(formData.get("payment_status") || "");
    const paymentId = String(formData.get("m_payment_id") || "");
    const publicId = String(formData.get("custom_str1") || "");
    const buyerEmail = String(formData.get("custom_str2") || "");
    const amountGross = String(formData.get("amount_gross") || "");

    console.log("PAYFAST ITN RECEIVED", {
      paymentStatus,
      paymentId,
      publicId,
      buyerEmail,
      amountGross,
    });

    if (paymentStatus !== "COMPLETE") {
      return new NextResponse("Payment not complete", { status: 200 });
    }

    if (!publicId) {
      return new NextResponse("Missing public_id", { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, user_id, public_id")
      .eq("public_id", publicId)
      .single();

    if (profileError || !profile) {
      console.error("PROFILE LOOKUP ERROR", profileError);
      return new NextResponse("Profile not found", { status: 404 });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        is_paid: true,
      })
      .eq("id", profile.id);

    if (profileUpdateError) {
      console.error("PROFILE UPDATE ERROR", profileUpdateError);
      return new NextResponse("Failed to update profile", { status: 500 });
    }

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: profile.user_id,
          status: "active",
          current_period_start: startDate.toISOString(),
          current_period_end: endDate.toISOString(),
          provider: "payfast",
          provider_subscription_id: paymentId,
          auto_renew: false,
          plan: "premium_annual",
          price: 299,
          price_cents: 29900,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (subscriptionError) {
      console.error("SUBSCRIPTION UPSERT ERROR", subscriptionError);
      return new NextResponse("Failed to update subscription", { status: 500 });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error: any) {
    console.error("PAYFAST ITN ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}