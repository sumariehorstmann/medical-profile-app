import Link from "next/link";
import Image from "next/image";

export default function AffiliateTermsPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={96} height={96} priority />
          <h1 style={styles.h1}>Affiliate Terms</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Overview</h2>
          <p style={styles.p}>
            These Affiliate Terms apply to all participants in the RROI Affiliate Program.
            By applying to become an affiliate, or by participating as an approved affiliate,
            you agree to these terms in addition to RROI’s Terms of Service and Privacy Policy.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Eligibility</h2>
          <ul style={styles.ul}>
            <li>Affiliates must have an active, paid RROI subscription.</li>
            <li>Applications are reviewed manually. Approval is not guaranteed.</li>
            <li>RROI may request additional information for verification before approval or payout.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Referral Codes & Links</h2>
          <ul style={styles.ul}>
            <li>Approved affiliates receive a unique referral code and share link.</li>
            <li>Referral codes must not be altered, sold, or misrepresented.</li>
            <li>RROI may deactivate a code if misuse or abuse is suspected.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Discounts & Commission</h2>
          <ul style={styles.ul}>
            <li>Discount and commission rates are determined by RROI and may change over time.</li>
            <li>Commission is calculated on the amount actually paid by the customer (after discounts).</li>
            <li>Commission applies to first-year subscriptions only (no commission on renewals).</li>
            <li>No self-referrals: you cannot earn commission on your own subscription or renewals.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Verification Period & Reversals</h2>
          <ul style={styles.ul}>
            <li>Commission is marked as pending for a verification period (typically 14 days).</li>
            <li>If a subscription is refunded, reversed, charged back, or cancelled during the verification period, commission may be reversed.</li>
            <li>RROI’s records are final for referral attribution and commission calculations.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Payouts</h2>
          <ul style={styles.ul}>
            <li>Payouts are made quarterly via EFT, subject to verification and minimum payout thresholds.</li>
            <li>Banking details will be requested after approval and before the first payout.</li>
            <li>If an affiliate does not have an active subscription at payout time, payouts may be paused until the subscription is active again.</li>
          </ul>
          <p style={styles.p}>
            RROI does not guarantee any level of earnings. Earnings depend on successful, paid subscriptions
            and ongoing compliance with these terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Marketing Rules</h2>
          <ul style={styles.ul}>
            <li>Affiliates must not make misleading claims, including medical or emergency outcome claims.</li>
            <li>Affiliates must not imply that RROI provides medical advice, diagnosis, treatment, or emergency response services.</li>
            <li>Affiliates must comply with applicable laws, advertising standards, and platform policies.</li>
            <li>Spam, harassment, or deceptive marketing is prohibited.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Suspension & Termination</h2>
          <p style={styles.p}>
            RROI may suspend or terminate affiliate access at any time for suspected misuse, fraud, policy violations,
            or conduct that may harm RROI’s reputation. Repeated violations may result in permanent removal.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>9. Changes</h2>
          <p style={styles.p}>
            RROI may update these Affiliate Terms from time to time. Continued participation in the affiliate program
            constitutes acceptance of updated terms.
          </p>
        </section>

        <div style={styles.links}>
          <Link href="/affiliate/apply" style={styles.link}>
            ← Back to application
          </Link>
          <Link href="/affiliate" style={styles.linkMuted}>
            Affiliate program
          </Link>
          <Link href="/" style={styles.linkMuted}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    background: "#FFFFFF",
    color: "#0F172A",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 24,
    background: "#FFFFFF",
  },
  brand: {
    textAlign: "center",
    marginBottom: 18,
  },
  h1: {
    fontSize: 28,
    fontWeight: 900,
    margin: "8px 0 4px",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 700,
    opacity: 0.85,
    margin: 0,
  },
  section: {
    marginBottom: 18,
  },
  h2: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 6,
  },
  p: {
    margin: "0 0 8px",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  ul: {
    margin: "6px 0 0 18px",
    lineHeight: 1.7,
    opacity: 0.95,
  },
  links: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 16,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 800,
  },
};
