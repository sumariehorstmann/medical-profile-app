import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = createSupabaseAdmin();

    const { data: affiliates, error: affiliatesError } = await admin
      .from("affiliates")
      .select("*")
      .order("created_at", { ascending: true });

    if (affiliatesError) throw affiliatesError;

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
