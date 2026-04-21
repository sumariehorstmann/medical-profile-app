"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          {/* Logo Header */}
          <PageHeader />

          {/* Title */}
          <div style={styles.topBlock}>
            <h1 style={styles.title}>Privacy Policy</h1>
            <p style={styles.subtitle}>
              Your privacy is important to us. This policy explains how RROI
              collects, uses, and protects your information.
            </p>
          </div>

          {/* Sections */}

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>1. Responsible Party</h2>
  <p style={styles.paragraph}>
    RROI is operated by Rooi Veer (Pty) Ltd, South Africa. We are responsible
    for the collection, use, and protection of your personal information in
    accordance with applicable data protection laws, including the Protection
    of Personal Information Act (POPIA).
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
  <p style={styles.paragraph}>
    We collect personal and medical information that you voluntarily provide
    when creating and managing your profile. This may include your name,
    emergency contact details, and health-related information such as allergies,
    conditions, and medications.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>3. Special Personal Information</h2>
  <p style={styles.paragraph}>
    RROI processes health and medical data, which is classified as special
    personal information under POPIA. This information is processed only with
    your explicit consent and for the purpose of providing emergency access to
    critical information.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>4. How We Use Your Information</h2>
  <p style={styles.paragraph}>
    Your information is used to create and display your emergency profile when
    your QR code is scanned. This enables first responders and others to access
    important information quickly in an emergency.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>5. Data Sharing and Visibility</h2>
  <p style={styles.paragraph}>
    Information stored on your profile may be accessible to anyone who scans
    your QR code. You control what information is visible based on your
    subscription level and profile settings.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>6. Data Security</h2>
  <p style={styles.paragraph}>
    We implement reasonable technical and organisational safeguards to protect
    your personal information against unauthorised access, loss, or misuse.
    However, no system can guarantee complete security, and use of the platform
    is at your own risk.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>7. Data Retention</h2>
  <p style={styles.paragraph}>
    Your information is stored for as long as your account remains active. You
    may update or delete your profile at any time. If your subscription is
    cancelled, your profile remains but reverts to limited public visibility.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>8. Your Rights</h2>
  <p style={styles.paragraph}>
    In terms of POPIA, you have the right to access, correct, or delete your
    personal information, and to object to certain types of processing. You may
    exercise these rights by contacting us.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>9. Complaints</h2>
  <p style={styles.paragraph}>
    If you believe your personal information has been processed unlawfully, you
    may lodge a complaint with the Information Regulator of South Africa.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>10. Contact</h2>
  <p style={styles.paragraph}>
    For any questions regarding this policy, please contact us at{" "}
    <a href="mailto:support@rroi.co.za" style={styles.link}>
      support@rroi.co.za
    </a>.
  </p>
</div>

          {/* Bottom Navigation */}
          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
    maxWidth: 650,
  },
  section: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
    marginBottom: 18,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT,
  },
  paragraph: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  link: {
    color: "#157A55",
    fontWeight: 700,
    textDecoration: "none",
  },
};