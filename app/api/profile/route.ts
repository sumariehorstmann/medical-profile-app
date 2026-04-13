import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

type ProfileRow = {
  id: string;
  user_id: string;
  public_id: string;
  created_at: string;
  updated_at: string;

  first_name: string | null;
  last_name: string | null;
  profile_photo_url: string | null;

  emergency1_fullname: string | null;
  emergency1_first_name: string | null;
  emergency1_last_name: string | null;
  emergency1_relationship: string | null;
  emergency1_phone: string | null;

  emergency2_fullname: string | null;
  emergency2_first_name: string | null;
  emergency2_last_name: string | null;
  emergency2_relationship: string | null;
  emergency2_phone: string | null;

  gender: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  special_notes: string | null;

  implanted_devices: string | null;
  mobility_notes: string | null;
  pregnancy_status: string | null;
  organ_donor_status: string | null;

  primary_language: string | null;
  secondary_language: string | null;
  nationality: string | null;
  province: string | null;
  city: string | null;
  id_number: string | null;

  medical_aid_provider: string | null;
  medical_aid_policy_number: string | null;
  medical_aid_plan: string | null;

  gp_name: string | null;
  gp_practice: string | null;
  gp_phone: string | null;
  specialist_name: string | null;
  specialist_phone: string | null;
  preferred_hospital: string | null;

  religion: string | null;
  additional_notes: string | null;

  height_cm: number | null;
  weight_kg: number | null;
  eye_color: string | null;
  hair_color: string | null;
  identifying_marks: string | null;
  skin_tone: string | null;
};

const SELECT_FIELDS = `
  id,
  user_id,
  public_id,
  created_at,
  updated_at,

  first_name,
  last_name,
  profile_photo_url,

  emergency1_fullname,
  emergency1_first_name,
  emergency1_last_name,
  emergency1_relationship,
  emergency1_phone,

  emergency2_fullname,
  emergency2_first_name,
  emergency2_last_name,
  emergency2_relationship,
  emergency2_phone,

  gender,
  date_of_birth,
  blood_type,
  allergies,
  conditions,
  medications,
  special_notes,

  implanted_devices,
  mobility_notes,
  pregnancy_status,
  organ_donor_status,

  primary_language,
  secondary_language,
  nationality,
  province,
  city,
  id_number,

  medical_aid_provider,
  medical_aid_policy_number,
  medical_aid_plan,

  gp_name,
  gp_practice,
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
  skin_tone
`;

async function getAuth() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { supabase, user: null };
  }

  return { supabase, user: data.user };
}

function toNull(value: unknown) {
  if (value === undefined || value === null) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
}

export async function GET() {
  const { supabase, user } = await getAuth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(SELECT_FIELDS)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { profile: (data as ProfileRow) ?? null },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const { supabase, user } = await getAuth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const update = {
    first_name: toNull(body.first_name),
    last_name: toNull(body.last_name),
    profile_photo_url: toNull(body.profile_photo_url),

    emergency1_fullname: toNull(body.emergency1_fullname),
    emergency1_first_name: toNull(body.emergency1_first_name),
    emergency1_last_name: toNull(body.emergency1_last_name),
    emergency1_relationship: toNull(body.emergency1_relationship),
    emergency1_phone: toNull(body.emergency1_phone),

    emergency2_fullname: toNull(body.emergency2_fullname),
    emergency2_first_name: toNull(body.emergency2_first_name),
    emergency2_last_name: toNull(body.emergency2_last_name),
    emergency2_relationship: toNull(body.emergency2_relationship),
    emergency2_phone: toNull(body.emergency2_phone),

    gender: toNull(body.gender),
    date_of_birth: toNull(body.date_of_birth),
    blood_type: toNull(body.blood_type),
    allergies: toNull(body.allergies),
    conditions: toNull(body.conditions),
    medications: toNull(body.medications),
    special_notes: toNull(body.special_notes),

    implanted_devices: toNull(body.implanted_devices),
    mobility_notes: toNull(body.mobility_notes),
    pregnancy_status: toNull(body.pregnancy_status),
    organ_donor_status: toNull(body.organ_donor_status),

    primary_language: toNull(body.primary_language),
    secondary_language: toNull(body.secondary_language),
    nationality: toNull(body.nationality),
    province: toNull(body.province),
    city: toNull(body.city),
    id_number: toNull(body.id_number),

    medical_aid_provider: toNull(body.medical_aid_provider),
    medical_aid_policy_number: toNull(body.medical_aid_policy_number),
    medical_aid_plan: toNull(body.medical_aid_plan),

    gp_name: toNull(body.gp_name),
    gp_practice: toNull(body.gp_practice),
    gp_phone: toNull(body.gp_phone),

    specialist_name: toNull(body.specialist_name),
    specialist_phone: toNull(body.specialist_phone),
    preferred_hospital: toNull(body.preferred_hospital),

    religion: toNull(body.religion),
    additional_notes: toNull(body.additional_notes),

    height_cm: body.height_cm ?? null,
    weight_kg: body.weight_kg ?? null,
    eye_color: toNull(body.eye_color),
    hair_color: toNull(body.hair_color),
    identifying_marks: toNull(body.identifying_marks),
    skin_tone: toNull(body.skin_tone),
  };

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("id, public_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  if (existing) {
    const { data, error } = await supabase
      .from("profiles")
      .update(update)
      .eq("user_id", user.id)
      .select(SELECT_FIELDS)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data }, { status: 200 });
  }

  const insertPayload = {
    user_id: user.id,
    public_id: crypto.randomUUID(),
    ...update,
  };

  const { data, error } = await supabase
    .from("profiles")
    .insert(insertPayload)
    .select(SELECT_FIELDS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data }, { status: 200 });
}