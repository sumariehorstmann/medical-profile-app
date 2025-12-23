import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return {
    robots: { index: false, follow: false },
    title: "Emergency Information",
  };
}

type Contact = { name: string; phone: string } | null;

type PublicProfile = {
  first_name: string;
  last_name: string;
  age: number;
  emergency_contact: Contact;
  is_paid: boolean;
  medical?: {
    allergies?: string | null;
    conditions?: string | null;
    medications?: string | null;
    blood_type?: string | null;
    gender?: string | null;
    physical_description?: string | null;
    special_notes?: string | null;
    medical_aid_provider?: string | null;
    medical_aid_policy_number?: string | null;
    primary_language?: string | null;
    religion?: string | null;
    additional_notes?: string | null;
    emergency_contact_2?: Contact;
  };
};

async function getPublicProfile(token: string): Promise<PublicProfile> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/public-profile?token=${token}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 13, opacity: 0.75 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.25 }}>
        {value}
      </div>
    </div>
  );
}

// Next 16: params is a Promise
export default async function PublicPage(props: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await props.params;

  const data = await getPublicProfile(publicId);

  return (
    <main
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: 16,
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      }}
    >
      <h1 style={{ fontSize: 26, margin: "6px 0 16px" }}>
        Emergency Information
      </h1>

      {/* SECTION 1: Name + Primary Contact */}
      <section
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800 }}>
          {data.first_name} {data.last_name}
        </div>
        <div style={{ marginTop: 6, fontSize: 16 }}>Age: {data.age}</div>

        <div style={{ height: 14 }} />

        <div style={{ fontSize: 18, fontWeight: 800 }}>Emergency Contact</div>
        {data.emergency_contact ? (
          <>
            <Row label="Name" value={data.emergency_contact.name} />
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, opacity: 0.75 }}>Phone</div>
              <a
                href={`tel:${data.emergency_contact.phone}`}
                style={{
                  display: "inline-block",
                  marginTop: 2,
                  fontSize: 20,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                {data.emergency_contact.phone}
              </a>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 8, opacity: 0.75 }}>Not provided</div>
        )}
      </section>

      {/* SECTION 2 & 3: Paid medical info */}
      {data.is_paid && data.medical && (
        <section
          style={{
            marginTop: 14,
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            Important Medical Information
          </div>

          <Row label="Allergies" value={data.medical.allergies ?? undefined} />
          <Row
            label="Conditions"
            value={data.medical.conditions ?? undefined}
          />
          <Row
            label="Medications"
            value={data.medical.medications ?? undefined}
          />

          {data.medical.emergency_contact_2 && (
            <>
              <div style={{ height: 14 }} />
              <div style={{ fontSize: 18, fontWeight: 800 }}>
                Additional Contact
              </div>
              <Row
                label="Name"
                value={data.medical.emergency_contact_2.name}
              />
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 13, opacity: 0.75 }}>Phone</div>
                <a
                  href={`tel:${data.medical.emergency_contact_2.phone}`}
                  style={{
                    display: "inline-block",
                    marginTop: 2,
                    fontSize: 20,
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  {data.medical.emergency_contact_2.phone}
                </a>
              </div>
            </>
          )}

          <div style={{ height: 14 }} />

          <Row
            label="Blood type"
            value={data.medical.blood_type ?? undefined}
          />
          <Row label="Gender" value={data.medical.gender ?? undefined} />
          <Row
            label="Physical description"
            value={data.medical.physical_description ?? undefined}
          />
          <Row
            label="Special notes"
            value={data.medical.special_notes ?? undefined}
          />
          <Row
            label="Medical aid provider"
            value={data.medical.medical_aid_provider ?? undefined}
          />
          <Row
            label="Medical aid policy number"
            value={data.medical.medical_aid_policy_number ?? undefined}
          />
          <Row
            label="Primary language"
            value={data.medical.primary_language ?? undefined}
          />
          <Row
            label="Religion"
            value={data.medical.religion ?? undefined}
          />
          <Row
            label="Additional notes"
            value={data.medical.additional_notes ?? undefined}
          />
        </section>
      )}

      <p
        style={{
          marginTop: 14,
          fontSize: 12,
          opacity: 0.75,
          lineHeight: 1.4,
        }}
      >
        Information on this page is provided by the individual for emergency
        context. Medical decisions remain the responsibility of qualified
        professionals.
      </p>
    </main>
  );
}
