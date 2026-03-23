"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

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
};

function calcAge(dob: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 0 && age <= 130 ? age : null;
}

function normalizePhone(raw: string) {
  return raw.replace(/\s+/g, "").trim();
}

function downloadQrAsPng(svgId: string, filename = "rroi-qr.png") {
  const svg = document.getElementById(svgId) as SVGSVGElement | null;
  if (!svg) return;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  img.src = url;
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={cardStyle}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 20, fontWeight: 900 }}>{title}</div>
        {subtitle ? (
          <div style={{ marginTop: 4, color: "#444", fontSize: 13 }}>{subtitle}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>
        {label} {required ? <span style={{ color: "#b00020" }}>*</span> : null}
      </div>
      {children}
      {hint ? <div style={{ marginTop: 6, fontSize: 12, color: "#555" }}>{hint}</div> : null}
    </div>
  );
}

export default function ProfileFormClient({
  initial,
  showUpgrade = true,
}: {
  initial: ProfileRow | null;
  showUpgrade?: boolean;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const publicId = initial?.public_id ?? "";
  const publicPath = publicId ? `/e/${publicId}` : "";
  const publicUrl =
    typeof window !== "undefined" && publicPath
      ? `${window.location.origin}${publicPath}`
      : publicPath;

  const [firstName, setFirstName] = useState(initial?.first_name ?? "");
  const [lastName, setLastName] = useState(initial?.last_name ?? "");
  const [em1Name, setEm1Name] = useState(initial?.emergency1_fullname ?? "");
  const [em1Rel, setEm1Rel] = useState(initial?.emergency1_relationship ?? "");
  const [em1Phone, setEm1Phone] = useState(initial?.emergency1_phone ?? "");

  const [em2Name, setEm2Name] = useState(initial?.emergency2_fullname ?? "");
  const [em2Rel, setEm2Rel] = useState(initial?.emergency2_relationship ?? "");
  const [em2Phone, setEm2Phone] = useState(initial?.emergency2_phone ?? "");

  const [gender, setGender] = useState(initial?.gender ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(initial?.date_of_birth ?? "");
  const [bloodType, setBloodType] = useState(initial?.blood_type ?? "");
  const [allergies, setAllergies] = useState(initial?.allergies ?? "");
  const [conditions, setConditions] = useState(initial?.conditions ?? "");
  const [medications, setMedications] = useState(initial?.medications ?? "");
  const [specialNotes, setSpecialNotes] = useState(initial?.special_notes ?? "");

  const [primaryLanguage, setPrimaryLanguage] = useState(initial?.primary_language ?? "");
  const [secondaryLanguage, setSecondaryLanguage] = useState(initial?.secondary_language ?? "");
  const [medicalAidProvider, setMedicalAidProvider] = useState(initial?.medical_aid_provider ?? "");
  const [medicalAidPolicy, setMedicalAidPolicy] = useState(
    initial?.medical_aid_policy_number ?? ""
  );

  const [gpName, setGpName] = useState(initial?.gp_name ?? "");
  const [gpPractice, setGpPractice] = useState(initial?.gp_practice ?? "");
  const [gpPhone, setGpPhone] = useState(initial?.gp_phone ?? "");

  const [religion, setReligion] = useState(initial?.religion ?? "");

  const [heightCm, setHeightCm] = useState<string>(
    initial?.height_cm == null ? "" : String(initial.height_cm)
  );
  const [weightKg, setWeightKg] = useState<string>(
    initial?.weight_kg == null ? "" : String(initial.weight_kg)
  );
  const [eyeColor, setEyeColor] = useState(initial?.eye_color ?? "");
  const [hairColor, setHairColor] = useState(initial?.hair_color ?? "");
  const [identifyingMarks, setIdentifyingMarks] = useState(initial?.identifying_marks ?? "");
  const [skinTone, setSkinTone] = useState(initial?.skin_tone ?? "");

  const [additionalNotes, setAdditionalNotes] = useState(initial?.additional_notes ?? "");

  const [consent, setConsent] = useState(false);

  const age = useMemo(() => calcAge(dateOfBirth || null), [dateOfBirth]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function validateRequired(): string | null {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!em1Name.trim()) return "Emergency Contact 1 name + surname is required.";
    if (!em1Rel.trim()) return "Emergency Contact 1 relationship is required.";
    if (!normalizePhone(em1Phone)) return "Emergency Contact 1 phone is required.";
    return null;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const err = validateRequired();
    if (err) {
      setMessage(`❌ ${err}`);
      return;
    }

    if (!consent) {
      setMessage("❌ You must accept the privacy policy.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),

        emergency1_fullname: em1Name.trim(),
        emergency1_relationship: em1Rel.trim(),
        emergency1_phone: normalizePhone(em1Phone),

        emergency2_fullname: em2Name.trim() || null,
        emergency2_relationship: em2Rel.trim() || null,
        emergency2_phone: normalizePhone(em2Phone) || null,

        gender: gender || null,
        date_of_birth: dateOfBirth || null,
        blood_type: bloodType || null,
        allergies: allergies || null,
        conditions: conditions || null,
        medications: medications || null,
        special_notes: specialNotes || null,

        primary_language: primaryLanguage || null,
        secondary_language: secondaryLanguage || null,
        medical_aid_provider: medicalAidProvider || null,
        medical_aid_policy_number: medicalAidPolicy || null,

        gp_name: gpName || null,
        gp_practice: gpPractice || null,
        gp_phone: normalizePhone(gpPhone) || null,

        religion: religion || null,

        height_cm: heightCm ? Number(heightCm) : null,
        weight_kg: weightKg ? Number(weightKg) : null,
        eye_color: eyeColor || null,
        hair_color: hairColor || null,
        identifying_marks: identifyingMarks || null,
        skin_tone: skinTone || null,

        additional_notes: additionalNotes || null,
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to save profile");

      setMessage("✅ Saved.");
      router.refresh();
    } catch (e: any) {
      setMessage(`❌ ${e?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setMessage(null);
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const qrSvgId = "rroi-qr-svg";

  return (
    <form onSubmit={handleSave}>
      <Section title="Section 1 (Free public) — Required">
        <Field label="First name" required>
          <input
            style={inputStyle}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. Jane"
          />
        </Field>

        <Field label="Last name" required>
          <input
            style={inputStyle}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g. Smith"
          />
        </Field>

        <Field label="Emergency Contact 1 — Name + surname" required>
          <input
            style={inputStyle}
            value={em1Name}
            onChange={(e) => setEm1Name(e.target.value)}
            placeholder="e.g. John Smith"
          />
        </Field>

        <Field label="Emergency Contact 1 — Relationship" required>
          <input
            style={inputStyle}
            value={em1Rel}
            onChange={(e) => setEm1Rel(e.target.value)}
            placeholder="e.g. Husband / Mother / Friend"
          />
        </Field>

        <Field label="Emergency Contact 1 — Phone" required hint="Use digits only (no spaces).">
          <input
            style={inputStyle}
            value={em1Phone}
            onChange={(e) => setEm1Phone(e.target.value)}
            placeholder="e.g. 0821234567"
          />
        </Field>

        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Your QR code</div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <QRCodeSVG id={qrSvgId} value={publicUrl || " "} size={180} />
            </div>
          </div>

          <div style={{ minWidth: 280 }}>
            <div style={{ fontSize: 14, marginBottom: 10 }}>
              <b>Public link:</b> {publicPath || "(saving your profile will generate this)"}
            </div>

            <button
              type="button"
              style={btnStyle}
              onClick={() => downloadQrAsPng(qrSvgId, "rroi-qr.png")}
              disabled={!publicUrl}
            >
              Download QR (PNG)
            </button>
          </div>
        </div>
      </Section>

      <Section title="Section 2 (Paid public) — Optional">
        <Field label="Emergency Contact 2 — Name + surname">
          <input
            style={inputStyle}
            value={em2Name}
            onChange={(e) => setEm2Name(e.target.value)}
            placeholder="Optional"
          />
        </Field>
        <Field label="Emergency Contact 2 — Relationship">
          <input
            style={inputStyle}
            value={em2Rel}
            onChange={(e) => setEm2Rel(e.target.value)}
            placeholder="Optional"
          />
        </Field>
        <Field label="Emergency Contact 2 — Phone">
          <input
            style={inputStyle}
            value={em2Phone}
            onChange={(e) => setEm2Phone(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Gender">
          <select style={inputStyle} value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">(not set)</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </Field>

        <Field label="Date of birth">
          <input
            style={inputStyle}
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Field>

        <Field label="Age (auto)">
          <input
            style={inputStyle}
            value={age == null ? "" : String(age)}
            readOnly
            placeholder="Auto-calculated"
          />
        </Field>

        <Field label="Blood type">
          <select style={inputStyle} value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">(not set)</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="A+">A+</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
            <option value="Unknown">Unknown</option>
          </select>
        </Field>

        <Field label="Allergies">
          <input
            style={inputStyle}
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="e.g. Penicillin / Bee stings"
          />
        </Field>

        <Field label="Chronic illnesses + other conditions">
          <input
            style={inputStyle}
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g. Asthma / Diabetes / Epilepsy"
          />
        </Field>

        <Field label="Medications">
          <input
            style={inputStyle}
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="e.g. Insulin / Inhaler"
          />
        </Field>

        <Field label="Important notes">
          <textarea
            style={{ ...inputStyle, minHeight: 90 }}
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="Anything an emergency responder must know."
          />
        </Field>
      </Section>

      <Section title="Section 3 — Optional">
        <Field label="Primary language">
          <input
            style={inputStyle}
            value={primaryLanguage}
            onChange={(e) => setPrimaryLanguage(e.target.value)}
            placeholder="e.g. Afrikaans"
          />
        </Field>

        <Field label="Secondary language (optional)">
          <input
            style={inputStyle}
            value={secondaryLanguage}
            onChange={(e) => setSecondaryLanguage(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Medical aid provider">
          <input
            style={inputStyle}
            value={medicalAidProvider}
            onChange={(e) => setMedicalAidProvider(e.target.value)}
            placeholder="e.g. Discovery"
          />
        </Field>

        <Field label="Medical aid policy number">
          <input
            style={inputStyle}
            value={medicalAidPolicy}
            onChange={(e) => setMedicalAidPolicy(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <div style={{ fontWeight: 900, margin: "10px 0 12px" }}>GP</div>

        <Field label="GP name">
          <input
            style={inputStyle}
            value={gpName}
            onChange={(e) => setGpName(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="GP practice">
          <input
            style={inputStyle}
            value={gpPractice}
            onChange={(e) => setGpPractice(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="GP phone">
          <input
            style={inputStyle}
            value={gpPhone}
            onChange={(e) => setGpPhone(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Religion (optional)">
          <input
            style={inputStyle}
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            placeholder="Optional"
          />
        </Field>
      </Section>

      <Section title="Section 4 (Identification) — Optional">
        <Field label="Height (cm)">
          <input
            style={inputStyle}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g. 170"
            inputMode="numeric"
          />
        </Field>

        <Field label="Weight (kg)">
          <input
            style={inputStyle}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="e.g. 70"
            inputMode="numeric"
          />
        </Field>

        <Field label="Eye color">
          <input
            style={inputStyle}
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            placeholder="e.g. Brown"
          />
        </Field>

        <Field label="Hair color">
          <input
            style={inputStyle}
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            placeholder="e.g. Blonde"
          />
        </Field>

        <Field label="Identifying marks (tattoos/scars/birthmarks)">
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={identifyingMarks}
            onChange={(e) => setIdentifyingMarks(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Skin tone dropdown">
          <select style={inputStyle} value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
            <option value="">(not set)</option>
            <option value="Very fair">Very fair</option>
            <option value="Fair">Fair</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Tan">Tan</option>
            <option value="Brown">Brown</option>
            <option value="Dark brown">Dark brown</option>
            <option value="Very dark">Very dark</option>
          </select>
        </Field>
      </Section>

      <Section title="Additional notes — Optional">
        <Field label="Additional notes">
          <textarea
            style={{ ...inputStyle, minHeight: 120 }}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Optional"
          />
        </Field>
      </Section>

      <div style={{ marginTop: 20, marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          I consent to the processing of my personal information in accordance with the Privacy
          Policy.
        </label>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button type="submit" style={btnStyle} disabled={loading || !consent}>
          {loading ? "Saving..." : "Save"}
        </button>

        {showUpgrade && (
          <button
            type="button"
            style={btnStyleSecondary}
            onClick={() => router.push("/subscribe/shipping")}
            disabled={loading}
          >
            Upgrade to Premium
          </button>
        )}

        <button type="button" style={btnStyleSecondary} onClick={handleLogout} disabled={loading}>
          Log out
        </button>
      </div>

      {message ? <div style={{ marginTop: 12, fontWeight: 700 }}>{message}</div> : null}
    </form>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #eee",
  borderRadius: 16,
  padding: 18,
  marginBottom: 18,
  background: "#fff",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 10,
  fontSize: 14,
};

const btnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #000",
  background: "#000",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const btnStyleSecondary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#000",
  fontWeight: 800,
  cursor: "pointer",
};