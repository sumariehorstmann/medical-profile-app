"use client";

import React from "react";

type Profile = {
  profile_photo_url?: string | null;

  first_name?: string | null;
  last_name?: string | null;

  emergency1_fullname?: string | null;
  emergency1_first_name?: string | null;
  emergency1_last_name?: string | null;
  emergency1_relationship?: string | null;
  emergency1_phone?: string | null;

  blood_type?: string | null;
  allergies?: string | null;
  medications?: string | null;
  conditions?: string | null;
  implanted_devices?: string | null;
  mobility_notes?: string | null;

  pregnancy_status?: string | null;
  organ_donor_status?: string | null;
  preferred_hospital?: string | null;
  medical_aid_provider?: string | null;
  medical_aid_plan?: string | null;
  medical_aid_policy_number?: string | null;
  gp_name?: string | null;
  gp_phone?: string | null;
  specialist_name?: string | null;
  specialist_phone?: string | null;
  special_notes?: string | null;

  date_of_birth?: string | null;
  gender?: string | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  eye_color?: string | null;
  hair_color?: string | null;
  skin_tone?: string | null;

  primary_language?: string | null;
  secondary_language?: string | null;
  nationality?: string | null;
  province?: string | null;
  city?: string | null;
  religion?: string | null;

  emergency2_fullname?: string | null;
  emergency2_first_name?: string | null;
  emergency2_last_name?: string | null;
  emergency2_relationship?: string | null;
  emergency2_phone?: string | null;
  additional_notes?: string | null;

  is_premium?: boolean | null;

  // legacy fallback fields
  full_name?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  notes?: string | null;
};

type Props = {
  profile: Profile;
};

function joinName(first?: string | null, last?: string | null, full?: string | null) {
  const joined = [first?.trim(), last?.trim()].filter(Boolean).join(" ").trim();
  return joined || full?.trim() || "—";
}

function calcAge(dob?: string | null) {
  if (!dob) return "—";

  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return "—";

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }

  return age >= 0 && age <= 130 ? String(age) : "—";
}

function valueOrDash(value?: string | number | null) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" && !value.trim()) return "—";
  return String(value);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={sectionCardStyle}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

