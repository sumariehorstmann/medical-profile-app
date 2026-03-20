import Link from "next/link";
import Image from "next/image";

export default function AffiliateHomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={96} height={96} priority />
          <h1 style={styles.h1}>Affiliate Program</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <div style={styles.notice}>
          <strong>Important</strong>
          <p style={styles.noticeText}>
            The RROI affiliate program is available only to users with an active subscription.
            RROI is an information platform and does not provide medical advice or emergency services.
            In an emergency, contact local emergency services.
          </p>
        </div>

        <section style={styles.section}>
          <h2 style={styles.h2}>What it is</h2>
          <p style={styles.p}>
            Approved affiliates receive a unique referral code and share link. When someone subscribes
            using that code, they receive a discount and the affiliate earns commission on successful
            paid subscriptions, subject to the affiliate terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>How it works</h2>
          <ol style={styles.ol}>
            <li>Apply to become an affiliate.</li>
            <li>We review your application.</li>
            <li>If approved, you receive your referral code and share link.</li>
            <li>You can track referrals and earnings in your affiliate dashboard.</li>
            <li>Payouts are made quarterly via EFT, subject to minimum payout thresholds.</li>
          </ol>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Key rules (summary)</h2>
          <ul style={styles.ul}>
            <li>Affiliates must keep an active RROI subscription.</li>
            <li>No self-referrals.</li>
            <li>Commission applies to first-year subscriptions only (no renewal commission).</li>
            <li>Commission becomes eligible after a short verification period (to handle refunds/chargebacks).</li>
            <li>RROI may suspend or terminate affiliate access for misuse or misleading promotion.</li>
          </ul>
        </section>

        <Link href="/affiliate/apply" style={styles.primaryBtn}>
          Apply now
        </Link>

        <div style={styles.links}>
          <Link href="/" style={styles.linkMuted}>
            ← Back to home
          </Link>
          <Link href="/terms" style={styles.link}>
            Terms
          </Link>
          <Link href="/privacy" style={styles.link}>
            Privacy
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
  notice: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    background: "#F8FAFC",
    marginBottom: 18,
  },
  noticeText: {
    margin: "6px 0 0",
    lineHeight: 1.5,
    opacity: 0.9,
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
  ol: {
    margin: "6px 0 0 18px",
    lineHeight: 1.7,
    opacity: 0.95,
  },
  primaryBtn: {
    marginTop: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    textDecoration: "none",
    width: "100%",
    maxWidth: 360,
  },
  links: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 18,
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
