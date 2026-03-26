import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { generateAffiliateCode } from "@/lib/generateAffiliateCode";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // no-op in this route
          },
        },
      }
    );

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("user_id", user.id)
      .maybeSingle();

    if (subscriptionError) {
      console.error("SUBSCRIPTION LOOKUP ERROR:", subscriptionError);
      return NextResponse.json(
        { error: "Failed to verify subscription." },
        { status: 500 }
      );
    }

    const isPremium =
      !!subscription &&
      subscription.status === "active" &&
      !!subscription.current_period_end &&
      new Date(subscription.current_period_end).getTime() > Date.now();

    if (!isPremium) {
      return NextResponse.json(
        { error: "Premium subscription required" },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const fullName = String(body?.fullName ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const bankName = String(body?.bankName ?? "").trim();
    const accountHolder = String(body?.accountHolder ?? "").trim();
    const accountNumber = String(body?.accountNumber ?? "").trim();
    const accountType = String(body?.accountType ?? "").trim();
    const branchCode = String(body?.branchCode ?? "").trim();

    if (
      !fullName ||
      !phone ||
      !bankName ||
      !accountHolder ||
      !accountNumber ||
      !accountType ||
      !branchCode
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const { data: existingAffiliate, error: existingAffiliateError } =
      await supabaseAdmin
        .from("affiliates")
        .select("id, affiliate_code")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existingAffiliateError) {
      console.error("EXISTING AFFILIATE LOOKUP ERROR:", existingAffiliateError);
      return NextResponse.json(
        { error: "Failed to check affiliate status." },
        { status: 500 }
      );
    }

    if (existingAffiliate) {
      return NextResponse.json(
        {
          error: "Already an affiliate",
          affiliateCode: existingAffiliate.affiliate_code,
        },
        { status: 400 }
      );
    }

    const affiliateCode = await generateAffiliateCode();

    const { error: insertError } = await supabaseAdmin.from("affiliates").insert({
      user_id: user.id,
      affiliate_code: affiliateCode,
      full_name: fullName,
      phone,
      bank_name: bankName,
      account_holder: accountHolder,
      account_number: accountNumber,
      account_type: accountType,
      branch_code: branchCode,
      status: "active",
      total_earned: 0,
      total_paid: 0,
    });

    if (insertError) {
      console.error("AFFILIATE INSERT ERROR:", insertError);
      return NextResponse.json(
        { error: "Failed to create affiliate account." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      affiliateCode,
    });
  } catch (err) {
    console.error("AFFILIATE CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}