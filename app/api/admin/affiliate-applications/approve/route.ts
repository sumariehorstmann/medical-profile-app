import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { generateAffiliateCode } from "@/lib/generateAffiliateCode";

export const dynamic = "force-dynamic";

function normalizeString(value: unknown) {
  return String(value ?? "").trim();
}

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
            // no-op
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
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // TEMPORARY ADMIN CHECK
    // Replace this later with your real admin check.
    const adminEmails = ["rapidresponseonlineinfo@gmail.com"];
    const userEmail = String(user.email || "").toLowerCase();

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

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
      .select("*")
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
        { error: "This application has already been approved." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { data: existingAffiliate, error: existingAffiliateError } =
      await supabaseAdmin
        .from("affiliates")
        .select("id, affiliate_code")
        .eq("user_id", application.user_id)
        .maybeSingle();

    if (existingAffiliateError) {
      console.error("AFFILIATE LOOKUP ERROR:", existingAffiliateError);
      return NextResponse.json(
        { error: "Failed to check affiliate record." },
        { status: 500 }
      );
    }

    const affiliateCode =
      existingAffiliate?.affiliate_code || (await generateAffiliateCode());

    if (existingAffiliate?.id) {
      const { error: updateAffiliateError } = await supabaseAdmin
        .from("affiliates")
        .update({
          status: "approved",
          affiliate_code: affiliateCode,
          full_name: application.full_name,
          phone: application.phone,
          bank_name: application.bank_name,
          account_holder: application.account_holder,
          account_number: application.account_number,
          account_type: application.account_type,
          branch_code: application.branch_code,
          approved_at: now,
          deactivated_at: null,
          deactivation_reason: null,
          updated_at: now,
        })
        .eq("id", existingAffiliate.id);

      if (updateAffiliateError) {
        console.error("AFFILIATE UPDATE ERROR:", updateAffiliateError);
        return NextResponse.json(
          { error: "Failed to update affiliate record." },
          { status: 500 }
        );
      }
    } else {
      const { error: insertAffiliateError } = await supabaseAdmin
        .from("affiliates")
        .insert({
          user_id: application.user_id,
          status: "approved",
          affiliate_code: affiliateCode,
          full_name: application.full_name,
          phone: application.phone,
          bank_name: application.bank_name,
          account_holder: application.account_holder,
          account_number: application.account_number,
          account_type: application.account_type,
          branch_code: application.branch_code,
          total_earned: 0,
          total_paid: 0,
          approved_at: now,
          updated_at: now,
        });

      if (insertAffiliateError) {
        console.error("AFFILIATE INSERT ERROR:", insertAffiliateError);
        return NextResponse.json(
          { error: "Failed to create affiliate record." },
          { status: 500 }
        );
      }
    }

    const { error: applicationUpdateError } = await supabaseAdmin
      .from("affiliate_applications")
      .update({
        status: "approved",
        reviewed_at: now,
        review_notes: reviewNotes || null,
        updated_at: now,
      })
      .eq("id", application.id);

    if (applicationUpdateError) {
      console.error("APPLICATION APPROVE ERROR:", applicationUpdateError);
      return NextResponse.json(
        { error: "Affiliate was created, but application status failed to update." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      affiliateCode,
      message: "Affiliate application approved successfully.",
    });
  } catch (err) {
    console.error("AFFILIATE APPROVAL ERROR:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}