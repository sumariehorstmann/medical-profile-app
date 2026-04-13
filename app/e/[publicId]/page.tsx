export const dynamic = "force-dynamic";

import PublicPageClient from "./PublicPageClient";

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
  profile_photo_url?: string | null;
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
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  if (!base) return null;

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

  const emergency1 = profile.emergency_contacts?.[0] ?? null;
  const emergency2 = profile.emergency_contacts?.[1] ?? null;

  const mappedProfile = {
    profile_photo_url: profile.profile_photo_url ?? null,

    first_name: profile.first_name ?? null,
    last_name: profile.last_name ?? null,

    emergency1_fullname: emergency1?.full_name ?? null,
    emergency1_first_name: emergency1?.first_name ?? null,
    emergency1_last_name: emergency1?.last_name ?? null,
    emergency1_relationship: emergency1?.relationship ?? null,
    emergency1_phone: emergency1?.phone ?? null,

    emergency2_fullname: emergency2?.full_name ?? null,
    emergency2_first_name: emergency2?.first_name ?? null,
    emergency2_last_name: emergency2?.last_name ?? null,
    emergency2_relationship: emergency2?.relationship ?? null,
    emergency2_phone: emergency2?.phone ?? null,

    blood_type: profile.blood_type ?? null,
    allergies: profile.allergies ?? null,
    medications: profile.medications ?? null,
    conditions: profile.conditions ?? null,
    implanted_devices: profile.implanted_devices ?? null,
    mobility_notes: profile.mobility_notes ?? null,

    pregnancy_status: profile.pregnancy_status ?? null,
    organ_donor_status: profile.organ_donor_status ?? null,
    preferred_hospital: profile.preferred_hospital ?? null,
    medical_aid_provider: profile.medical_aid_provider ?? null,
    medical_aid_plan: profile.medical_aid_plan ?? null,
    medical_aid_policy_number: profile.medical_aid_policy_number ?? null,
    gp_name: profile.gp_name ?? null,
    gp_phone: profile.gp_phone ?? null,
    specialist_name: profile.specialist_name ?? null,
    specialist_phone: profile.specialist_phone ?? null,
    special_notes: profile.special_notes ?? null,

    date_of_birth: profile.date_of_birth ?? null,
    gender: profile.gender ?? null,
    height_cm: profile.height_cm ?? null,
    weight_kg: profile.weight_kg ?? null,
    eye_color: profile.eye_color ?? null,
    hair_color: profile.hair_color ?? null,
    skin_tone: profile.skin_tone ?? null,

    primary_language: profile.primary_language ?? null,
    secondary_language: profile.secondary_language ?? null,
    nationality: profile.nationality ?? null,
    province: profile.province ?? null,
    city: profile.city ?? null,
    religion: profile.religion ?? null,

    additional_notes: profile.additional_notes ?? null,

    is_premium: isPremium,
  };

  return <PublicPageClient profile={mappedProfile} />;
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "#F8FAFC",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
};