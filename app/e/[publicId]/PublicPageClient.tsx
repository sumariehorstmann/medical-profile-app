"use client";

import React from "react";

type Profile = {
  full_name: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
};

type Props = {
  profile: Profile;
};

export default function PublicPageClient({ profile }: Props) {
  const nextOfKin =
    [profile.emergency_contact_name, profile.emergency_contact_phone]
      .filter(Boolean)
      .join(" • ") || "—";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 6 }}>Emergency Medical</h1>
      <p style={{ marginTop: 0, color: "#666" }}>Read-only emergency profile.</p>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <Row label="Name" value={profile.full_name || "—"} />
        <Row label="Date of birth" value={profile.date_of_birth || "—"} />
        <Row label="Blood type" value={profile.blood_type || "—"} />
        <Row label="Allergies" value={profile.allergies || "—"} />
        <Row label="Conditions" value={profile.conditions || "—"} />
        <Row label="Medications" value={profile.medications || "—"} />
        <Row label="Next of kin" value={nextOfKin} />
        <Row label="Notes" value={profile.notes || "—"} />

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Print
          </button>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #f3f3f3" }}>
      <div style={{ width: 170, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 600, whiteSpace: "pre-wrap" }}>{value}</div>
    </div>
  );
}
