"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase/server";

export type SOSContactInput = {
  firstName: string;
  surname: string;
  relationship: string;
  phone: string;
};

function validateContact(contact: SOSContactInput) {
  if (
    !contact.firstName.trim() ||
    !contact.surname.trim() ||
    !contact.relationship.trim()
  ) {
    throw new Error("Please complete all contact fields.");
  }

  if (!/^\d{10}$/.test(contact.phone)) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }
}

export async function saveSOSContact(
  contactNumber: 1 | 2,
  contact: SOSContactInput
) {
  validateContact(contact);

  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to save an SOS contact.");
  }

  const contactData =
    contactNumber === 1
      ? {
          contact_1_name: contact.firstName.trim(),
          contact_1_surname: contact.surname.trim(),
          contact_1_relationship: contact.relationship.trim(),
          contact_1_phone: contact.phone,
        }
      : {
          contact_2_name: contact.firstName.trim(),
          contact_2_surname: contact.surname.trim(),
          contact_2_relationship: contact.relationship.trim(),
          contact_2_phone: contact.phone,
        };

  const { error } = await supabase.from("sos_settings").upsert(
    {
      user_id: user.id,
      ...contactData,
      setup_completed: true,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/rroi-sos");
}
export async function clearSOSContact(contactNumber: 1 | 2) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to clear an SOS contact.");
  }

  const contactData =
    contactNumber === 1
      ? {
          contact_1_name: null,
          contact_1_surname: null,
          contact_1_relationship: null,
          contact_1_phone: null,
        }
      : {
          contact_2_name: null,
          contact_2_surname: null,
          contact_2_relationship: null,
          contact_2_phone: null,
        };

  const { error } = await supabase
    .from("sos_settings")
    .update({
      ...contactData,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/rroi-sos");
}
export async function getSOSSettings() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("sos_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getSOSHistory() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("sos_alerts")
    .select(
      `
        id,
        recipient_name,
        sms_status,
        latitude,
        longitude,
        created_at
      `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}