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
              Share RROI and earn commission when users upgrade to Premium.
              This page gives a basic overview of how the affiliate program
              works.
            </p>
          </div>

          <div style={styles.notice}>
            <p style={styles.noticeText}>
              Full affiliate rules, payout terms, and program conditions are
              provided during the application process.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>How it works</h2>
            <ul style={styles.unorderedList}>
              <li>You apply to become an RROI affiliate.</li>
              <li>Approved affiliates receive a unique affiliate code.</li>
              <li>You share RROI with your audience or network.</li>
              <li>You earn commission on qualifying Premium upgrades.</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Who can apply</h2>
            <p style={styles.paragraph}>
              The affiliate program is available to active RROI Premium
              subscribers. Applications are reviewed manually before approval.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Commission and payouts</h2>
            <p style={styles.paragraph}>
              Approved affiliates can earn commission on qualifying Premium
              signups. Payouts are handled manually according to the affiliate
              payout rules.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Before you apply</h2>
            <p style={styles.paragraph}>
              You will receive the detailed affiliate terms and conditions when
              applying. Please read them carefully before submitting your
              application.
            </p>
          </div>

          <div style={styles.ctaWrap}>
            <Link href="/affiliate/apply" style={styles.primaryBtn}>
              Apply for the affiliate program
            </Link>

            <Link href="/affiliate/terms" style={styles.secondaryLink}>
              View affiliate terms
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
  },
  noticeText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#065F46",
    fontWeight: 700,
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