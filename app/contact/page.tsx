"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function ContactPage() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
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
            <p style={{ ...styles.paragraph, marginBottom: 0 }}>
              Do not use this page to request urgent emergency or medical
              assistance.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <Link href="/privacy-policy" style={styles.footerLink}>
              Privacy Policy
            </Link>
            <span style={styles.dot}>•</span>
            <Link href="/terms" style={styles.footerLink}>
              Terms &amp; Conditions
            </Link>
          </div>

          <div style={styles.backWrap}>
            <button type="button" onClick={handleBack} style={styles.backBtn}>
              ← Back
            </button>
          </div>
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
  },
  title: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px 0 0",
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
    margin: "0 0 14px",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  footerLinks: {
    marginTop: 6,
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  footerLink: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 700,
    fontSize: 14,
  },
  dot: {
    color: "#94A3B8",
    fontSize: 14,
  },
  backWrap: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
  },
  backBtn: {
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    fontWeight: 800,
    fontSize: 14,
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },
};