import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
function getCurrentCutoffDate() {
  const now = new Date();
  const year = now.getFullYear();

  const cutoffs = [
    new Date(year, 2, 15, 23, 59, 59),  // 15 March
    new Date(year, 5, 15, 23, 59, 59),  // 15 June
    new Date(year, 8, 15, 23, 59, 59),  // 15 September
    new Date(year, 11, 15, 23, 59, 59), // 15 December
  ];

  for (const cutoff of cutoffs) {
    if (now <= cutoff) return cutoff;
  }

  // if after Dec cutoff → use last cutoff
  return cutoffs[3];
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const affiliateId = String(body?.affiliateId || "").trim();
const eftReference = String(body?.eftReference || "").trim();

if (!eftReference || eftReference.length < 3) {
  return NextResponse.json(
    { error: "EFT reference is required." },
    { status: 400 }
  );
}
    if (!affiliateId) {
      return NextResponse.json(
        { error: "Missing affiliateId." },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json(
        { error: "Missing auth token." },
        { status: 401 }
      );
    }

    const userClient = createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const adminEmails = [
      "sumariehorstmann@gmail.com",
      "support@rroi.co.za",
    ];

    const userEmail = String(user.email || "").toLowerCase();

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.json(
        { error: "Admin access denied." },
        { status: 403 }
      );
    }

    const { data: affiliate, error: affiliateError } = await supabase
      .from("affiliates")
      .select("id, total_paid")
      .eq("id", affiliateId)
      .single();

    if (affiliateError || !affiliate) {
      return NextResponse.json(
        { error: "Affiliate not found." },
        { status: 404 }
      );
    }

    const cutoffDate = getCurrentCutoffDate();
const payoutCycle = `Q${Math.floor(cutoffDate.getMonth() / 3) + 1} ${cutoffDate.getFullYear()}`;
const { data: referrals, error: referralsError } = await supabase
  .from("affiliate_referrals")
  .select("id, commission, status, paid, created_at")
  .eq("affiliate_id", affiliateId)
  .eq("status", "confirmed")
  .eq("paid", false)
  .lte("created_at", cutoffDate.toISOString());

    if (referralsError) {
      return NextResponse.json(
        { error: "Failed to load referrals." },
        { status: 500 }
      );
    }

    const unpaidReferrals = referrals ?? [];
    const payoutAmount = unpaidReferrals.reduce((sum, row) => {
      return sum + Number(row.commission ?? 0);
    }, 0);

    if (unpaidReferrals.length === 0 || payoutAmount <= 0) {
      return NextResponse.json(
        { error: "No unpaid confirmed referrals found." },
        { status: 400 }
      );
    }

    const referralIds = unpaidReferrals.map((row) => row.id);

    const { error: markPaidError } = await supabase
      .from("affiliate_referrals")
      .update({ paid: true })
      .in("id", referralIds);

    if (markPaidError) {
      return NextResponse.json(
        { error: "Failed to mark referrals as paid." },
        { status: 500 }
      );
    }

    const newTotalPaid = Number(affiliate.total_paid ?? 0) + payoutAmount;
const { error: payoutHistoryError } = await supabase
  .from("affiliate_payouts")
  .insert({
    affiliate_id: affiliateId,
    payout_amount: payoutAmount,
    referral_count: referralIds.length,
    payout_cycle: payoutCycle,
    cutoff_date: cutoffDate.toISOString(),
    paid_by_email: userEmail,
    eft_reference: eftReference,
  });

if (payoutHistoryError) {
  return NextResponse.json(
    { error: "Failed to create payout history record." },
    { status: 500 }
  );
}
    const { error: affiliateUpdateError } = await supabase
      .from("affiliates")
      .update({ total_paid: newTotalPaid })
      .eq("id", affiliateId);

    if (affiliateUpdateError) {
      return NextResponse.json(
        { error: "Failed to update affiliate total_paid." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      affiliateId,
      payoutAmount,
      referralCount: referralIds.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}