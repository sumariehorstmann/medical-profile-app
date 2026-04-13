export const dynamic = "force-dynamic";

type EmergencyContact = {
  full_name: string | null;
  first_name?: string | null;
  last_name?: string | null;
  relationship: string | null;
  phone: string | null;
};

type PublicProfile = {
  id: string;
  public_id: string;
  first_name: string | null;
  last_name: string | null;
  is_paid: boolean;
  subscription?: {
    status: string | null;
    current_period_end: string | null;
  } | null;

  gender?: string | null;
  date_of_birth?: string | null;
  blood_type?: string | null;
  allergies?: string | null;
  conditions?: string | null;
  medications?: string | null;
  special_notes?: string | null;

  primary_language?: string | null;
  secondary_language?: string | null;

  medical_aid_provider?: string | null;
  medical_aid_policy_number?: string | null;
  medical_aid_plan?: string | null;

  gp_name?: string | null;
  gp_practice?: string | null;
  gp_phone?: string | null;
  specialist_name?: string | null;
  specialist_phone?: string | null;
  preferred_hospital?: string | null;

  religion?: string | null;
  additional_notes?: string | null;

  height_cm?: number | null;
  weight_kg?: number | null;
  eye_color?: string | null;
  hair_color?: string | null;
  identifying_marks?: string | null;
  skin_tone?: string | null;

  implanted_devices?: string | null;
  mobility_notes?: string | null;
  pregnancy_status?: string | null;
  organ_donor_status?: string | null;

  province?: string | null;
  city?: string | null;
  nationality?: string | null;

  emergency_contacts?: EmergencyContact[];
};