export default function PublicPageClient({ profile }: Props) {
  const isPremium = profile.is_premium === true;

  const firstName =
    profile.first_name?.trim() ||
    profile.full_name?.split(" ").slice(0, -1).join(" ").trim() ||
    profile.full_name?.trim() ||
    "—";

  const lastName =
    profile.last_name?.trim() ||
    (profile.full_name?.trim().includes(" ")
      ? profile.full_name.trim().split(" ").slice(-1)[0]
      : "") ||
    "—";

  const emergency1Name = joinName(
    profile.emergency1_first_name,
    profile.emergency1_last_name,
    profile.emergency1_fullname || profile.emergency_contact_name
  );

  const emergency2Name = joinName(
    profile.emergency2_first_name,
    profile.emergency2_last_name,
    profile.emergency2_fullname
  );

  return (
    <main style={pageStyle}>
      <div style={headerCardStyle}>
        <h1 style={pageTitleStyle}>Emergency Profile</h1>
        <p style={pageSubtitleStyle}>
          {isPremium
            ? "Full emergency profile."
            : "Free-tier emergency profile."}
        </p>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => window.print()} style={buttonStyle}>
            Print
          </button>
        </div>
      </div>

      <Section title="Section 1 — Identity & Immediate Emergency Contact">
        <div style={photoBlockStyle}>
  {profile.profile_photo_url ? (
    <img
      src={profile.profile_photo_url}
      alt="Profile"
      style={photoStyle}
    />
  ) : (
    <div style={photoPlaceholderStyle}>No photo</div>
  )}
</div>

{profile.emergency1_phone ? (
  <a href={`tel:${profile.emergency1_phone}`} style={callButtonStyle}>
    📞 Call Emergency Contact
  </a>
) : null}

        
        <Row label="First Name" value={valueOrDash(firstName)} />
        <Row label="Last Name" value={valueOrDash(lastName)} />
        <Row label="Emergency Contact 1 Name & Surname" value={emergency1Name} />
        <Row
          label="Emergency Contact 1 Relationship"
          value={valueOrDash(profile.emergency1_relationship)}
        />
        <Row
          label="Emergency Contact 1 Number"
          value={valueOrDash(profile.emergency1_phone || profile.emergency_contact_phone)}
        />
      </Section>

      {isPremium ? (
        <>
          <Section title="Section 2 — Critical Medical Information">
            <Row label="Blood Type" value={valueOrDash(profile.blood_type)} />
            <Row label="Allergies" value={valueOrDash(profile.allergies)} />
            <Row label="Current Medication" value={valueOrDash(profile.medications)} />
            <Row label="Medical Conditions" value={valueOrDash(profile.conditions)} />
            <Row label="Implanted Devices" value={valueOrDash(profile.implanted_devices)} />
            <Row
              label="Mobility / Disability Notes"
              value={valueOrDash(profile.mobility_notes)}
            />
          </Section>

          <Section title="Section 3 — Medical Support Information">
            <Row label="Pregnancy Status" value={valueOrDash(profile.pregnancy_status)} />
            <Row label="Organ Donor Status" value={valueOrDash(profile.organ_donor_status)} />
            <Row label="Preferred Hospital" value={valueOrDash(profile.preferred_hospital)} />
            <Row label="Medical Aid Provider" value={valueOrDash(profile.medical_aid_provider)} />
            <Row label="Medical Aid Plan" value={valueOrDash(profile.medical_aid_plan)} />
            <Row
              label="Medical Aid Number"
              value={valueOrDash(profile.medical_aid_policy_number)}
            />
            <Row label="GP Name" value={valueOrDash(profile.gp_name)} />
            <Row label="GP Number" value={valueOrDash(profile.gp_phone)} />
            <Row label="Specialist Name" value={valueOrDash(profile.specialist_name)} />
            <Row label="Specialist Number" value={valueOrDash(profile.specialist_phone)} />
            <Row
              label="Additional Medical Notes"
              value={valueOrDash(profile.special_notes || profile.notes)}
            />
          </Section>

          <Section title="Section 4 — Personal Identification">
            <Row label="Date of Birth" value={valueOrDash(profile.date_of_birth)} />
            <Row label="Age" value={calcAge(profile.date_of_birth)} />
            <Row label="Gender" value={valueOrDash(profile.gender)} />
            <Row
              label="Height"
              value={
                profile.height_cm == null ? "—" : `${profile.height_cm} cm`
              }
            />
            <Row
              label="Weight"
              value={
                profile.weight_kg == null ? "—" : `${profile.weight_kg} kg`
              }
            />
            <Row label="Eye Colour" value={valueOrDash(profile.eye_color)} />
            <Row label="Hair Colour" value={valueOrDash(profile.hair_color)} />
            <Row label="Skin Tone" value={valueOrDash(profile.skin_tone)} />
          </Section>

          <Section title="Section 5 — Communication & Location">
            <Row label="Primary Language" value={valueOrDash(profile.primary_language)} />
            <Row label="2nd Language" value={valueOrDash(profile.secondary_language)} />
            <Row label="Nationality" value={valueOrDash(profile.nationality)} />
            <Row label="Province" value={valueOrDash(profile.province)} />
            <Row label="City" value={valueOrDash(profile.city)} />
            <Row label="Religion" value={valueOrDash(profile.religion)} />
          </Section>

          <Section title="Section 6 — Additional Information">
            <Row label="Emergency Contact 2 Name & Surname" value={emergency2Name} />
            <Row
              label="Emergency Contact 2 Relationship"
              value={valueOrDash(profile.emergency2_relationship)}
            />
            <Row
              label="Emergency Contact 2 Number"
              value={valueOrDash(profile.emergency2_phone)}
            />
            <Row label="Additional Notes" value={valueOrDash(profile.additional_notes)} />
          </Section>
        </>
      ) : null}
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 860,
  margin: "0 auto",
  padding: 20,
  fontFamily: "system-ui, sans-serif",
  background: "#F8FAFC",
  minHeight: "100vh",
};

const headerCardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: 18,
  padding: 20,
  marginBottom: 18,
};

const pageTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 32,
  fontWeight: 900,
  color: "#0F172A",
};

const pageSubtitleStyle: React.CSSProperties = {
  marginTop: 6,
  marginBottom: 0,
  color: "#475569",
  fontSize: 14,
};

const sectionCardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: 18,
  padding: 20,
  marginBottom: 18,
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 14,
  fontSize: 22,
  fontWeight: 900,
  color: "#0F172A",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  gap: 14,
  padding: "12px 0",
  borderBottom: "1px solid #F1F5F9",
};

const labelStyle: React.CSSProperties = {
  color: "#475569",
  fontWeight: 700,
};

const valueStyle: React.CSSProperties = {
  color: "#0F172A",
  fontWeight: 700,
  whiteSpace: "pre-wrap",
  wordBreak: "normal",
overflowWrap: "break-word",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  cursor: "pointer",
  fontWeight: 700,
  color: "#0F172A",
};

const photoBlockStyle: React.CSSProperties = {
  marginBottom: 14,
  display: "flex",
  justifyContent: "flex-start",
};

const photoStyle: React.CSSProperties = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  objectFit: "cover",
  border: "1px solid #E5E7EB",
};

const photoPlaceholderStyle: React.CSSProperties = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  border: "1px solid #E5E7EB",
  background: "#F8FAFC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  fontWeight: 700,
  color: "#64748B",
};
const callButtonStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  background: "#DC2626",
  color: "#FFFFFF",
  padding: 14,
  borderRadius: 12,
  fontWeight: 900,
  textDecoration: "none",
  marginBottom: 12,
};