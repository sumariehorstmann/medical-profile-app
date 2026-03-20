import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

type ProfileRow = {
  id: string;
  user_id: string;

  first_name: string | null;
  last_name: string | null;

  emergency1_fullname: string | null;
  emergency1_relationship: string | null;
  emergency1_phone: string | null;

  emergency2_fullname: string | null;
  emergency2_relationship: string | null;
  emergency2_phone: string | null;

  gender: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  special_notes: string | null;

  primary_language: string | null;
  secondary_language: string | null;
  medical_aid_provider: string | null;
  medical_aid_policy_number: string | null;

  gp_name: string | null;
  gp_practice: string | null;
  gp_phone: string | null;

  religion: string | null;
  additional_notes: string | null;

  height_cm: number | null;
  weight_kg: number | null;
  eye_color: string | null;
  hair_color: string | null;
  identifying_marks: string | null;
  skin_tone: string | null;

  public_id: string;
  created_at: string;
  updated_at: string;
};

const SELECT_FIELDS = `
  id,
  user_id,
  first_name,
  last_name,
  emergency1_fullname,
  emergency1_relationship,
  emergency1_phone,
  emergency2_fullname,
  emergency2_relationship,
  emergency2_phone,
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
  height_cm,
  weight_kg,
  eye_color,
  hair_color,
  identifying_marks,
  skin_tone,
  public_id,
  created_at,
  updated_at
`;

async function getAuth() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { supabase, user: null };
  return { supabase, user: data.user };
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

  return NextResponse.json({ profile: (data as ProfileRow) ?? null }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { supabase, user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const update = {
    first_name: body.first_name ?? null,
    last_name: body.last_name ?? null,

    emergency1_fullname: body.emergency1_fullname ?? null,
    emergency1_relationship: body.emergency1_relationship ?? null,
    emergency1_phone: body.emergency1_phone ?? null,

    emergency2_fullname: body.emergency2_fullname ?? null,
    emergency2_relationship: body.emergency2_relationship ?? null,
    emergency2_phone: body.emergency2_phone ?? null,

    gender: body.gender ?? null,
    date_of_birth: body.date_of_birth ?? null,
    blood_type: body.blood_type ?? null,
    allergies: body.allergies ?? null,
    conditions: body.conditions ?? null,
    medications: body.medications ?? null,
    special_notes: body.special_notes ?? null,

    primary_language: body.primary_language ?? null,
    secondary_language: body.secondary_language ?? null,
    medical_aid_provider: body.medical_aid_provider ?? null,
    medical_aid_policy_number: body.medical_aid_policy_number ?? null,

    gp_name: body.gp_name ?? null,
    gp_practice: body.gp_practice ?? null,
    gp_phone: body.gp_phone ?? null,

    religion: body.religion ?? null,
    additional_notes: body.additional_notes ?? null,

    height_cm: body.height_cm ?? null,
    weight_kg: body.weight_kg ?? null,
    eye_color: body.eye_color ?? null,
    hair_color: body.hair_color ?? null,
    identifying_marks: body.identifying_marks ?? null,
    skin_tone: body.skin_tone ?? null,
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