async function getPublicProfile(
  publicId: string
): Promise<PublicProfile | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;

  const res = await fetch(
    `${base}/api/public-profile?publicId=${encodeURIComponent(publicId)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.profile ?? null;
}

function calcAge(dob?: string | null): string | null {
  if (!dob) return null;

  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }

  return age >= 0 && age <= 130 ? String(age) : null;
}

function formatDate(value?: string | null) {
  if (!value) return null;

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  return d.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value == null || value === "") return null;

  return (
    <div style={styles.field}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{String(value)}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.card}>
      <div style={styles.sectionTitle}>{title}</div>
      {children}
    </section>
  );
}

export default async function PublicEmergencyPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const profile = await getPublicProfile(publicId);

  if (!profile) {
    return (
      <main style={styles.center}>
        <div style={styles.notFoundWrap}>
          <h1 style={styles.notFoundTitle}>RROI</h1>
          <p style={styles.notFoundText}>Profile not found</p>
        </div>
      </main>
    );
  }

  const now = Date.now();

  const isPremium =
    profile.is_paid &&
    !!profile.subscription?.current_period_end &&
    new Date(profile.subscription.current_period_end).getTime() > now;

  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ");

  const c1 = profile.emergency_contacts?.[0] ?? null;
  const c2 = profile.emergency_contacts?.[1] ?? null;
  const age = calcAge(profile.date_of_birth);
  const dobFormatted = formatDate(profile.date_of_birth);

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Emergency Information</div>
        <div style={isPremium ? styles.badgePremium : styles.badgeFree}>
          {isPremium ? "Premium Profile" : "Free Profile"}
        </div>
      </div>

      <div style={styles.name}>{fullName || "-"}</div>

      <Section title="Primary Emergency Contact">
        <div style={styles.contactName}>{c1?.full_name || "-"}</div>
        <div style={styles.contactMeta}>{c1?.relationship || "-"}</div>

        {c1?.phone ? (
          <>
            <a href={`tel:${c1.phone}`} style={styles.phone}>
              {c1.phone}
            </a>

            <a href={`tel:${c1.phone}`} style={styles.callButton}>
              📞 Call Now
            </a>
          </>
        ) : (
          <div style={styles.mutedText}>No phone number available</div>
        )}
      </Section>

      {isPremium ? (
        <>
          {c2 ? (
            <Section title="Secondary Emergency Contact">
              <Field label="Name" value={c2.full_name} />
              <Field label="Relationship" value={c2.relationship} />
              <Field label="Phone" value={c2.phone} />
            </Section>
          ) : null}

          <Section title="Critical Medical Information">
            <Field label="Blood Type" value={profile.blood_type} />
            <Field label="Allergies" value={profile.allergies} />
            <Field label="Conditions" value={profile.conditions} />
            <Field label="Medications" value={profile.medications} />
            <Field label="Implanted Devices" value={profile.implanted_devices} />
            <Field label="Mobility Notes" value={profile.mobility_notes} />
            <Field label="Pregnancy Status" value={profile.pregnancy_status} />
            <Field label="Organ Donor Status" value={profile.organ_donor_status} />
            <Field label="Important Notes" value={profile.special_notes} />
          </Section>

          <Section title="Personal Details">
            <Field label="Gender" value={profile.gender} />
            <Field label="Date of Birth" value={dobFormatted} />
            <Field label="Age" value={age} />
            <Field label="Primary Language" value={profile.primary_language} />
            <Field
              label="Secondary Language"
              value={profile.secondary_language}
            />
            <Field label="Province" value={profile.province} />
            <Field label="City" value={profile.city} />
            <Field label="Nationality" value={profile.nationality} />
          </Section>

          <Section title="Medical Cover and Doctors">
            <Field label="Medical Aid Provider" value={profile.medical_aid_provider} />
            <Field
              label="Medical Aid Plan"
              value={profile.medical_aid_plan}
            />
            <Field
              label="Medical Aid Policy Number"
              value={profile.medical_aid_policy_number}
            />
            <Field label="GP Name" value={profile.gp_name} />
            <Field label="GP Practice" value={profile.gp_practice} />
            <Field label="GP Phone" value={profile.gp_phone} />
            <Field label="Specialist Name" value={profile.specialist_name} />
            <Field label="Specialist Phone" value={profile.specialist_phone} />
            <Field
              label="Preferred Hospital"
              value={profile.preferred_hospital}
            />
          </Section>

          <Section title="Identification Details">
            <Field label="Height (cm)" value={profile.height_cm} />
            <Field label="Weight (kg)" value={profile.weight_kg} />
            <Field label="Eye Color" value={profile.eye_color} />
            <Field label="Hair Color" value={profile.hair_color} />
            <Field label="Skin Tone" value={profile.skin_tone} />
            <Field
              label="Identifying Marks"
              value={profile.identifying_marks}
            />
          </Section>

          <Section title="Additional Information">
            <Field label="Religion" value={profile.religion} />
            <Field label="Additional Notes" value={profile.additional_notes} />
          </Section>
        </>
      ) : (
        <div style={styles.warning}>
          Limited profile. Only essential emergency information is visible on the
          Free plan.
        </div>
      )}

      <div style={styles.footer}>
        In an emergency, contact local emergency services immediately.
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 560,
    margin: "0 auto",
    padding: 16,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  center: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
  },

  notFoundWrap: {
    textAlign: "center",
  },

  notFoundTitle: {
    fontSize: 40,
    fontWeight: 900,
    margin: 0,
    color: "#0F172A",
  },

  notFoundText: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 16,
  },

  header: {
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 900,
    color: "#0F172A",
  },

  badgePremium: {
    marginTop: 6,
    color: "#157A55",
    fontWeight: 800,
    fontSize: 15,
  },

  badgeFree: {
    marginTop: 6,
    color: "#64748B",
    fontWeight: 800,
    fontSize: 15,
  },

  name: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 900,
    marginBottom: 16,
    color: "#0F172A",
    lineHeight: 1.15,
  },

  card: {
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    background: "#FFFFFF",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 12,
    color: "#0F172A",
  },

  contactName: {
    fontSize: 22,
    fontWeight: 900,
    color: "#0F172A",
  },

  contactMeta: {
    color: "#475569",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 600,
  },

  phone: {
    display: "block",
    fontSize: 20,
    fontWeight: 900,
    margin: "8px 0 12px",
    color: "#157A55",
    textDecoration: "none",
  },

  callButton: {
    display: "block",
    textAlign: "center",
    background: "#157A55",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    fontWeight: 900,
    textDecoration: "none",
  },

  mutedText: {
    color: "#64748B",
    fontSize: 14,
  },

  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  value: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0F172A",
    lineHeight: 1.45,
  },

  warning: {
    background: "#FFF3CD",
    border: "1px solid #FFE69C",
    padding: 12,
    borderRadius: 10,
    fontWeight: 700,
    marginTop: 10,
    color: "#7C5A00",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748B",
    marginTop: 18,
    lineHeight: 1.4,
    paddingBottom: 8,
  },
};