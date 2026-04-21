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
            <h1 style={styles.title}>Affiliate Program</h1>
            <p style={styles.subtitle}>
              Join the RROI affiliate program and earn commission on qualifying
              Premium upgrades made through your approved affiliate code.
            </p>
          </div>

          <div style={styles.notice}>
            <p style={styles.noticeText}>
              The RROI affiliate program is available only to users with an
              active Premium subscription.
            </p>
            <p style={{ ...styles.noticeText, marginBottom: 0 }}>
              Approval is not automatic. All applications are reviewed before an
              affiliate account is activated.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What the program is</h2>
            <p style={styles.paragraph}>
              Approved affiliates receive a unique referral code. When a new
              customer uses that code to complete a qualifying Premium upgrade,
              the customer receives the applicable discount and the affiliate may
              earn commission, subject to the affiliate terms and payout rules.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How to apply</h2>
            <ol style={styles.orderedList}>
              <li>Create or log in to your RROI account.</li>
              <li>Upgrade to Premium if your profile is still on the free tier.</li>
              <li>Go to your profile page.</li>
              <li>Select “Apply to Become an Affiliate”.</li>
              <li>Complete and submit the affiliate application form.</li>
              <li>Wait for review and approval.</li>
            </ol>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Important rules</h2>
            <ul style={styles.unorderedList}>
              <li>You must have an active Premium subscription to apply.</li>
              <li>Approval is subject to review and may be declined.</li>
              <li>No self-referrals are allowed.</li>
              <li>Commission applies only to qualifying paid upgrades.</li>
              <li>No commission is paid on renewals unless expressly stated.</li>
              <li>
                RROI may suspend or remove affiliate access for misuse,
                misleading promotion, or breach of the affiliate terms.
              </li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Before you apply</h2>
            <p style={styles.paragraph}>
              Please read the affiliate terms carefully before submitting your
              application. Those terms govern approval, commissions, conduct,
              suspension, and other important conditions of the program.
            </p>
          </div>

          <div style={styles.ctaWrap}>
            <Link href="/login" style={styles.primaryBtn}>
              Log in or Sign up
            </Link>

            <Link href="/affiliate/terms" style={styles.secondaryLink}>
              View Affiliate Terms
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