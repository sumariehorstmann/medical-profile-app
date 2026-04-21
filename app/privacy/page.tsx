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
            <h2 style={styles.sectionTitle}>Information We Collect</h2>
            <p style={styles.paragraph}>
              RROI collects personal and medical information that you voluntarily
              provide when creating and managing your profile. This may include
              your name, emergency contact details, and medical information.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How We Use Your Information</h2>
            <p style={styles.paragraph}>
              Your information is used to display your emergency profile when
              your QR code is scanned. This enables first responders and others
              to access critical information quickly in an emergency.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Data Security</h2>
            <p style={styles.paragraph}>
              We take appropriate measures to protect your data. However, no
              system is completely secure, and you use the platform at your own
              risk.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>User Control</h2>
            <p style={styles.paragraph}>
              You can update or delete your profile at any time. If your
              subscription is cancelled, your profile remains but reverts to the
              free visibility level.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact</h2>
            <p style={styles.paragraph}>
              If you have any questions regarding this policy, please contact us
              at{" "}
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