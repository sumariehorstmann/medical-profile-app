"use client";

import DownloadQRWallpaper from "@/components/DownloadQRWallpaper";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  user_id: string;
  public_id: string;

  first_name: string | null;
  last_name: string | null;
  profile_photo_url: string | null;

  emergency1_fullname: string | null;
  emergency1_first_name: string | null;
  emergency1_last_name: string | null;
  emergency1_relationship: string | null;
  emergency1_phone: string | null;

  emergency2_fullname: string | null;
  emergency2_first_name: string | null;
  emergency2_last_name: string | null;
  emergency2_relationship: string | null;
  emergency2_phone: string | null;

  gender: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string | null;
  conditions: string | null;
  medications: string | null;
  special_notes: string | null;

  implanted_devices: string | null;
  mobility_notes: string | null;
  pregnancy_status: string | null;
  organ_donor_status: string | null;

  primary_language: string | null;
  secondary_language: string | null;
  nationality: string | null;
  province: string | null;
  city: string | null;
  
  medical_aid_provider: string | null;
  medical_aid_policy_number: string | null;
  medical_aid_plan: string | null;

  gp_name: string | null;
  gp_phone: string | null;
  specialist_name: string | null;
  specialist_phone: string | null;
  preferred_hospital: string | null;

  religion: string | null;
  additional_notes: string | null;

  height_cm: number | null;
  weight_kg: number | null;
  eye_color: string | null;
  hair_color: string | null;
  identifying_marks: string | null;
  skin_tone: string | null;
  
};

function calcAge(dob: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }

  return age >= 0 && age <= 130 ? age : null;
}

function normalizePhone(raw: string) {
  return raw.replace(/\s+/g, "").trim();
}

function joinName(first: string, last: string) {
  return [first.trim(), last.trim()].filter(Boolean).join(" ").trim();
}

function splitLegacyName(fullName: string | null) {
  const clean = (fullName ?? "").trim();
  if (!clean) return { first: "", last: "" };

  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return { first: parts[0], last: "" };
  }

  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.slice(-1)[0],
  };
}

