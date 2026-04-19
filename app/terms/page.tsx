import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "19 April 2026";

  return (
    <main
      style={{
        maxWidth: 860,
        margin: "40px auto",
        padding: "20px",
        color: "#111111",
        lineHeight: 1.65,
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
        <h1 style={title}>Terms & Conditions</h1>

        <p style={muted}>
          <strong>Last updated:</strong> {lastUpdated}
        </p>

        <h2 style={sectionTitle}>1. Introduction</h2>
        <p style={paragraph}>
          These Terms and Conditions govern your use of RROI (Pty) Ltd and its
          services. By accessing or using the platform, you agree to be bound
          by these terms.
        </p>

        <h2 style={sectionTitle}>2. Service Description</h2>
        <p style={paragraph}>
          RROI provides a QR-based emergency profile system that allows users
          to store personal, medical, and emergency information and make such
          information accessible when a QR code is scanned.
        </p>

        <h2 style={sectionTitle}>3. User Responsibility</h2>
        <ul style={listStyle}>
          <li>You are responsible for ensuring your information is accurate and up to date.</li>
          <li>You decide what information is stored and made publicly accessible.</li>
          <li>You are responsible for safeguarding access to your account.</li>
        </ul>

        <h2 style={sectionTitle}>4. Public QR Code Risk</h2>
        <p style={paragraph}>
          By using RROI, you acknowledge that your QR code is designed to be
          scanned by third parties in emergency situations. Any person who scans
          your QR code may access the information configured for public display.
        </p>
        <p style={paragraph}>
          RROI is not responsible for how third parties use or interpret
          information accessed through a scanned QR code.
        </p>

        <h2 style={sectionTitle}>5. No Medical Advice</h2>
        <p style={paragraph}>
          RROI does not provide medical advice. All information stored on the
          platform is user-provided and may not be accurate, complete, or current.
        </p>

        <h2 style={sectionTitle}>6. Emergency Use Disclaimer</h2>
        <p style={paragraph}>
          RROI is a support tool only and does not replace professional medical
          services, emergency responders, or official emergency systems. Users
          and third parties must always contact official emergency services in
          a medical emergency.
        </p>

        <h2 style={sectionTitle}>7. Limitation of Liability</h2>
        <p style={paragraph}>
          To the maximum extent permitted by law, RROI (Pty) Ltd shall not be
          liable for any direct, indirect, incidental, or consequential damages
          arising from:
        </p>
        <ul style={listStyle}>
          <li>Incorrect, incomplete, or outdated user information</li>
          <li>Failure to access or scan a QR code</li>
          <li>System downtime, delays, or technical issues</li>
          <li>Actions taken by third parties based on accessed information</li>
        </ul>

        <h2 style={sectionTitle}>8. Payments and Subscriptions</h2>
        <p style={paragraph}>
          Premium features require payment. Payments are processed via PayFast.
        </p>
        <ul style={listStyle}>
          <li>Initial upgrade includes a once-off payment for the Premium Kit.</li>
          <li>Annual subscription fees apply for continued premium access.</li>
          <li>Payments are non-refundable unless required by law.</li>
        </ul>

        <h2 style={sectionTitle}>9. Orders and Physical Products</h2>
        <p style={paragraph}>
          RROI may provide physical QR products as part of premium offerings.
        </p>
        <ul style={listStyle}>
          <li>Production begins after successful payment.</li>
          <li>Delivery timelines are estimates and may vary.</li>
          <li>RROI is not liable for courier delays once dispatched.</li>
        </ul>

        <h2 style={sectionTitle}>10. Account Termination</h2>
        <p style={paragraph}>
          You may delete your account at any time. Upon deletion, your profile
          will no longer be publicly accessible.
        </p>
        <p style={paragraph}>
          RROI reserves the right to suspend or terminate accounts for misuse,
          abuse, fraud, or violation of these terms.
        </p>

        <h2 style={sectionTitle}>11. Acceptable Use</h2>
        <ul style={listStyle}>
          <li>You may not use the platform for unlawful purposes.</li>
          <li>You may not upload false, misleading, or harmful information.</li>
          <li>You may not attempt to disrupt or compromise the platform.</li>
        </ul>

        <h2 style={sectionTitle}>12. Changes to Terms</h2>
        <p style={paragraph}>
          RROI may update these Terms at any time. Continued use of the platform
          after changes constitutes acceptance of the updated Terms.
        </p>

        <h2 style={sectionTitle}>13. Governing Law</h2>
        <p style={paragraph}>
          These Terms are governed by the laws of the Republic of South Africa.
        </p>

        <h2 style={sectionTitle}>14. Contact</h2>
        <p style={paragraph}>
          <strong>RROI (Pty) Ltd</strong>
          <br />
          Email: rapidresponseonlineinfo@gmail.com
        </p>

        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
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

const title: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.1,
  marginBottom: 10,
  fontWeight: 900,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 26,
  marginTop: 28,
  marginBottom: 10,
  fontWeight: 900,
};

const paragraph: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 17,
};

const listStyle: React.CSSProperties = {
  marginTop: 6,
  marginBottom: 14,
  paddingLeft: 24,
  fontSize: 17,
  lineHeight: 1.7,
};

const muted: React.CSSProperties = {
  marginBottom: 24,
  color: "#4B5563",
};