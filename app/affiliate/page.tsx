"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function AffiliatePage() {
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
            <h1 style={styles.title}>Affiliate Program</h1>
            <p style={styles.subtitle}>
              The RROI affiliate program is available only to users with an
              active Premium subscription.
            </p>
          </div>

          <div style={styles.notice}>
            <p style={styles.noticeText}>
              To apply, you must first log in or sign up, then upgrade to
              Premium if needed.
            </p>
            <p style={{ ...styles.noticeText, marginBottom: 0 }}>
              Once you have an active Premium subscription, you can apply to
              become an affiliate from your profile page.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What it is</h2>
            <p style={styles.paragraph}>
              Approved affiliates receive a unique referral code. When someone
              subscribes using that code, they receive a discount and the
              affiliate earns commission on successful paid Premium signups,
              subject to the affiliate terms.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How it works</h2>
            <ol style={styles.orderedList}>
              <li>Log in or sign up for an RROI account.</li>
              <li>Upgrade to Premium if your profile is still on the free tier.</li>
              <li>Go to your profile page.</li>
              <li>Click “Apply to Become an Affiliate” from your Premium profile.</li>
              <li>Complete the application form and submit your details.</li>
            </ol>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Key rules</h2>
            <ul style={styles.unorderedList}>
              <li>You must have an active Premium subscription to apply.</li>
              <li>No self-referrals.</li>
              <li>Commission applies to first-year Premium signups only.</li>
              <li>No commission is paid on renewals.</li>
              <li>
                RROI may suspend affiliate access for misuse or misleading
                promotion.
              </li>
            </ul>
          </div>

          <div style={styles.ctaWrap}>
            <Link href="/login" style={styles.primaryBtn}>
              Log in or Sign up
            </Link>
          </div>

          <div style={styles.footerLinks}>
            <Link href="/contact" style={styles.footerLink}>
              Contact
            </Link>
            <span style={styles.dot}>•</span>
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
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
  notice: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#F8FAFC",
    marginBottom: 18,
  },
  noticeText: {
    margin: "0 0 12px",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
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
  orderedList: {
    margin: "6px 0 0 22px",
    padding: 0,
    fontSize: 15,
    lineHeight: 1.9,
    color: MUTED,
  },
  unorderedList: {
    margin: "6px 0 0 18px",
    padding: 0,
    fontSize: 15,
    lineHeight: 1.9,
    color: MUTED,
  },
  ctaWrap: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
  },
  primaryBtn: {
    display: "inline-block",
    minWidth: 260,
    textAlign: "center",
    padding: "12px 18px",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
  },
  footerLinks: {
    marginTop: 20,
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