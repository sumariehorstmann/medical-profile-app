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
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Important</h2>
            <p style={styles.paragraph}>
              RROI is a digital medical information platform. If you are dealing
              with an emergency, contact your local emergency services
              immediately.
            </p>
            <p style={{ ...styles.paragraph, marginTop: 12 }}>
              Do not use this page to request urgent emergency or medical
              assistance.
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
    lineHeight: 1.1,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    lineHeight: 1.6,
    color: MUTED,
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
    margin: "0 0 12px",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT,
  },
  infoGrid: {
    display: "grid",
    gap: 16,
  },
  infoItem: {
    display: "grid",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 800,
    color: TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  link: {
    fontSize: 16,
    fontWeight: 700,
    color: BRAND_GREEN,
    textDecoration: "none",
    wordBreak: "break-word",
  },
  paragraph: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
};