function Section({
  title,
  subtitle,
  children,
  info,
}: {
  title: string;
  subtitle?: string;
  info?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={cardStyle}>
      <div style={{ marginBottom: 14 }}>
        <div style={sectionTitleStyle}>{title}</div>
        {subtitle ? <div style={sectionSubtitleStyle}>{subtitle}</div> : null}
        {info ? <div style={sectionInfoStyle}>{info}</div> : null}
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
      <div style={fieldLabelStyle}>
        {label} {required ? <span style={{ color: "#b00020" }}>*</span> : null}
      </div>
      {children}
      {hint ? <div style={fieldHintStyle}>{hint}</div> : null}
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

  const emergency1Legacy = splitLegacyName(initial?.emergency1_fullname ?? null);
  const emergency2Legacy = splitLegacyName(initial?.emergency2_fullname ?? null);

  const publicId = initial?.public_id ?? "";
  const publicPath = publicId ? `/e/${publicId}` : "";
  const publicUrl =
    typeof window !== "undefined" && publicPath
      ? `${window.location.origin}${publicPath}`
      : publicPath;

  const [firstName, setFirstName] = useState(initial?.first_name ?? "");
  const [lastName, setLastName] = useState(initial?.last_name ?? "");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    initial?.profile_photo_url ?? ""
  );
  const [photoUploading, setPhotoUploading] = useState(false);

  const [em1FirstName, setEm1FirstName] = useState(
    initial?.emergency1_first_name ?? emergency1Legacy.first
  );
  const [em1LastName, setEm1LastName] = useState(
    initial?.emergency1_last_name ?? emergency1Legacy.last
  );
  const [em1Rel, setEm1Rel] = useState(initial?.emergency1_relationship ?? "");
  const [em1Phone, setEm1Phone] = useState(initial?.emergency1_phone ?? "");

  const [em2FirstName, setEm2FirstName] = useState(
    initial?.emergency2_first_name ?? emergency2Legacy.first
  );
  const [em2LastName, setEm2LastName] = useState(
    initial?.emergency2_last_name ?? emergency2Legacy.last
  );
  const [em2Rel, setEm2Rel] = useState(initial?.emergency2_relationship ?? "");
  const [em2Phone, setEm2Phone] = useState(initial?.emergency2_phone ?? "");

  const [gender, setGender] = useState(initial?.gender ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(initial?.date_of_birth ?? "");
  const [bloodType, setBloodType] = useState(initial?.blood_type ?? "");
  const [allergies, setAllergies] = useState(initial?.allergies ?? "");
  const [conditions, setConditions] = useState(initial?.conditions ?? "");
  const [medications, setMedications] = useState(initial?.medications ?? "");
  const [specialNotes, setSpecialNotes] = useState(initial?.special_notes ?? "");
  const [linkCopied, setLinkCopied] = useState(false);
  const [implantedDevices, setImplantedDevices] = useState(
    initial?.implanted_devices ?? ""
  );
  const [mobilityNotes, setMobilityNotes] = useState(
    initial?.mobility_notes ?? ""
  );
  const [pregnancyStatus, setPregnancyStatus] = useState(
    initial?.pregnancy_status ?? ""
  );
  const [organDonorStatus, setOrganDonorStatus] = useState(
    initial?.organ_donor_status ?? ""
  );

  const [primaryLanguage, setPrimaryLanguage] = useState(
    initial?.primary_language ?? ""
  );
  const [secondaryLanguage, setSecondaryLanguage] = useState(
    initial?.secondary_language ?? ""
  );
  const [nationality, setNationality] = useState(initial?.nationality ?? "");
  const [province, setProvince] = useState(initial?.province ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  
  const [medicalAidProvider, setMedicalAidProvider] = useState(
    initial?.medical_aid_provider ?? ""
  );
  const [medicalAidPolicy, setMedicalAidPolicy] = useState(
    initial?.medical_aid_policy_number ?? ""
  );
  const [medicalAidPlan, setMedicalAidPlan] = useState(
    initial?.medical_aid_plan ?? ""
  );

  const [gpName, setGpName] = useState(initial?.gp_name ?? "");
  const [gpPhone, setGpPhone] = useState(initial?.gp_phone ?? "");

  const [specialistName, setSpecialistName] = useState(
    initial?.specialist_name ?? ""
  );
  const [specialistPhone, setSpecialistPhone] = useState(
    initial?.specialist_phone ?? ""
  );
  const [preferredHospital, setPreferredHospital] = useState(
    initial?.preferred_hospital ?? ""
  );

  const [religion, setReligion] = useState(initial?.religion ?? "");
  const [heightCm, setHeightCm] = useState(
    initial?.height_cm == null ? "" : String(initial.height_cm)
  );
  const [weightKg, setWeightKg] = useState(
    initial?.weight_kg == null ? "" : String(initial.weight_kg)
  );
  const [eyeColor, setEyeColor] = useState(initial?.eye_color ?? "");
  const [hairColor, setHairColor] = useState(initial?.hair_color ?? "");
  const [identifyingMarks, setIdentifyingMarks] = useState(
    initial?.identifying_marks ?? ""
  );
  const [skinTone, setSkinTone] = useState(initial?.skin_tone ?? "");
  const [additionalNotes, setAdditionalNotes] = useState(
    initial?.additional_notes ?? ""
  );

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);
  const [photoMessageType, setPhotoMessageType] = useState<
    "error" | "success" | null
  >(null);

  const age = useMemo(() => calcAge(dateOfBirth || null), [dateOfBirth]);

  function validateRequired(): string | null {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!em1FirstName.trim()) return "Emergency Contact 1 first name is required.";
    if (!em1LastName.trim()) return "Emergency Contact 1 last name is required.";
    if (!em1Rel.trim()) return "Emergency Contact 1 relationship is required.";

    if (!/^\d{10,15}$/.test(normalizePhone(em1Phone))) {
      return "Emergency Contact 1 phone must contain 10 to 15 digits only.";
    }

    if (em2Phone.trim() && !/^\d{10,15}$/.test(normalizePhone(em2Phone))) {
      return "Emergency Contact 2 phone must contain 10 to 15 digits only.";
    }

    if (gpPhone.trim() && !/^\d{10,15}$/.test(normalizePhone(gpPhone))) {
      return "GP phone must contain 10 to 15 digits only.";
    }

    if (
      specialistPhone.trim() &&
      !/^\d{10,15}$/.test(normalizePhone(specialistPhone))
    ) {
      return "Specialist phone must contain 10 to 15 digits only.";
    }

    return null;
  }

  async function handlePhotoUpload(file: File) {
    setPhotoMessage(null);
    setPhotoMessageType(null);

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoMessage("Please upload a JPG, PNG, or WEBP image.");
      setPhotoMessageType("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoMessage("Image must be smaller than 5MB.");
      setPhotoMessageType("error");
      return;
    }

    setPhotoUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/profile-photo", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to upload photo.");
      }

      setProfilePhotoUrl(json.url);
      setPhotoMessage("Profile photo uploaded successfully.");
      setPhotoMessageType("success");
      router.refresh();
    } catch (error: any) {
      setPhotoMessage(error?.message || "Failed to upload photo.");
      setPhotoMessageType("error");
    } finally {
      setPhotoUploading(false);
    }
  }

  async function handleRemovePhoto() {
    setPhotoUploading(true);
    setPhotoMessage(null);
    setPhotoMessageType(null);

    try {
      const res = await fetch("/api/profile-photo/delete", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to remove photo");
      }

      setProfilePhotoUrl("");
      setPhotoMessage("Photo removed successfully.");
      setPhotoMessageType("success");
      router.refresh();
    } catch (err: any) {
      setPhotoMessage(err.message || "Failed to remove photo.");
      setPhotoMessageType("error");
    } finally {
      setPhotoUploading(false);
    }
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
      setMessage("❌ Please accept the Privacy Policy before saving.");
      return;
    }

    setLoading(true);

    try {
      const em1Full = joinName(em1FirstName, em1LastName);
      const em2Full = joinName(em2FirstName, em2LastName);

      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        profile_photo_url: profilePhotoUrl || null,

        emergency1_first_name: em1FirstName.trim(),
        emergency1_last_name: em1LastName.trim(),
        emergency1_fullname: em1Full || null,
        emergency1_relationship: em1Rel.trim(),
        emergency1_phone: normalizePhone(em1Phone),

        emergency2_first_name: em2FirstName.trim() || null,
        emergency2_last_name: em2LastName.trim() || null,
        emergency2_fullname: em2Full || null,
        emergency2_relationship: em2Rel.trim() || null,
        emergency2_phone: normalizePhone(em2Phone) || null,

        blood_type: bloodType || null,
        allergies: allergies || null,
        medications: medications || null,
        conditions: conditions || null,
        implanted_devices: implantedDevices || null,
        mobility_notes: mobilityNotes || null,

        pregnancy_status: pregnancyStatus || null,
        organ_donor_status: organDonorStatus || null,
        preferred_hospital: preferredHospital || null,
        medical_aid_provider: medicalAidProvider || null,
        medical_aid_plan: medicalAidPlan || null,
        medical_aid_policy_number: medicalAidPolicy || null,
        gp_name: gpName || null,
        gp_phone: normalizePhone(gpPhone) || null,
        specialist_name: specialistName || null,
        specialist_phone: normalizePhone(specialistPhone) || null,
        special_notes: specialNotes || null,

        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        height_cm: heightCm ? Number(heightCm) : null,
        weight_kg: weightKg ? Number(weightKg) : null,
        eye_color: eyeColor || null,
        hair_color: hairColor || null,
        skin_tone: skinTone || null,
        identifying_marks: identifyingMarks || null,

        primary_language: primaryLanguage || null,
        secondary_language: secondaryLanguage || null,
        nationality: nationality || null,
        province: province || null,
        city: city || null,
        religion: religion || null,

        additional_notes: additionalNotes || null,
        
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to save profile");
      }

      setMessage("✅ Profile saved successfully.");
      router.refresh();
    } catch (error: any) {
      setMessage(`❌ ${error?.message || "Something went wrong"}`);
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

  return (
    <form onSubmit={handleSave}>
      <Section
        title="Identity & Immediate Emergency Contact"
        subtitle="These details are visible when your QR code is scanned on the Free plan."
      >
        <Field
          label="Profile Photo"
          hint="Optional. This will help identify you in an emergency and will show on both Free and Premium public profiles."
        >
          <div style={photoRowStyle}>
            <div style={photoPreviewWrapStyle}>
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  style={photoPreviewStyle}
                />
              ) : (
                <div style={photoPlaceholderStyle}>No photo</div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <label style={secondaryBtnStyle}>
                  {photoUploading ? "Uploading..." : "Upload photo"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void handlePhotoUpload(file);
                        e.currentTarget.value = "";
                      }
                    }}
                    disabled={photoUploading || loading}
                  />
                </label>

                {profilePhotoUrl ? (
                  <button
                    type="button"
                    style={secondaryBtnStyle}
                    onClick={handleRemovePhoto}
                    disabled={photoUploading || loading}
                  >
                    Remove photo
                  </button>
                ) : null}
              </div>

              {photoMessage ? (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: photoMessageType === "error" ? "#D32F2F" : "#157A55",
                  }}
                >
                  {photoMessage}
                </div>
              ) : null}
            </div>
          </div>
        </Field>

        <Field label="First Name" required>
          <input
            style={inputStyle}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. Jane"
          />
        </Field>

        <Field label="Last Name" required>
          <input
            style={inputStyle}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g. Smith"
          />
        </Field>

        <Field label="Emergency Contact 1 Name — First Name" required>
          <input
            style={inputStyle}
            value={em1FirstName}
            onChange={(e) => setEm1FirstName(e.target.value)}
            placeholder="e.g. John"
          />
        </Field>

        <Field label="Emergency Contact 1 Name — Last Name" required>
          <input
            style={inputStyle}
            value={em1LastName}
            onChange={(e) => setEm1LastName(e.target.value)}
            placeholder="e.g. Smith"
          />
        </Field>

        <Field label="Emergency Contact 1 Relationship" required>
          <input
            style={inputStyle}
            value={em1Rel}
            onChange={(e) => setEm1Rel(e.target.value)}
            placeholder="e.g. Husband / Mother / Friend"
          />
        </Field>

        <Field
          label="Emergency Contact 1 Number"
          required
          hint="Use digits only."
        >
          <input
            style={inputStyle}
            value={em1Phone}
            onChange={(e) => setEm1Phone(e.target.value)}
            placeholder="e.g. 0821234567"
            inputMode="numeric"
          />
        </Field>

        <div style={{ marginTop: 18 }}>
          <div style={qrHeadingStyle}>Your QR code</div>

          <div style={qrRowStyle}>
            <div style={qrCardStyle}>
              <QRCodeSVG value={publicUrl || " "} size={180} />
            </div>

            <div style={{ minWidth: 280, flex: 1 }}>
              <div style={{ fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>
                <b>Public link:</b>
                <div style={publicLinkStyle}>
                  {publicUrl || "(saving your profile will generate this)"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
  type="button"
  style={{
    ...secondaryBtnStyle,
    background: linkCopied ? "#157A55" : "#FFFFFF",
    color: linkCopied ? "#FFFFFF" : "#0F172A",
    border: linkCopied ? "1px solid #157A55" : "1px solid #D1D5DB",
  }}
  onClick={async () => {
    if (!publicUrl) return;

    await navigator.clipboard.writeText(publicUrl);
    setLinkCopied(true);
    setMessage("✅ Link copied.");

    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  }}
  disabled={!publicUrl}
>
  {linkCopied ? "Copied!" : "Copy Link"}
</button>
              </div>

              {publicId ? (
                <div style={{ marginTop: 12 }}>
                  <DownloadQRWallpaper
                    publicId={publicId}
                    firstName={firstName}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Critical Medical Information"
        subtitle="These details are only publicly visible when Premium is active."
        info={
          showUpgrade
            ? "Complete these details now. They will become publicly visible after upgrading."
            : undefined
        }
      >
        <Field label="Blood Type">
          <select
            style={inputStyle}
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          >
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

        <Field label="Current Medication">
          <input
            style={inputStyle}
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="e.g. Insulin / Inhaler"
          />
        </Field>

        <Field label="Medical Conditions">
          <input
            style={inputStyle}
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g. Asthma / Diabetes / Epilepsy"
          />
        </Field>

        <Field label="Implanted Devices">
          <input
            style={inputStyle}
            value={implantedDevices}
            onChange={(e) => setImplantedDevices(e.target.value)}
            placeholder="e.g. Pacemaker / Insulin pump"
          />
        </Field>

        <Field label="Mobility / Disability Notes">
          <input
            style={inputStyle}
            value={mobilityNotes}
            onChange={(e) => setMobilityNotes(e.target.value)}
            placeholder="e.g. Wheelchair user / Deaf / Non-verbal"
          />
        </Field>
      </Section>

      <Section
        title="Medical Support Information"
        subtitle="These details are only publicly visible when Premium is active."
      >
        <Field label="Pregnancy Status">
          <select
            style={inputStyle}
            value={pregnancyStatus}
            onChange={(e) => setPregnancyStatus(e.target.value)}
          >
            <option value="">(not set)</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Not pregnant">Not pregnant</option>
            <option value="Unknown">Unknown</option>
            <option value="Not applicable">Not applicable</option>
          </select>
        </Field>

        <Field label="Organ Donor Status">
          <select
            style={inputStyle}
            value={organDonorStatus}
            onChange={(e) => setOrganDonorStatus(e.target.value)}
          >
            <option value="">(not set)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Unknown">Unknown</option>
          </select>
        </Field>

        <Field label="Preferred Hospital">
          <input
            style={inputStyle}
            value={preferredHospital}
            onChange={(e) => setPreferredHospital(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Medical Aid Provider">
          <input
            style={inputStyle}
            value={medicalAidProvider}
            onChange={(e) => setMedicalAidProvider(e.target.value)}
            placeholder="e.g. Discovery"
          />
        </Field>

        <Field label="Medical Aid Plan">
          <input
            style={inputStyle}
            value={medicalAidPlan}
            onChange={(e) => setMedicalAidPlan(e.target.value)}
            placeholder="e.g. Classic Saver"
          />
        </Field>

        <Field label="Medical Aid Number">
          <input
            style={inputStyle}
            value={medicalAidPolicy}
            onChange={(e) => setMedicalAidPolicy(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="GP Name">
          <input
            style={inputStyle}
            value={gpName}
            onChange={(e) => setGpName(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="GP Number">
          <input
            style={inputStyle}
            value={gpPhone}
            onChange={(e) => setGpPhone(e.target.value)}
            placeholder="Optional"
            inputMode="numeric"
          />
        </Field>

        <Field label="Specialist Name">
          <input
            style={inputStyle}
            value={specialistName}
            onChange={(e) => setSpecialistName(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Specialist Number">
          <input
            style={inputStyle}
            value={specialistPhone}
            onChange={(e) => setSpecialistPhone(e.target.value)}
            placeholder="Optional"
            inputMode="numeric"
          />
        </Field>

        <Field label="Additional Medical Notes">
          <textarea
            style={{ ...inputStyle, minHeight: 100 }}
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="Anything an emergency responder must know."
          />
        </Field>
      </Section>

      <Section
        title="Personal Identification"
        subtitle="These details are only publicly visible when Premium is active."
      >
        <Field label="Date of Birth">
          <input
            style={inputStyle}
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Field>

        <Field label="Age">
          <input
            style={inputStyle}
            value={age == null ? "" : String(age)}
            readOnly
            placeholder="Auto-calculated"
          />
        </Field>

        <Field label="Gender">
          <select
            style={inputStyle}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">(not set)</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </Field>

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

        <Field label="Eye Colour">
          <input
            style={inputStyle}
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            placeholder="e.g. Brown"
          />
        </Field>

        <Field label="Hair Colour">
          <input
            style={inputStyle}
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            placeholder="e.g. Blonde"
          />
        </Field>

        <Field label="Skin Tone">
          <select
            style={inputStyle}
            value={skinTone}
            onChange={(e) => setSkinTone(e.target.value)}
          >
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
        <Field
  label="Identifying Marks"
  hint="Stored for account/admin use unless you later choose to expose it publicly."
>
  <textarea
    style={{ ...inputStyle, minHeight: 90 }}
    value={identifyingMarks}
    onChange={(e) => setIdentifyingMarks(e.target.value)}
    placeholder="e.g. Tattoos / scars / birthmarks"
  />
</Field>
      </Section>

      <Section
        title="Communication & Location"
        subtitle="These details are only publicly visible when Premium is active."
      >
        <Field label="Primary Language">
          <input
            style={inputStyle}
            value={primaryLanguage}
            onChange={(e) => setPrimaryLanguage(e.target.value)}
            placeholder="e.g. English"
          />
        </Field>

        <Field label="2nd Language">
          <input
            style={inputStyle}
            value={secondaryLanguage}
            onChange={(e) => setSecondaryLanguage(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Nationality">
          <input
            style={inputStyle}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Province">
          <input
            style={inputStyle}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="e.g. Western Cape"
          />
        </Field>

        <Field label="City">
          <input
            style={inputStyle}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Cape Town"
          />
        </Field>

        <Field label="Religion">
          <input
            style={inputStyle}
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            placeholder="Optional"
          />
        </Field>
      </Section>

      <Section
        title="Additional Information"
        subtitle="These details are only publicly visible when Premium is active."
      >
        <Field label="Additional Notes">
          <textarea
            style={{ ...inputStyle, minHeight: 120 }}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Emergency Contact 2 Name — First Name">
          <input
            style={inputStyle}
            value={em2FirstName}
            onChange={(e) => setEm2FirstName(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Emergency Contact 2 Name — Last Name">
          <input
            style={inputStyle}
            value={em2LastName}
            onChange={(e) => setEm2LastName(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Emergency Contact 2 Relationship">
          <input
            style={inputStyle}
            value={em2Rel}
            onChange={(e) => setEm2Rel(e.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Emergency Contact 2 Number">
          <input
            style={inputStyle}
            value={em2Phone}
            onChange={(e) => setEm2Phone(e.target.value)}
            placeholder="Optional"
            inputMode="numeric"
          />
        </Field>

            

        
      </Section>

      <div style={{ marginTop: 20, marginBottom: 16 }}>
        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginTop: 12,
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ marginTop: 4 }}
          />
          <span>
            I consent to the processing of my personal information in accordance
            with the{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", fontWeight: 600 }}
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {!consent ? (
          <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
            You must read and accept the Privacy Policy before saving your profile.
          </div>
        ) : null}
      </div>

      {showUpgrade ? (
        <div style={freePlanBannerStyle}>
          You are on the Free plan. Only the free-tier emergency details are visible
          when your QR is scanned.
        </div>
      ) : (
        <div style={premiumPlanBannerStyle}>
          Premium is active. Your full profile is visible when your QR is scanned.
        </div>
      )}

      <div style={actionRowStyle}>
        <button
          type="submit"
          style={{
            ...primaryBtnStyle,
            opacity: !consent ? 0.5 : 1,
            cursor: !consent ? "not-allowed" : "pointer",
          }}
          disabled={loading || !consent}
        >
          {loading ? "Saving..." : "Save profile"}
        </button>

        {showUpgrade ? (
          <button
            type="button"
            style={secondaryBtnStyle}
            onClick={() => router.push("/subscribe")}
            disabled={loading}
          >
            Unlock Full Profile (Premium)
          </button>
        ) : null}

        <button
          type="button"
          style={secondaryBtnStyle}
          onClick={handleLogout}
          disabled={loading}
        >
          Log out
        </button>

        <button
          type="button"
          style={secondaryBtnStyle}
          onClick={async () => {
            const confirmText = window.prompt(
              "Type DELETE to permanently delete your profile and subscription data."
            );

            if (confirmText !== "DELETE") {
              setMessage("❌ Account deletion cancelled.");
              return;
            }

            setLoading(true);
            setMessage(null);

            try {
              const res = await fetch("/api/delete-account", {
                method: "POST",
              });

              const json = await res.json();

              if (!res.ok) {
                throw new Error(json?.error || "Failed to delete account");
              }

              setMessage("✅ Account deleted successfully. Redirecting...");

              await supabase.auth.signOut();

              setTimeout(() => {
                router.push("/");
              }, 2000);
            } catch (e: any) {
              setMessage(`❌ ${e?.message || "Something went wrong"}`);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          Delete account
        </button>
      </div>

      {message ? <div style={messageStyle}>{message}</div> : null}
    </form>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: 16,
  padding: 18,
  marginBottom: 18,
  background: "#FFFFFF",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 900,
  color: "#0F172A",
};

const sectionSubtitleStyle: React.CSSProperties = {
  marginTop: 4,
  color: "#475569",
  fontSize: 13,
  lineHeight: 1.5,
};

const sectionInfoStyle: React.CSSProperties = {
  marginTop: 10,
  padding: "10px 12px",
  borderRadius: 10,
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  color: "#334155",
  fontSize: 13,
  lineHeight: 1.6,
  fontWeight: 600,
};

const fieldLabelStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: 6,
  color: "#0F172A",
};

const fieldHintStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: "#555",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: 12,
  fontSize: 15,
  color: "#0F172A",
  background: "#FFFFFF",
};

const qrHeadingStyle: React.CSSProperties = {
  fontWeight: 800,
  marginBottom: 10,
  color: "#0F172A",
};

const qrRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 18,
  alignItems: "center",
  flexWrap: "wrap",
};

const qrCardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  padding: 12,
  borderRadius: 12,
};

const publicLinkStyle: React.CSSProperties = {
  marginTop: 6,
  padding: 8,
  borderRadius: 8,
  background: "#F1F5F9",
  fontSize: 13,
  wordBreak: "break-all",
  color: "#0F172A",
};

const primaryBtnStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid #157A55",
  background: "#157A55",
  color: "#FFFFFF",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  color: "#0F172A",
  fontWeight: 800,
  cursor: "pointer",
};

const freePlanBannerStyle: React.CSSProperties = {
  marginBottom: 12,
  padding: 12,
  borderRadius: 10,
  background: "#FFF3CD",
  border: "1px solid #FFE69C",
  fontSize: 13,
  fontWeight: 700,
  color: "#7C5A00",
};

const premiumPlanBannerStyle: React.CSSProperties = {
  marginBottom: 12,
  padding: 12,
  borderRadius: 10,
  background: "#E8F7EE",
  border: "1px solid #B7E4C7",
  fontSize: 13,
  fontWeight: 700,
  color: "#166534",
};

const actionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const messageStyle: React.CSSProperties = {
  marginTop: 14,
  fontWeight: 700,
  color: "#0F172A",
};

const photoRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  alignItems: "center",
  flexWrap: "wrap",
};

const photoPreviewWrapStyle: React.CSSProperties = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  overflow: "hidden",
  border: "1px solid #E5E7EB",
  background: "#F8FAFC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const photoPreviewStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const photoPlaceholderStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "#64748B",
  textAlign: "center",
  padding: 12,
};
