import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <main
      style={{
        maxWidth: 860,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <PageHeader />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 20,
          padding: "28px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            margin: "0 0 10px",
            color: "#111111",
          }}
        >
          Contact
        </h1>

        <p
          style={{
            color: "#4B5563",
            margin: "0 0 24px",
            fontSize: 17,
          }}
        >
          Rapid Response Online Information (RROI)
        </p>

        <div
          style={{
            background: "#F3F4F6",
            borderRadius: 14,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <strong style={{ display: "block", marginBottom: 6 }}>
            Emergency notice
          </strong>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            RROI does not provide emergency services. If you or someone else is
            in immediate danger, contact local emergency services immediately.
          </p>
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            margin: "0 0 10px",
            color: "#111111",
          }}
        >
          How to reach us
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            fontSize: 17,
            lineHeight: 1.7,
            color: "#111111",
          }}
        >
          For general questions, account issues, subscription queries, or
          requests related to your information (access, correction, deletion),
          please contact us using one of the options below.
        </p>

        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <Row
            label="Email"
            value={
              <a
                href="mailto:rapidresponseonlineinfo@gmail.com"
                style={{
                  color: "#157A55",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                rapidresponseonlineinfo@gmail.com
              </a>
            }
          />

          <Row
            label="WhatsApp"
            value={
              <a
                href="https://wa.me/27687120315"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#157A55",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                +27 68 712 0315
              </a>
            }
          />

          <Row
            label="Response time"
            value={
              <span style={{ color: "#111111", fontWeight: 700 }}>
                Typically within 1–3 business days
              </span>
            }
            noBorder
          />
        </div>

        <p
          style={{
            marginTop: 20,
            fontSize: 14,
            color: "#6B7280",
            lineHeight: 1.6,
          }}
        >
          Please do not send sensitive medical information via email or WhatsApp
          unless you are comfortable doing so. You can update your emergency
          profile directly inside your account.
        </p>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontWeight: 900,
              color: "#FFFFFF",
              background: "#157A55",
              padding: "12px 18px",
              borderRadius: 12,
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  noBorder = false,
}: {
  label: string;
  value: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        padding: "16px 14px",
        borderBottom: noBorder ? "none" : "1px solid #E5E7EB",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontWeight: 800, color: "#111111" }}>{label}</span>
      <div style={{ textAlign: "right" }}>{value}</div>
    </div>
    
  );
  <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
  <Link
    href="/"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      fontWeight: 900,
      color: "#FFFFFF",
      background: "#157A55",
      padding: "14px 22px",
      borderRadius: 16,
      fontSize: 16,
    }}
  >
    ← Back to Home
  </Link>
</div>
}