import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function normalizeString(value: unknown) {
  return String(value ?? "").trim();
}

function isFilled(value: string) {
  return value.trim().length > 0;
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
      (!subscription.current_period_end ||
        new Date(subscription.current_period_end).getTime() > Date.now());

    if (!isPremium) {
      return NextResponse.json(
        { error: "Premium subscription required." },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const fullName = normalizeString(body?.fullName);
    const email = normalizeString(body?.email || user.email);
    const phone = normalizeString(body?.phone);
    const country = normalizeString(body?.country);
    const province = normalizeString(body?.province);
    const city = normalizeString(body?.city);
    const promotionMethod = normalizeString(body?.promotionMethod);
    const targetAudience = normalizeString(body?.targetAudience);
    const instagramHandle = normalizeString(body?.instagramHandle);
    const facebookProfile = normalizeString(body?.facebookProfile);
    const tiktokHandle = normalizeString(body?.tiktokHandle);
    const experience = normalizeString(body?.experience);
    const experienceDetails = normalizeString(body?.experienceDetails);
    const bankName = normalizeString(body?.bankName);
    const accountHolder = normalizeString(body?.accountHolder);
    const accountNumber = normalizeString(body?.accountNumber);
    const accountType = normalizeString(body?.accountType);
    const branchCode = normalizeString(body?.branchCode);

    const agreeTerms = body?.agreeTerms === true;
    const agreeMarketing = body?.agreeMarketing === true;
    const agreeTax = body?.agreeTax === true;

    if (!isFilled(fullName)) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!isFilled(phone)) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    if (!isFilled(country) || !isFilled(province) || !isFilled(city)) {
      return NextResponse.json(
        { error: "Country, province, and city are required." },
        { status: 400 }
      );
    }

    if (!isFilled(promotionMethod)) {
      return NextResponse.json(
        { error: "Promotion method is required." },
        { status: 400 }
      );
    }

    if (!isFilled(targetAudience)) {
      return NextResponse.json(
        { error: "Target audience is required." },
        { status: 400 }
      );
    }

    if (!isFilled(experience)) {
      return NextResponse.json(
        { error: "Promotion experience selection is required." },
        { status: 400 }
      );
    }

    if (experience.toLowerCase() === "yes" && !isFilled(experienceDetails)) {
      return NextResponse.json(
        { error: "Please describe your promotion experience." },
        { status: 400 }
      );
    }

    if (
      !isFilled(bankName) ||
      !isFilled(accountHolder) ||
      !isFilled(accountNumber) ||
      !isFilled(accountType) ||
      !isFilled(branchCode)
    ) {
      return NextResponse.json(
        { error: "Please complete all banking details." },
        { status: 400 }
      );
    }

    if (!agreeTerms || !agreeMarketing || !agreeTax) {
      return NextResponse.json(
        { error: "You must accept all required declarations." },
        { status: 400 }
      );
    }

    const { data: existingAffiliate, error: existingAffiliateError } =
      await supabaseAdmin
        .from("affiliates")
        .select("id, status, affiliate_code")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existingAffiliateError) {
      console.error("AFFILIATE LOOKUP ERROR:", existingAffiliateError);
      return NextResponse.json(
        { error: "Failed to check affiliate account." },
        { status: 500 }
      );
    }

    if (
      existingAffiliate &&
      ["approved", "active"].includes(
        String(existingAffiliate.status || "").toLowerCase()
      )
    ) {
      return NextResponse.json(
        {
          error: "Your affiliate account is already approved.",
          affiliateCode: existingAffiliate.affiliate_code || null,
        },
        { status: 400 }
      );
    }

    const { data: existingApplication, error: existingApplicationError } =
      await supabaseAdmin
        .from("affiliate_applications")
        .select("id, status")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existingApplicationError) {
      console.error("APPLICATION LOOKUP ERROR:", existingApplicationError);
      return NextResponse.json(
        { error: "Failed to check existing application." },
        { status: 500 }
      );
    }

    if (
      existingApplication &&
      String(existingApplication.status || "").toLowerCase() === "pending"
    ) {
      return NextResponse.json(
        { error: "Your affiliate application is already pending review." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const applicationPayload = {
      user_id: user.id,
      full_name: fullName,
      email,
      phone,
      country,
      province,
      city,
      promotion_method: promotionMethod,
      target_audience: targetAudience,
      instagram_handle: instagramHandle || null,
      facebook_profile: facebookProfile || null,
      tiktok_handle: tiktokHandle || null,
      experience,
      experience_details: experienceDetails || null,
      bank_name: bankName,
      account_holder: accountHolder,
      account_number: accountNumber,
      account_type: accountType,
      branch_code: branchCode,
      agree_terms: true,
      agree_marketing: true,
      agree_tax: true,
      terms_accepted_at: now,
      marketing_rules_accepted_at: now,
      tax_declaration_accepted_at: now,
      status: "pending",
      reviewed_at: null,
      review_notes: null,
      updated_at: now,
    };

    if (existingApplication?.id) {
      const { error: updateError } = await supabaseAdmin
        .from("affiliate_applications")
        .update(applicationPayload)
        .eq("id", existingApplication.id);

      if (updateError) {
        console.error("APPLICATION UPDATE ERROR:", updateError);
        return NextResponse.json(
          { error: "Failed to update affiliate application." },
          { status: 500 }
        );
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("affiliate_applications")
        .insert({
          ...applicationPayload,
          created_at: now,
        });

      if (insertError) {
        console.error("APPLICATION INSERT ERROR:", insertError);
        return NextResponse.json(
          { error: "Failed to submit affiliate application." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      status: "pending",
      message: "Your affiliate application has been submitted for review.",
    });
  } catch (err) {
    console.error("AFFILIATE APPLICATION ERROR:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}