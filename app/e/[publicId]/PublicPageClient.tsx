"use client";

import React from "react";

type Profile = {
  first_name: string | null;
  last_name: string | null;

  id_number: string | null;
  blood_type: string | null;

  allergies: string | null;
  medical_history: string | null;

  medical_aid_number: string | null;
  medical_aid_company: string | null;

  nok_name: string | null;
  nok_phone: string | null;
};

type Props = {
  profile: Profile;
};

export default function PublicPageClient({ profile }: Props) {
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "—";

  const medicalAid =
    [profile.medical_aid_company, profile.medical_aid_number].filter(Boolean).join(" • ") || "—";

  const nextOfKin = [profile.nok_name, profile.nok_phone].filter(Boolean).join(" • ") || "—";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 6 }}>Emergency Medical</h1>
      <p style={{ marginTop: 0, color: "#666" }}>Read-only emergency profile.</p>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <Row label="Name" value={fullName} />
        <Row label="ID number" value={profile.id_number || "—"} />
        <Row label="Blood type" value={profile.blood_type || "—"} />
        <Row label="Allergies" value={profile.allergies || "—"} />
        <Row label="Medical history" value={profile.medical_history || "—"} />
        <Row label="Medical aid" value={medicalAid} />
        <Row label="Next of kin" value={nextOfKin} />

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
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
