import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId =
      searchParams.get("publicId") || searchParams.get("publicid");

    if (!publicId) {
      return NextResponse.json(
        { profile: null, error: "Missing publicId" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(`
  id,
  user_id,
  public_id,
  first_name,
  last_name,
  profile_photo_url,
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
  medical_aid_plan,
  gp_name,
  gp_phone,
  specialist_name,
  specialist_phone,
  preferred_hospital,
  religion,
  additional_notes,
  height_cm,
  weight_kg,
  eye_color,
  hair_color,
  identifying_marks,
  skin_tone,
  implanted_devices,
  mobility_notes,
  pregnancy_status,
  organ_donor_status,
  province,
  city,
  nationality,
  emergency1_fullname,
  emergency1_first_name,
  emergency1_last_name,
  emergency1_relationship,
  emergency1_phone,
  emergency2_fullname,
  emergency2_first_name,
  emergency2_last_name,
  emergency2_relationship,
  emergency2_phone
`)
      .eq("public_id", publicId)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        { profile: null, error: profileError.message },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    let subscription: {
      status: string | null;
      current_period_end: string | null;
    } | null = null;

    let isPremium = false;

    if (profile.user_id) {
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", profile.user_id)
          .maybeSingle();

      if (subscriptionError) {
        return NextResponse.json(
          { profile: null, error: subscriptionError.message },
          { status: 500 }
        );
      }

      subscription = subscriptionData ?? null;

      if (
        subscription?.status === "active" &&
        subscription.current_period_end &&
        new Date(subscription.current_period_end).getTime() > Date.now()
      ) {
        isPremium = true;
      }
    }

    const emergency_contacts = [
      {
        full_name:
          profile.emergency1_fullname ??
          ([profile.emergency1_first_name, profile.emergency1_last_name]
            .filter(Boolean)
            .join(" ")
            .trim() || null),
        first_name: profile.emergency1_first_name ?? null,
        last_name: profile.emergency1_last_name ?? null,
        relationship: profile.emergency1_relationship ?? null,
        phone: profile.emergency1_phone ?? null,
        sort_order: 1,
      },
      {
        full_name:
          profile.emergency2_fullname ??
          ([profile.emergency2_first_name, profile.emergency2_last_name]
            .filter(Boolean)
            .join(" ")
            .trim() || null),
        first_name: profile.emergency2_first_name ?? null,
        last_name: profile.emergency2_last_name ?? null,
        relationship: profile.emergency2_relationship ?? null,
        phone: profile.emergency2_phone ?? null,
        sort_order: 2,
      },
    ].filter(
      (contact) =>
        contact.full_name ||
        contact.first_name ||
        contact.last_name ||
        contact.relationship ||
        contact.phone
    );

    return NextResponse.json(
      {
        profile: {
          id: profile.id,
          public_id: profile.public_id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          profile_photo_url: profile.profile_photo_url,
          is_paid: isPremium,
          subscription,

          gender: isPremium ? profile.gender : null,
          date_of_birth: isPremium ? profile.date_of_birth : null,
          blood_type: isPremium ? profile.blood_type : null,
          allergies: isPremium ? profile.allergies : null,
          conditions: isPremium ? profile.conditions : null,
          medications: isPremium ? profile.medications : null,
          special_notes: isPremium ? profile.special_notes : null,

          primary_language: isPremium ? profile.primary_language : null,
          secondary_language: isPremium ? profile.secondary_language : null,

          medical_aid_provider: isPremium ? profile.medical_aid_provider : null,
          medical_aid_policy_number: isPremium
            ? profile.medical_aid_policy_number
            : null,
          medical_aid_plan: isPremium ? profile.medical_aid_plan : null,

          gp_name: isPremium ? profile.gp_name : null,
          gp_phone: isPremium ? profile.gp_phone : null,
          specialist_name: isPremium ? profile.specialist_name : null,
          specialist_phone: isPremium ? profile.specialist_phone : null,
          preferred_hospital: isPremium ? profile.preferred_hospital : null,

          religion: isPremium ? profile.religion : null,
          additional_notes: isPremium ? profile.additional_notes : null,

          height_cm: isPremium ? profile.height_cm : null,
          weight_kg: isPremium ? profile.weight_kg : null,
          eye_color: isPremium ? profile.eye_color : null,
          hair_color: isPremium ? profile.hair_color : null,
          identifying_marks: isPremium ? profile.identifying_marks : null,
          skin_tone: isPremium ? profile.skin_tone : null,

          implanted_devices: isPremium ? profile.implanted_devices : null,
          mobility_notes: isPremium ? profile.mobility_notes : null,
          pregnancy_status: isPremium ? profile.pregnancy_status : null,
          organ_donor_status: isPremium ? profile.organ_donor_status : null,

          province: isPremium ? profile.province : null,
          city: isPremium ? profile.city : null,
          nationality: isPremium ? profile.nationality : null,

          
          emergency_contacts: isPremium
            ? emergency_contacts
            : emergency_contacts.slice(0, 1),
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { profile: null, error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}