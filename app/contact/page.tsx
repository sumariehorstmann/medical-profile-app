"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

export default function ContactPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Contact Us</h1>
            <p style={styles.subtitle}>
              Get in touch with the RROI team for support with your account,
              profile, subscription, or general questions.
            </p>
          </div>

          <div style={styles.section}>
  <h2 style={styles.sectionTitle}>Support</h2>

  <div style={styles.infoGrid}>
    <div style={styles.infoItem}>
      <span style={styles.label}>Company</span>
      <span style={styles.paragraph}>RROI (Pty) Ltd</span>
    </div>

    <div style={styles.infoItem}>
      <span style={styles.label}>Country</span>
      <span style={styles.paragraph}>South Africa</span>
    </div>

    <div style={styles.infoItem}>
      <span style={styles.label}>Email</span>
      <a href="mailto:support@rroi.co.za" style={styles.link}>
        support@rroi.co.za
      </a>
    </div>

    <div style={styles.infoItem}>
      <span style={styles.label}>Website</span>
      <a
        href="https://www.rroi.co.za"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        www.rroi.co.za
      </a>
    </div>

    <div style={styles.infoItem}>
      <span style={styles.label}>Business Hours</span>
      <span style={styles.paragraph}>Monday to Friday, 09:00 – 17:00 SAST</span>
    </div>
  </div>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>Privacy & Data Requests</h2>
  <p style={styles.paragraph}>
  For privacy, account deletion, data correction, access to your personal
  information, or other data-protection requests, please contact us at{" "}
  <a href="mailto:support@rroi.co.za" style={styles.link}>
    support@rroi.co.za
  </a>
  .
</p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>Important</h2>
  <p style={styles.paragraph}>
  RROI is an emergency-information storage and retrieval platform. It is not a
  medical service, healthcare provider, ambulance service, emergency response
  service, or emergency dispatch service. In an emergency, contact the
  appropriate local emergency services immediately.
</p>
  <p style={{ ...styles.paragraph, marginTop: 12 }}>
    Do not use this page to request urgent emergency or medical assistance.
  </p>
</div>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: PAGE_BG,
    padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 16px) 56px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: 900,
    minWidth: 0,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: "clamp(16px, 4vw, 28px)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  topBlock: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: 24,
    textAlign: "center",
  },

  title: {
    margin: 0,
    maxWidth: "100%",
    fontSize: "clamp(30px, 6vw, 34px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  subtitle: {
    margin: "12px auto 0",
    width: "100%",
    maxWidth: 650,
    fontSize: "clamp(15px, 2.5vw, 16px)",
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
  },

  section: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "clamp(16px, 3vw, 20px)",
    background: "#FFFFFF",
    marginBottom: 18,
  },

  sectionTitle: {
    margin: "0 0 12px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 20px)",
    lineHeight: 1.3,
    fontWeight: 800,
    color: TEXT,
    overflowWrap: "break-word",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: 16,
    width: "100%",
  },

  infoItem: {
    minWidth: 0,
    display: "grid",
    gap: 6,
    padding: 14,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    background: "#F8FAFC",
    boxSizing: "border-box",
  },

  label: {
    maxWidth: "100%",
    fontSize: 13,
    lineHeight: 1.4,
    fontWeight: 800,
    color: TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.2,
    overflowWrap: "break-word",
  },

  link: {
    display: "inline-block",
    maxWidth: "100%",
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
    color: BRAND_GREEN,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    overflowWrap: "anywhere",
  },

  paragraph: {
    margin: 0,
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
    wordBreak: "normal",
  },
};
