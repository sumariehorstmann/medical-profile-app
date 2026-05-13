"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

export default function AffiliatePage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>RROI Affiliate Program</h1>
            <p style={styles.subtitle}>
              Share RROI and earn commission when new users upgrade to Premium
              using your approved affiliate code.
            </p>
          </div>

          <div style={styles.notice}>
  Affiliate applications are only available from inside an active
  Premium profile. The RROI Affiliate Program is currently operating on
  an invitation-only basis. Premium members may still apply through
  their dashboard for affiliate consideration.
</div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How to apply</h2>
            <ol style={styles.orderedList}>
              <li>Sign up for a free RROI account.</li>
              <li>Upgrade your account to Premium.</li>
              <li>
                On your Premium profile, click “Apply to become an affiliate”.
              </li>
              <li>Complete and submit the affiliate application.</li>
              <li>
                RROI will review your application and approve or decline it.
              </li>
              <li>
                If approved, you will receive your unique affiliate code.
              </li>
            </ol>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Affiliate discount</h2>
            <p style={styles.paragraph}>
              New users who upgrade to Premium using your affiliate code receive
              a <strong>R30 discount</strong>.
            </p>
            <p style={styles.paragraph}>
              Normal Premium price: <strong>R399</strong>
              <br />
              Affiliate code discount: <strong>R30</strong>
              <br />
              User pays: <strong>R369</strong>
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Affiliate commission</h2>
            <p style={styles.paragraph}>
              Affiliates earn <strong>8% commission</strong> on the discounted
              Premium price of <strong>R369</strong>.
            </p>
            <p style={styles.paragraph}>
              Commission per qualifying Premium upgrade:{" "}
              <strong>R29.52</strong>.
            </p>
          </div>
         

          <div style={styles.ctaWrap}>
            <Link href="/login?mode=signup" style={styles.primaryBtn}>
              Sign up free
            </Link>

            <Link href="/login" style={styles.secondaryLink}>
              Log in to your account
            </Link>
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
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
  notice: {
    border: "1px solid #A7F3D0",
    borderRadius: 18,
    padding: 18,
    background: "#ECFDF5",
    marginBottom: 18,
    color: "#065F46",
    fontWeight: 800,
    lineHeight: 1.6,
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
    margin: "0 0 10px",
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
  ctaWrap: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
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
  secondaryLink: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 700,
    fontSize: 15,
  },
};