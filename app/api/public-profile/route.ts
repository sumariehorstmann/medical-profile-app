import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("publicId") || searchParams.get("publicid");

    if (!publicId) {
      return NextResponse.json({ profile: null, error: "Missing publicId" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    const { data: profile, error: pErr } = await supabase
      .from("profiles")
      .select(`
        id,
        public_id,
        is_paid,
        first_name,
        last_name,
        gender,
        date_of_birth,
        blood_type,
        allergies,
        conditions,
        medications,
        special_notes,
        primary_language,
        secondary_language,
        medical_aid_provider,
        medical_aid_policy_number,
        gp_name,
        gp_practice,
        gp_phone,
        religion,
        additional_notes,
        emergency1_fullname,
        emergency1_relationship,
        emergency1_phone,
        emergency2_fullname,
        emergency2_relationship,
        emergency2_phone
      `)
      .eq("public_id", publicId)
      .maybeSingle();

    if (pErr) {
      return NextResponse.json({ profile: null, error: pErr.message }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    const emergency_contacts = [
      {
        full_name: profile.emergency1_fullname ?? null,
        relationship: profile.emergency1_relationship ?? null,
        phone: profile.emergency1_phone ?? null,
        sort_order: 1,
      },
      {
        full_name: profile.emergency2_fullname ?? null,
        relationship: profile.emergency2_relationship ?? null,
        phone: profile.emergency2_phone ?? null,
        sort_order: 2,
      },
    ].filter((c) => c.full_name || c.relationship || c.phone);

    return NextResponse.json(
      {
        profile: {
          ...profile,
          emergency_contacts,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { profile: null, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}