import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

function calcAge(dob: string | null | undefined) {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  // 1) Look up QR code + linked profile
  const { data, error } = await supabaseAdmin
    .from("qr_codes")
    .select(
      `
      public_token,
      status,
      profile_id,
      profiles (
        id,
        user_id,
        first_name,
        last_name,
        date_of_birth,
        allergies,
        conditions,
        medications,
        gender,
        blood_type,
        physical_description,
        special_notes,
        medical_aid_provider,
        medical_aid_policy_number,
        primary_language,
        religion,
        additional_notes
      )
    `
    )
    .eq("public_token", token)
    .eq("status", "active")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Make TS shut up – we know the shape from our query
  const profile = (data as any).profiles as any;
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // 2) Emergency contacts
  const { data: contactsData } = await supabaseAdmin
    .from("emergency_contacts")
    .select("priority, name, phone")
    .eq("profile_id", profile.id)
    .order("priority", { ascending: true });

  const contacts = (contactsData ?? []) as any[];
  const contact1 = contacts.find((c) => c.priority === 1) ?? null;
  const contact2 = contacts.find((c) => c.priority === 2) ?? null;

  // 3) Subscription status (by auth user_id)
  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", profile.user_id)
    .single();

  const isPaid =
    sub?.status === "active" &&
    !!sub?.current_period_end &&
    new Date(sub.current_period_end as string) > new Date();

  // 4) Public response

  const response: any = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    age: calcAge(profile.date_of_birth),
    emergency_contact: contact1
      ? { name: contact1.name, phone: contact1.phone }
      : null,
    is_paid: isPaid,
  };

  if (isPaid) {
    response.medical = {
      allergies: profile.allergies,
      conditions: profile.conditions,
      medications: profile.medications,
      blood_type: profile.blood_type,
      gender: profile.gender,
      physical_description: profile.physical_description,
      special_notes: profile.special_notes,
      medical_aid_provider: profile.medical_aid_provider,
      medical_aid_policy_number: profile.medical_aid_policy_number,
      primary_language: profile.primary_language,
      religion: profile.religion,
      additional_notes: profile.additional_notes,
      emergency_contact_2: contact2
        ? { name: contact2.name, phone: contact2.phone }
        : null,
    };
  }

  return NextResponse.json(response, {
    headers: { "Cache-Control": "no-store" },
  });
}
