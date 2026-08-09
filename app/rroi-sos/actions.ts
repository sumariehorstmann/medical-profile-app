"use server";

import { revalidatePath } from "next/cache";
import {
  createSupabaseServer,
  supabaseAdmin,
} from "@/lib/supabase/server";

export type SOSContactInput = {
  firstName: string;
  surname: string;
  relationship: string;
  phone: string;
};
export type SOSAlertInput = {
  contactNumber: 1 | 2;
  latitude: number;
  longitude: number;
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
function formatSouthAfricanNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (/^0\d{9}$/.test(digits)) {
    return `27${digits.slice(1)}`;
  }

  if (/^27\d{9}$/.test(digits)) {
    return digits;
  }

  throw new Error("Please enter a valid South African mobile number.");
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
        contact_number,
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
function makeSmsSafe(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

export async function sendSOSAlert(input: SOSAlertInput) {
  const { contactNumber, latitude, longitude } = input;

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("A valid current location is required.");
  }

  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to send an SOS alert.");
  }

  const { data: settings, error: settingsError } = await supabase
    .from("sos_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (settingsError) {
    throw new Error(settingsError.message);
  }

  if (!settings) {
    throw new Error("Please configure an SOS contact first.");
  }

  const firstName =
    contactNumber === 1
      ? settings.contact_1_name
      : settings.contact_2_name;

  const surname =
    contactNumber === 1
      ? settings.contact_1_surname
      : settings.contact_2_surname;

  const relationship =
    contactNumber === 1
      ? settings.contact_1_relationship
      : settings.contact_2_relationship;

  const phone =
    contactNumber === 1
      ? settings.contact_1_phone
      : settings.contact_2_phone;

  if (!firstName || !surname || !phone) {
    throw new Error(`SOS Contact ${contactNumber} is not configured.`);
  }

  const alertsUsed = Number(settings.alerts_used ?? 0);
  const alertsLimit = Number(settings.alerts_limit ?? 60);

  if (alertsUsed >= alertsLimit) {
    throw new Error("You have no RROI SOS alerts remaining.");
  }

  const recipientName = `${firstName} ${surname}`.trim();
  const formattedPhone = formatSouthAfricanNumber(phone);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name, public_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile?.public_id) {
    throw new Error("Your RROI emergency profile could not be found.");
  }

  const userName = makeSmsSafe(
  [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || "RROI user"
);

  const shortLatitude = latitude.toFixed(5);
const shortLongitude = longitude.toFixed(5);

const locationUrl =
  `https://maps.google.com/?q=${shortLatitude},${shortLongitude}`;

const profileUrl =
  `https://rroi.co.za/e/${profile.public_id}`;

const now = new Date();

const date = now.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const time = now.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const message =
  `RROI SOS ALERT\n\n` +
  `${userName}\n\n` +
  `Location:\n${locationUrl}\n\n` +
  `Profile:\n${profileUrl}`;

  const { data: alert, error: alertError } = await supabaseAdmin
    .from("sos_alerts")
    .insert({
      user_id: user.id,
      contact_number: contactNumber,
      recipient_name: recipientName,
      recipient_relationship: relationship ?? null,
      recipient_phone: formattedPhone,
      latitude,
      longitude,
      location_obtained: true,
      sms_status: "Queued",
      counted: false,
    })
    .select("id")
    .single();

  if (alertError || !alert) {
    throw new Error(
      alertError?.message ?? "The SOS alert could not be created."
    );
  }

  const apiKey = process.env.CLICKATELL_API_KEY;

if (!apiKey) {
  await supabaseAdmin
    .from("sos_alerts")
    .update({ sms_status: "Failed" })
    .eq("id", alert.id);

  throw new Error("The SMS service is not configured.");
}

const params = new URLSearchParams({
  apiKey,
  to: formattedPhone,
  content: message,
});

let response: Response;

try {
  response = await fetch(
    `https://platform.clickatell.com/messages/http/send?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
} catch {
  await supabaseAdmin
    .from("sos_alerts")
    .update({ sms_status: "Failed" })
    .eq("id", alert.id);

  throw new Error(
    "The SOS message could not reach the SMS provider. Please try again."
  );
}

const responseText = await response.text();

let providerMessageId: string | null = null;
let accepted = response.ok;

try {
  const parsed = JSON.parse(responseText);

  providerMessageId =
    parsed?.messages?.[0]?.apiMessageId ??
    parsed?.apiMessageId ??
    parsed?.messageId ??
    null;

  if (parsed?.messages?.[0]?.accepted === false) {
    accepted = false;
  }
} catch {
  const idMatch = responseText.match(/ID:\s*([^\s]+)/i);
  providerMessageId = idMatch?.[1] ?? null;

  if (/ERR:/i.test(responseText)) {
    accepted = false;
  }
}

if (!accepted || !providerMessageId) {
  await supabaseAdmin
    .from("sos_alerts")
    .update({ sms_status: "Failed" })
    .eq("id", alert.id);

  console.error("Clickatell rejected SOS message:", responseText);

  throw new Error(
    "The SMS provider did not accept the SOS message. Please try again."
  );
}

const { error: alertUpdateError } = await supabaseAdmin
  .from("sos_alerts")
  .update({
  provider_message_id: providerMessageId,
  sms_status: "Sent",
  counted: true,
})
  .eq("id", alert.id);

if (alertUpdateError) {
  console.error("Could not update SOS alert:", alertUpdateError);
}

const { error: counterError } = await supabaseAdmin
  .from("sos_settings")
  .update({
    alerts_used: alertsUsed + 1,
    updated_at: new Date().toISOString(),
  })
  .eq("user_id", user.id);

if (counterError) {
  console.error("Could not update SOS counter:", counterError);
}

revalidatePath("/rroi-sos");

return {
  success: true,
  alertId: alert.id,
};
}