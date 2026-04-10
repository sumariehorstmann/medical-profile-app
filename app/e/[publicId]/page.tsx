export const dynamic = "force-dynamic";

type EmergencyContact = {
  full_name: string | null;
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
  gp_name?: string | null;
  gp_practice?: string | null;
  gp_phone?: string | null;
  religion?: string | null;
  additional_notes?: string | null;
  emergency_contacts?: EmergencyContact[];
};

async function getPublicProfile(publicId: string): Promise<PublicProfile | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(
    `${base}/api/public-profile?publicId=${encodeURIComponent(publicId)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.profile ?? null;
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
        <div>
          <h1>RROI</h1>
          <p>Profile not found</p>
        </div>
      </main>
    );
  }

  const now = Date.now();

  const isPremium =
    profile.is_paid &&
    profile.subscription?.current_period_end &&
    new Date(profile.subscription.current_period_end).getTime() > now;

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
  const c1 = profile.emergency_contacts?.[0];

  return (
    <main style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>Emergency Information</div>
        <div style={isPremium ? styles.badgePremium : styles.badgeFree}>
          {isPremium ? "Premium Profile" : "Free Profile"}
        </div>
      </div>

      {/* NAME */}
      <div style={styles.name}>{fullName}</div>

      {/* EMERGENCY CONTACT */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>Emergency Contact</div>

        <div style={styles.contactName}>{c1?.full_name}</div>
        <div style={styles.contactMeta}>{c1?.relationship}</div>

        {c1?.phone && (
          <a href={`tel:${c1.phone}`} style={styles.callButton}>
            📞 Call Now
          </a>
        )}
      </div>

      {/* PREMIUM ONLY */}
      {isPremium && (
        <>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Critical Medical Info</div>

            <Field label="Blood Type" value={profile.blood_type} />
            <Field label="Allergies" value={profile.allergies} />
            <Field label="Conditions" value={profile.conditions} />
            <Field label="Medications" value={profile.medications} />
            <Field label="Notes" value={profile.special_notes} />
          </div>

          <div style={styles.card}>
            <div style={styles.sectionTitle}>Additional Details</div>

            <Field label="Medical Aid" value={profile.medical_aid_provider} />
            <Field label="Policy" value={profile.medical_aid_policy_number} />
            <Field label="Doctor" value={profile.gp_name} />
            <Field label="Doctor Phone" value={profile.gp_phone} />
          </div>
        </>
      )}

      {!isPremium && (
        <div style={styles.warning}>
          Limited profile: only essential emergency information is available.
        </div>
      )}

      <div style={styles.footer}>
        In an emergency, contact local emergency services immediately.
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;

  return (
    <div style={styles.field}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    maxWidth: 520,
    margin: "0 auto",
    padding: 16,
    fontFamily: "system-ui",
  },

  center: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
  },

  header: {
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: 800,
  },

  badgePremium: {
    marginTop: 6,
    color: "#157A55",
    fontWeight: 700,
  },

  badgeFree: {
    marginTop: 6,
    color: "#888",
    fontWeight: 700,
  },

  name: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 16,
  },

  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    background: "#fff",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 10,
  },

  contactName: {
    fontSize: 20,
    fontWeight: 800,
  },

  contactMeta: {
    color: "#666",
    marginBottom: 10,
  },

  callButton: {
    display: "block",
    textAlign: "center",
    background: "#157A55",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    fontWeight: 800,
    textDecoration: "none",
  },

  field: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  value: {
    fontSize: 16,
    fontWeight: 600,
  },

  warning: {
    background: "#fff3cd",
    padding: 12,
    borderRadius: 10,
    fontWeight: 600,
    marginTop: 10,
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 18,
  },
};