import { sendAffiliateApplicationEmail } from "@/app/lib/email/sendAffiliateApplicationEmail";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin/requireAdmin";

export const dynamic = "force-dynamic";

function normalizeString(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);

if (adminCheck.error) {
  return NextResponse.json(
    { error: adminCheck.error },
    { status: adminCheck.status }
  );
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

    const body = await req.json().catch(() => ({}));
    const applicationId = normalizeString(body?.applicationId);
    const reviewNotes = normalizeString(body?.reviewNotes);

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    const { data: application, error: applicationError } = await supabaseAdmin
  .from("affiliate_applications")
  .select("id, status, email, full_name")
  .eq("id", applicationId)
  .maybeSingle();

    if (applicationError) {
      console.error("APPLICATION LOOKUP ERROR:", applicationError);
      return NextResponse.json(
        { error: "Failed to load affiliate application." },
        { status: 500 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: "Affiliate application not found." },
        { status: 404 }
      );
    }

    if (String(application.status || "").toLowerCase() === "approved") {
      return NextResponse.json(
        { error: "Approved applications cannot be declined here." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { error: declineError } = await supabaseAdmin
      .from("affiliate_applications")
      .update({
        status: "rejected",
        reviewed_at: now,
        review_notes: reviewNotes || null,
        updated_at: now,
      })
      .eq("id", application.id);

    if (declineError) {
      console.error("APPLICATION DECLINE ERROR:", declineError);
      return NextResponse.json(
        { error: "Failed to decline affiliate application." },
        { status: 500 }
      );
    }
  
    await sendAffiliateApplicationEmail({
      to: application.email,
      firstName: application.full_name,
      status: "declined",
    });
    return NextResponse.json({
      success: true,
      message: "Affiliate application declined successfully.",
    });
  } catch (err) {
    console.error("AFFILIATE DECLINE ERROR:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}