import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type FullProfileRow = {
  public_id: string;

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
};

export async function GET(req: NextRequest) {
  try {
    // 🔒 Block direct public access (only allow internal server calls)
    const internalSecret = req.headers.get("x-internal-secret");
    if (!process.env.INTERNAL_API_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured (missing INTERNAL_API_SECRET)" },
        { status: 500 }
      );
    }
    if (internalSecret !== process.env.INTERNAL_API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const publicId = url.searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    const admin = createSupabaseAdmin();

    const { data, error } = await admin
      .from("profiles")
      .select(
        [
          "public_id",
          "first_name",
          "last_name",
          "emergency1_fullname",
          "emergency1_relationship",
          "emergency1_phone",
          "emergency2_fullname",
          "emergency2_relationship",
          "emergency2_phone",
          "gender",
          "date_of_birth",
          "blood_type",
          "allergies",
          "conditions",
          "medications",
          "special_notes",
          "primary_language",
          "secondary_language",
          "medical_aid_provider",
          "medical_aid_policy_number",
          "gp_name",
          "gp_practice",
          "gp_phone",
          "religion",
          "additional_notes",
          "height_cm",
          "weight_kg",
          "eye_color",
          "hair_color",
          "identifying_marks",
          "skin_tone",
        ].join(",")
      )
      .eq("public_id", publicId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const row = data as unknown as FullProfileRow;
    return NextResponse.json({ profile: row }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
