import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const affiliateId = String(body?.affiliateId || "").trim();

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

    const { data: referrals, error: referralsError } = await supabase
      .from("affiliate_referrals")
      .select("id, commission, status, paid")
      .eq("affiliate_id", affiliateId)
      .eq("status", "confirmed")
      .eq("paid", false);

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