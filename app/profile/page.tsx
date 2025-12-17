"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  user_id: string;
  public_id: string | null;

  full_name: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
  updated_at?: string | null;
};

function toDateInputValue(v: string | null) {
  return v ? v.slice(0, 10) : "";
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // form fields
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [notes, setNotes] = useState("");

  const baseUrl =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      : "";

  const emergencyLink =
    profile?.public_id ? `${baseUrl}/e/${profile.public_id}` : null;

  // 🔐 AUTH + PROFILE LOAD (VERCEL SAFE)
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      const session = sessionData?.session;

      if (sessionError || !session) {
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      if (!mounted) return;

      setUserId(uid);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (!mounted) return;

      if (error) {
        setMessage(`❌ Could not load profile: ${error.message}`);
        setLoading(false);
        return;
      }

      setProfile(data);

      setFullName(data.full_name ?? "");
      setDateOfBirth(toDateInputValue(data.date_of_birth));
      setBloodType(data.blood_type ?? "");
      setAllergies(data.allergies ?? "");
      setConditions(data.conditions ?? "");
      setMedications(data.medications ?? "");
      setEmergencyContactName(data.emergency_contact_name ?? "");
      setEmergencyContactPhone(data.emergency_contact_phone ?? "");
      setNotes(data.notes ?? "");

      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.assign("/login");
  }

  async function saveProfile() {
    if (!profile) return;

    setSaving(true);
    setMessage(null);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName || null,
        date_of_birth: dateOfBirth || null,
        blood_type: bloodType || null,
        allergies: allergies || null,
        conditions: conditions || null,
        medications: medications || null,
        emergency_contact_name: emergencyContactName || null,
        emergency_contact_phone: emergencyContactPhone || null,
        notes: notes || null,
      })
      .eq("id", profile.id)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setMessage(`❌ Save failed: ${error.message}`);
      return;
    }

    setProfile(data);
    setMessage("✅ Saved");
  }

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <p>Loading…</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={{ padding: 24 }}>
        <p>{message ?? "Profile not found."}</p>
        <button onClick={handleLogout}>Logout</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>My Medical Profile</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {message && <p>{message}</p>}

      {emergencyLink && (
        <div style={{ marginBottom: 20 }}>
          <QRCodeSVG value={emergencyLink} size={150} />
          <p style={{ wordBreak: "break-all" }}>{emergencyLink}</p>
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <input value={bloodType} onChange={(e) => setBloodType(e.target.value)} placeholder="Blood type" />
        <textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Allergies" />
        <textarea value={conditions} onChange={(e) => setConditions(e.target.value)} placeholder="Conditions" />
        <textarea value={medications} onChange={(e) => setMedications(e.target.value)} placeholder="Medications" />
        <input value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} placeholder="Emergency contact name" />
        <input value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} placeholder="Emergency contact phone" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      </div>

      <button onClick={saveProfile} disabled={saving} style={{ marginTop: 16 }}>
        {saving ? "Saving…" : "Save"}
      </button>
    </main>
  );
}
