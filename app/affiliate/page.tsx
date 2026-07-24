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
  Share RROI and earn commission when new users purchase the RROI Premium Kit
  Bundle using your approved affiliate code.
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
    Affiliate discounts apply only to the RROI Premium Kit Bundle (R499), which
    includes one year of Premium access and three physical QR products.
  </p>

  <p style={styles.paragraph}>
    Affiliate codes are not valid for Premium Subscription Only purchases
    (R129), renewals, online store purchases, or any other products unless
    expressly stated by RROI.
  </p>

  <p style={styles.paragraph}>
    Normal Premium Kit Bundle price: <strong>R499</strong>
    <br />
    Affiliate code discount: <strong>R30</strong>
    <br />
    Customer pays: <strong>R469</strong>
  </p>
</div>

          <div style={styles.section}>
  <h2 style={styles.sectionTitle}>Affiliate commission</h2>

  <p style={styles.paragraph}>
    Affiliates earn R30 commission only when a customer successfully purchases
    the RROI Premium Kit Bundle using their approved affiliate code.
  </p>

  <p style={styles.paragraph}>
    Commission per qualifying Premium Kit Bundle purchase:{" "}
    <strong>R30</strong>.
  </p>
</div>
         <div style={styles.section}>
  <h2 style={styles.sectionTitle}>Payouts</h2>
  <p style={styles.paragraph}>
    Affiliate payouts are made quarterly by EFT, subject to verification,
    qualifying referrals, and a minimum payout threshold of R600.
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
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
    fontSize: "clamp(28px, 6vw, 34px)",
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

  notice: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid #A7F3D0",
    borderRadius: 18,
    padding: "clamp(16px, 3vw, 18px)",
    background: "#ECFDF5",
    marginBottom: 18,
    color: "#065F46",
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1.65,
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
    margin: "0 0 10px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 20px)",
    lineHeight: 1.3,
    fontWeight: 800,
    color: TEXT,
    overflowWrap: "break-word",
  },

  paragraph: {
    margin: "0 0 10px",
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
    wordBreak: "normal",
  },

  orderedList: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "8px 0 0",
    paddingLeft: 24,
    fontSize: 15,
    lineHeight: 1.8,
    color: MUTED,
    overflowWrap: "break-word",
  },

  ctaWrap: {
    width: "100%",
    maxWidth: "100%",
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    boxSizing: "border-box",
  },

  primaryBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 360,
    minHeight: 48,
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "12px 18px",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.4,
    overflowWrap: "break-word",
  },

  secondaryLink: {
    display: "inline-block",
    maxWidth: "100%",
    textAlign: "center",
    textDecoration: "underline",
    textUnderlineOffset: 2,
    color: BRAND_GREEN,
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1.5,
    overflowWrap: "break-word",
  },

  link: {
    display: "inline-block",
    maxWidth: "100%",
    color: BRAND_GREEN,
    fontWeight: 800,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    lineHeight: 1.5,
    overflowWrap: "anywhere",
  },
};
