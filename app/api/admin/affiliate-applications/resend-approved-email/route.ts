import { sendAffiliateApplicationEmail } from "@/app/lib/email/sendAffiliateApplicationEmail";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin/requireAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const admin = createSupabaseAdmin();

    const adminCheck = await requireAdmin(req);

if (adminCheck.error) {
  return NextResponse.json(
    { error: adminCheck.error },
    { status: adminCheck.status }
  );
}

    const body = await req.json().catch(() => ({}));
    const affiliateId = String(body?.affiliateId || "").trim();

    if (!affiliateId) {
      return NextResponse.json({ error: "Affiliate ID is required." }, { status: 400 });
    }

    const { data: affiliate, error: affiliateError } = await admin
      .from("affiliates")
      .select("id, user_id, full_name, affiliate_code, status")
      .eq("id", affiliateId)
      .maybeSingle();

    if (affiliateError) throw affiliateError;

    if (!affiliate) {
      return NextResponse.json({ error: "Affiliate not found." }, { status: 404 });
    }

    const { data: application, error: applicationError } = await admin
      .from("affiliate_applications")
      .select("email, full_name")
      .eq("user_id", affiliate.user_id)
      .maybeSingle();

    if (applicationError) throw applicationError;

    const to = application?.email;

    if (!to) {
      return NextResponse.json(
        { error: "No email address found for this affiliate." },
        { status: 400 }
      );
    }

    await sendAffiliateApplicationEmail({
      to,
      firstName: application.full_name || affiliate.full_name,
      status: "approved",
      affiliateCode: affiliate.affiliate_code,
    });

    return NextResponse.json({
      success: true,
      message: "Approval email resent successfully.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to resend approval email." },
      { status: 500 }
    );
  }
}