import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const admin = createSupabaseAdmin();

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing auth token." }, { status: 401 });
    }

    const userClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const adminEmails = [
      "sumariehorstmann@gmail.com",
      "support@rroi.co.za",
    ];

    const userEmail = String(user.email || "").toLowerCase();

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.json({ error: "Admin access denied." }, { status: 403 });
    }

    const { data: affiliates, error: affiliatesError } = await admin
      .from("affiliates")
      .select("*")
      .order("created_at", { ascending: true });

    if (affiliatesError) throw affiliatesError;

    const affiliateUserIds = Array.from(
      new Set((affiliates ?? []).map((a) => a.user_id).filter(Boolean))
    );

    let affiliateApplications: any[] = [];
    let affiliateSubscriptions: any[] = [];

    if (affiliateUserIds.length > 0) {
      const { data: applications, error: applicationsError } = await admin
        .from("affiliate_applications")
        .select("user_id, email, full_name")
        .in("user_id", affiliateUserIds);

      if (applicationsError) throw applicationsError;

      affiliateApplications = applications ?? [];

      const { data: subscriptions, error: subscriptionsError } = await admin
        .from("subscriptions")
        .select("user_id, status, current_period_end")
        .in("user_id", affiliateUserIds);

      if (subscriptionsError) throw subscriptionsError;

      affiliateSubscriptions = subscriptions ?? [];
    }

    const { data: referrals, error: referralsError } = await admin
      .from("affiliate_referrals")
      .select("*")
      .order("created_at", { ascending: false });

    if (referralsError) throw referralsError;

    const { data: payoutHistory, error: payoutHistoryError } = await admin
      .from("affiliate_payouts")
      .select("*")
      .order("paid_at", { ascending: false });

    if (payoutHistoryError) throw payoutHistoryError;

    const referralUserIds = Array.from(
      new Set((referrals ?? []).map((r) => r.user_id).filter(Boolean))
    );

    let customerProfiles: any[] = [];

    if (referralUserIds.length > 0) {
      const { data: profiles, error: profilesError } = await admin
        .from("profiles")
        .select("user_id, first_name, last_name")
        .in("user_id", referralUserIds);

      if (profilesError) throw profilesError;

      customerProfiles = profiles ?? [];
    }

    return NextResponse.json({
      affiliates: affiliates ?? [],
      affiliateApplications,
      affiliateSubscriptions,
      referrals: referrals ?? [],
      payoutHistory: payoutHistory ?? [],
      customerProfiles,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to load affiliate payout data." },
      { status: 500 }
    );
  }
}