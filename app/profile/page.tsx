"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type ProfileRow = {
  user_id: string;
  public_id: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null; // comes back as YYYY-MM-DD
  blood_type: string | null;
  allergies: string | null;
  medical_history: string | null;
  medications: string | null;
  chronic_medications: string | null;
  nok_name: string | null;
  nok_phone: string | null;
  notes: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileRow | null>(null);

  // Build QR link:
  // - Prefer NEXT_PUBLIC_BASE_URL if you set it (good for LAN/dev)
  // - Otherwise fallback to current origin in browser
  const qrUrl = useMemo(() => {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_BASE_URL.trim()
        : typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    if (!profile?.public_id) return "";
    return `${base}/e/${profile.public_id}`;
  }, [profile?.public_id]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setMessage(null);

      // 1) Must be logged in
      const { data: sessData, error: sessErr } = await supabase.auth.getSession();
      const session = sessData.session;

      if (sessErr || !session?.user) {
        router.replace("/login");
        return;
      }

      const userId = session.user.id;

      // 2) Fetch profile (by user_id)
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "user_id, public_id, first_name, last_name, date_of_birth, blood_type, allergies, medical_history, medications, chronic_medications, nok_name, nok_phone, notes"
        )
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      // 3) If no profile row yet, create one (public_id is generated in DB)
      if (!data) {
        const { data: created, error: createErr } = await supabase
          .from("profiles")
          .insert({ user_id: userId })
          .select(
            "user_id, public_id, first_name, last_name, date_of_birth, blood_type, allergies, medical_history, medications, chronic_medications, nok_name, nok_phone, notes"
          )
          .single();

        if (createErr) {
          setMessage(createErr.message);
          setLoading(false);
          return;
        }

        setProfile(created as ProfileRow);
        setLoading(false);
        return;
      }

      setProfile(data as ProfileRow);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function save() {
    if (!profile) return;
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          date_of_birth: profile.date_of_birth,
          blood_type: profile.blood_type,
          allergies: profile.allergies,
          medical_history: profile.medical_history,
          medications: profile.medications,
          chronic_medications: profile.chronic_medications,
          nok_name: profile.nok_name,
          nok_phone: profile.nok_phone,
          notes: profile.notes,
        })
        .eq("user_id", profile.user_id);

      if (error) throw error;

      setMessage("✅ Saved.");
    } catch (err: any) {
      setMessage(err?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
        <h1 style={{ fontSize: 40, marginBottom: 8 }}>My Medical Profile</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
        <h1 style={{ fontSize: 40, marginBottom: 8 }}>My Medical Profile</h1>
        <p style={{ color: "crimson" }}>No profile loaded.</p>
        {message && <p>{message}</p>}
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 44, fontWeight: 900, margin: 0 }}>My Medical Profile</h1>
          <p style={{ marginTop: 6, color: "#666" }}>
            This is your private edit page. Your public QR page is the /e/ link.
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 12px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            height: 40,
          }}
        >
          Logout
        </button>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* LEFT: QR */}
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "grid", justifyItems: "center", gap: 10 }}>
            <QRCodeSVG value={qrUrl || " "} size={220} />
            <div style={{ fontSize: 12, wordBreak: "break-all", textAlign: "center" }}>
              {qrUrl}
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field
              label="First name"
              value={profile.first_name ?? ""}
              onChange={(v) => setProfile({ ...profile, first_name: v })}
            />
            <Field
              label="Last name"
              value={profile.last_name ?? ""}
              onChange={(v) => setProfile({ ...profile, last_name: v })}
            />
            <Field
              label="Date of birth"
              type="date"
              value={profile.date_of_birth ?? ""}
              onChange={(v) => setProfile({ ...profile, date_of_birth: v })}
            />

            <Field
              label="Blood type"
              value={profile.blood_type ?? ""}
              onChange={(v) => setProfile({ ...profile, blood_type: v })}
            />
            <Field
              label="Emergency contact name"
              value={profile.nok_name ?? ""}
              onChange={(v) => setProfile({ ...profile, nok_name: v })}
            />
            <Field
              label="Emergency contact phone"
              value={profile.nok_phone ?? ""}
              onChange={(v) => setProfile({ ...profile, nok_phone: v })}
            />

            <TextArea
              label="Allergies"
              value={profile.allergies ?? ""}
              onChange={(v) => setProfile({ ...profile, allergies: v })}
            />
            <TextArea
              label="Medical history"
              value={profile.medical_history ?? ""}
              onChange={(v) => setProfile({ ...profile, medical_history: v })}
            />
            <TextArea
              label="Medications / Supplements"
              value={profile.medications ?? ""}
              onChange={(v) => setProfile({ ...profile, medications: v })}
            />

            <TextArea
              label="Chronic medications"
              value={profile.chronic_medications ?? ""}
              onChange={(v) => setProfile({ ...profile, chronic_medications: v })}
            />
            <TextArea
              label="Notes"
              value={profile.notes ?? ""}
              onChange={(v) => setProfile({ ...profile, notes: v })}
            />
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14 }}>
            <button
              onClick={save}
              disabled={saving}
              style={{
                padding: "10px 14px",
                background: "black",
                color: "white",
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                fontWeight: 800,
                borderRadius: 8,
                minWidth: 120,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>

            {message && <div style={{ color: "#333" }}>{message}</div>}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, color: "#555" }}>{props.label}</span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 8,
          width: "100%",
        }}
      />
    </label>
  );
}

function TextArea(props: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "grid", gap: 6, gridColumn: "span 1" }}>
      <span style={{ fontSize: 12, color: "#555" }}>{props.label}</span>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        rows={4}
        style={{
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 8,
          width: "100%",
          resize: "vertical",
        }}
      />
    </label>
  );
}
