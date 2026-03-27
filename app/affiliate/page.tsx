import Link from "next/link";
import Image from "next/image";

export default function AffiliatePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={96} height={96} priority />
          <h1 style={styles.h1}>Affiliate Program</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <section style={styles.notice}>
          <p style={styles.noticeText}>
            The RROI affiliate program is available only to users with an active Premium
            subscription.
          </p>
          <p style={styles.noticeText}>
            To apply, you must first log in or sign up, then upgrade to Premium if needed.
            Once you have an active Premium subscription, you can apply to become an
            affiliate from your profile page.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>What it is</h2>
          <p style={styles.p}>
            Approved affiliates receive a unique referral code. When someone subscribes
            using that code, they receive a discount and the affiliate earns commission on
            successful paid Premium signups, subject to the affiliate terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>How it works</h2>
          <ol style={styles.ol}>
            <li>Log in or sign up for an RROI account.</li>
            <li>Upgrade to Premium if your profile is still on the free tier.</li>
            <li>Go to your profile page.</li>
            <li>Click “Apply to Become an Affiliate” from your Premium profile.</li>
            <li>Complete the application form and submit your details.</li>
          </ol>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Key rules</h2>
          <ul style={styles.ul}>
            <li>You must have an active Premium subscription to apply.</li>
            <li>No self-referrals.</li>
            <li>Commission applies to first-year Premium signups only.</li>
            <li>No commission is paid on renewals.</li>
            <li>RROI may suspend affiliate access for misuse or misleading promotion.</li>
          </ul>
        </section>

        <div style={styles.ctaWrap}>
          <Link href="/login" style={styles.primaryBtn}>
            Log in or Sign up
          </Link>

          <Link href="/" style={styles.backLink}>
            ← Back to home
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
    padding: 16,
    background: "#F8FAFC",
    marginBottom: 20,
  },
  noticeText: {
    margin: "0 0 10px",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  section: {
    marginBottom: 20,
  },
  h2: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 8,
  },
  p: {
    margin: 0,
    lineHeight: 1.65,
    opacity: 0.95,
  },
  ol: {
    margin: "6px 0 0 22px",
    lineHeight: 1.8,
    opacity: 0.95,
  },
  ul: {
    margin: "6px 0 0 18px",
    lineHeight: 1.8,
    opacity: 0.95,
  },
  ctaWrap: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
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
  backLink: {
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 800,
  },
};