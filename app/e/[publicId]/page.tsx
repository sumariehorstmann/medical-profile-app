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

async function getPublicProfile(
  publicId: string
): Promise<PublicProfile | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;

    if (!base) {
      console.error("NEXT_PUBLIC_BASE_URL is missing");
      return null;
    }

    const res = await fetch(
      `${base}/api/public-profile?publicId=${encodeURIComponent(publicId)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Public profile fetch failed:", res.status);
      return null;
    }

    const json = (await res.json()) as { profile: PublicProfile | null };
    return json.profile ?? null;
  } catch (error) {
    console.error("Public profile fetch error:", error);
    return null;
  }
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div style={{ padding: "10px 0", borderTop: "1px solid #eee" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>
        {value && value.trim() !== "" ? value : "-"}
      </div>
    </div>
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
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          background: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 800 }}>RROI</div>
          <div style={{ marginTop: 8, color: "#666" }}>Profile not found</div>
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

  const contacts = Array.isArray(profile.emergency_contacts)
    ? profile.emergency_contacts
    : [];

  const c1 = contacts[0] ?? null;

  return (
    <main style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 44, fontWeight: 800 }}>RROI</div>
        <div style={{ color: "#666", marginTop: 6 }}>Emergency Information</div>
      </div>

      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 18,
          background: "#fff",
        }}
      >
        <Field label="Name" value={fullName || null} />

        <div style={{ padding: "14px 0 6px", borderTop: "1px solid #eee" }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Emergency Contact</div>
        </div>

        <Field label="Full name" value={c1?.full_name ?? null} />
        <Field label="Relationship" value={c1?.relationship ?? null} />
        <Field label="Phone" value={c1?.phone ?? null} />

        {isPremium ? (
          <>
            <div style={{ padding: "14px 0 6px", borderTop: "1px solid #eee" }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>
                Medical Information
              </div>
            </div>

            <Field label="Gender" value={profile.gender ?? null} />
            <Field label="Date of birth" value={profile.date_of_birth ?? null} />
            <Field label="Blood type" value={profile.blood_type ?? null} />
            <Field label="Allergies" value={profile.allergies ?? null} />
            <Field label="Conditions" value={profile.conditions ?? null} />
            <Field label="Medications" value={profile.medications ?? null} />
            <Field label="Special notes" value={profile.special_notes ?? null} />

            <div style={{ padding: "14px 0 6px", borderTop: "1px solid #eee" }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>
                Additional Details
              </div>
            </div>

            <Field
              label="Primary language"
              value={profile.primary_language ?? null}
            />
            <Field
              label="Secondary language"
              value={profile.secondary_language ?? null}
            />
            <Field
              label="Medical aid provider"
              value={profile.medical_aid_provider ?? null}
            />
            <Field
              label="Policy number"
              value={profile.medical_aid_policy_number ?? null}
            />
            <Field label="GP name" value={profile.gp_name ?? null} />
            <Field label="GP practice" value={profile.gp_practice ?? null} />
            <Field label="GP phone" value={profile.gp_phone ?? null} />
            <Field label="Religion" value={profile.religion ?? null} />
            <Field
              label="Additional notes"
              value={profile.additional_notes ?? null}
            />
          </>
        ) : (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 10,
              background: "#fff3cd",
              border: "1px solid #ffeeba",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Limited profile. Only essential emergency information is available.
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#888",
          marginTop: 18,
          fontSize: 12,
        }}
      >
        In an emergency, contact local emergency services immediately.
      </div>
    </main>
  );
}