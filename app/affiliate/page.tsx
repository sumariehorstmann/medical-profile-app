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
              Share RROI and earn commission when new users purchase the Premium Full Kit using your approved affiliate code.
            </p>
          </div>

          <div style={styles.notice}>
  Affiliate applications are only available from inside an active Premium profile. The RROI Affiliate Program currently operates on an invitation-only basis. Submission of an application does not guarantee approval.
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
  Affiliate discounts apply only to the RROI Premium Full Kit (R499), which includes two physical QR products.
</p>

<p style={styles.paragraph}>
  Affiliate codes are not valid for Premium Visibility Only subscriptions (R99), renewals, store purchases, or any other products unless expressly stated by RROI.
</p>
            <p style={styles.paragraph}>
              Normal Premium price: <strong>R499</strong>
              <br />
              Affiliate code discount: <strong>R30</strong>
              <br />
              User pays: <strong>R469</strong>
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Affiliate commission</h2>
            <p style={styles.paragraph}>
  Affiliates earn R30 commission only when a customer purchases the Premium Full Kit using their approved affiliate code.
</p>
            <p style={styles.paragraph}>
              Commission per qualifying Premium Full Kit purchase:{" "}
              <strong>R30</strong>.
            </p>
          </div>
         <div style={styles.section}>
  <h2 style={styles.sectionTitle}>Payouts</h2>
  <p style={styles.paragraph}>
    Affiliate payouts are made quarterly by EFT, subject to verification,
    qualifying referrals, and a minimum payout threshold of R500.
  </p>
  <p style={styles.paragraph}>
    Applications, approval, commissions, discounts, and payouts remain subject
    to the full RROI Affiliate Terms.
  </p>
  <Link href="/affiliate/terms" style={styles.link}>
    View Affiliate Terms
  </Link>
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
  link: {
  color: BRAND_GREEN,
  fontWeight: 800,
  textDecoration: "none",
},
};