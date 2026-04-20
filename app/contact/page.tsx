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
      {/* ✅ Consistent header */}
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
            marginBottom: 10,
          }}
        >
          Contact
        </h1>

        <p style={{ color: "#4B5563", marginBottom: 24 }}>
          Rapid Response Online Information (RROI)
        </p>

        {/* Emergency Notice */}
        <div
          style={{
            background: "#F3F4F6",
            borderRadius: 14,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <strong>Emergency notice</strong>
          <p style={{ marginTop: 6 }}>
            RROI does not provide emergency services. If you or someone else is
            in immediate danger, contact local emergency services immediately.
          </p>
        </div>

        {/* Contact Info */}
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
          How to reach us
        </h2>

        <p style={{ marginBottom: 20 }}>
          For general questions, account issues, subscription queries, or
          requests related to your information (access, correction, deletion),
          please contact us using one of the options below.
        </p>

        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <Row label="Email" value="rapidresponseonlineinfo@gmail.com" />
          <Row label="WhatsApp" value="+27 68 712 0315" />
          <Row label="Response time" value="Typically within 1–3 business days" />
        </div>

        <p style={{ marginTop: 20, fontSize: 14, color: "#6B7280" }}>
          Please do not send sensitive medical information via email or WhatsApp
          unless you are comfortable doing so. You can update your emergency
          profile directly inside your account.
        </p>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <span style={{ fontWeight: 700 }}>{label}</span>
      <span style={{ color: "#157A55", fontWeight: 700 }}>{value}</span>
    </div>
  );
}