import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";

type PublicProfile = {
  public_id: string;
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

export default async function EmergencyProfilePage(props: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await props.params;

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "public_id,full_name,date_of_birth,blood_type,allergies,conditions,medications,emergency_contact_name,emergency_contact_phone,notes"
    )
    .eq("public_id", publicId)
    .single();

  if (error || !data) {
    return (
      <main style={wrap}>
        <h1 style={h1}>Emergency Medical Profile</h1>
        <p style={{ color: "#444" }}>Not found (or not public). Check the link / policy.</p>
        <div style={{ marginTop: 16 }}>
          <code style={code}>publicId: {publicId}</code>
        </div>
      </main>
    );
  }

  const p = data as PublicProfile;

  const hasPhone = !!p.emergency_contact_phone?.trim();
  const phoneHref = hasPhone
    ? `tel:${p.emergency_contact_phone!.replace(/\s+/g, "")}`
    : null;

  return (
    <main style={wrap}>
      {/* Mobile-first sticky header */}
      <div style={stickyHeader}>
        <div>
          <div style={{ fontSize: 12, color: "#666" }}>Emergency Medical Profile</div>
          <div style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>
            {p.full_name ?? "—"}
          </div>
        </div>

        {phoneHref ? (
          <a href={phoneHref} style={callBtn}>
            Call ICE
          </a>
        ) : (
          <span style={callBtnDisabled}>No ICE phone</span>
        )}
      </div>

      <div style={{ height: 10 }} />

      {/* “Card” blocks, big tap targets */}
      <Section title="Basics">
        <Row label="Full name" value={p.full_name} />
        <Row label="Date of birth" value={p.date_of_birth} />
        <Row label="Blood type" value={p.blood_type} />
      </Section>

      <Section title="Allergies">
        <BigText value={p.allergies} fallback="—" />
      </Section>

      <Section title="Conditions">
        <BigText value={p.conditions} fallback="—" />
      </Section>

      <Section title="Medications">
        <BigText value={p.medications} fallback="—" />
      </Section>

      <Section title="Emergency Contact">
        <Row label="Name" value={p.emergency_contact_name} />
        <Row label="Phone" value={p.emergency_contact_phone} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {phoneHref ? (
            <a href={phoneHref} style={btnDark}>
              Tap to call
            </a>
          ) : null}

          {p.emergency_contact_phone ? (
            <button
              style={btnLight}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(p.emergency_contact_phone || "");
                } catch {}
              }}
            >
              Copy phone
            </button>
          ) : null}
        </div>
      </Section>

      <Section title="Notes">
        <BigText value={p.notes} fallback="—" />
      </Section>

      <div style={{ marginTop: 18, color: "#666", fontSize: 12 }}>
        If you are the owner, edit your info in{" "}
        <Link href="/profile" style={{ color: "#111", fontWeight: 700 }}>
          /profile
        </Link>
        .
      </div>

      <div style={{ marginTop: 10, color: "#888", fontSize: 12 }}>
        Reference ID: {p.public_id}
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={section}>
      <div style={sectionTitle}>{title}</div>
      <div>{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div style={row}>
      <div style={rowLabel}>{label}</div>
      <div style={rowValue}>{value?.trim() ? value : "—"}</div>
    </div>
  );
}

function BigText({ value, fallback }: { value: string | null; fallback: string }) {
  const v = value?.trim();
  return <div style={bigText}>{v ? v : fallback}</div>;
}

const wrap: React.CSSProperties = {
  padding: 16,
  maxWidth: 720,
  margin: "0 auto",
};

const h1: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 900,
  margin: "0 0 10px 0",
};

const code: React.CSSProperties = {
  background: "#f3f3f3",
  padding: "6px 8px",
  borderRadius: 8,
};

const stickyHeader: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(6px)",
  borderBottom: "1px solid #eee",
  padding: "12px 0",
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
};

const callBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#111",
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  border: "1px solid #111",
  whiteSpace: "nowrap",
};

const callBtnDisabled: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#f3f3f3",
  color: "#777",
  fontWeight: 800,
  border: "1px solid #e5e5e5",
  whiteSpace: "nowrap",
};

const section: React.CSSProperties = {
  marginTop: 12,
  padding: 14,
  border: "1px solid #eee",
  borderRadius: 14,
  background: "white",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "#111",
  marginBottom: 10,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 0",
  borderTop: "1px solid #f0f0f0",
};

const rowLabel: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  color: "#333",
};

const rowValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "#111",
  textAlign: "right",
  wordBreak: "break-word",
  maxWidth: 380,
};

const bigText: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#111",
  lineHeight: 1.35,
  whiteSpace: "pre-wrap",
};

const btnDark: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #111",
  background: "#111",
  color: "white",
  cursor: "pointer",
  borderRadius: 12,
  fontWeight: 800,
};

const btnLight: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #ddd",
  background: "#f5f5f5",
  cursor: "pointer",
  borderRadius: 12,
  fontWeight: 800,
};
