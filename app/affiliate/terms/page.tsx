"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function AffiliateTermsPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Affiliate Terms</h1>
            <p style={styles.subtitle}>
              These terms apply to participants in the RROI Affiliate Program.
              By participating, you agree to these terms in addition to the main
              RROI Terms and Privacy Policy.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Overview</h2>
            <p style={styles.paragraph}>
              These Affiliate Terms apply to participants in the RROI Affiliate
              Program. By participating in the program, you agree to these terms
              in addition to RROI’s Terms and Privacy Policy.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Who Can Apply</h2>
            <p style={styles.paragraph}>
              To apply to become an RROI affiliate, you must be logged in as an
              active Premium subscriber.
            </p>
            <p style={styles.paragraphSpaced}>
              If you already have a Premium subscription, please log in and go
              to your profile page to apply.
            </p>
            <p style={styles.paragraphSpaced}>
              If you have a free profile, please log in and upgrade to Premium
              first.
            </p>
            <p style={styles.paragraphSpaced}>
              If you do not yet have a profile, please sign up, log in, upgrade
              to Premium, and then apply to become an affiliate from your
              profile.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Affiliate Code</h2>
            <p style={styles.paragraph}>
              Once your affiliate account is created successfully, you will
              receive a unique affiliate code, which will also appear on your
              profile page.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Discount and Commission</h2>
            <p style={styles.paragraph}>
              Customers using your affiliate code receive a discount on the
              Premium upgrade. You will earn a commission on each successful
              payment made using your code.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Payouts</h2>
            <p style={styles.paragraph}>
              Commissions are paid out quarterly, provided the minimum payout
              threshold is reached. RROI reserves the right to adjust payout
              schedules if required.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Affiliate Responsibilities</h2>
            <ul style={styles.unorderedList}>
              <li>Promote RROI honestly and ethically.</li>
              <li>Do not provide misleading information.</li>
              <li>Do not spam or misuse marketing channels.</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Termination</h2>
            <p style={styles.paragraph}>
              RROI reserves the right to revoke affiliate access if these terms
              are violated or if misuse is detected.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Changes</h2>
            <p style={styles.paragraph}>
              These terms may be updated at any time. Continued participation
              implies acceptance of the updated terms.
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
    maxWidth: 680,
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
  paragraphSpaced: {
    margin: "12px 0 0",
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
};