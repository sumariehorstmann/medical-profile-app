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
            These Affiliate Terms apply to participants in the RROI Affiliate Program.
            By taking part in the program, you agree to these terms in addition to
            RROI’s Terms and Privacy Policy.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Who Can Apply</h2>
          <p style={styles.p}>
            To apply to become an RROI affiliate, you must be logged in as an active
            Premium subscriber.
          </p>
          <p style={styles.p}>
            If you already have a Premium subscription, please log in and then go to
            your profile page to apply.
          </p>
          <p style={styles.p}>
            If you have a free profile, please log in and upgrade to Premium first.
          </p>
          <p style={styles.p}>
            If you do not yet have a profile, please sign up, log in, upgrade to
            Premium, and then apply to become an affiliate from your profile.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Affiliate Code</h2>
          <p style={styles.p}>
            Once your affiliate account is created successfully, you will receive a
            unique affiliate code that will also appear on your profile page.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Discount and Commission</h2>
          <ul style={styles.ul}>
            <li>Customers using a valid affiliate code receive R30 off the Premium signup price.</li>
            <li>Affiliates earn 8% commission on the affiliate price actually paid, which is R369.
Commission per successful signup is R29.52.</li>
            <li>Commission applies to the first successful Premium signup only.</li>
            <li>No commission is paid on annual renewals.</li>
            <li>Self-referrals are not allowed.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Payouts</h2>
          <ul style={styles.ul}>
            <li>Payouts are made manually via EFT.</li>
            <li>Affiliates must provide correct banking details when applying.</li>
            <li>RROI may verify referral records before payout.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Marketing Rules</h2>
          <ul style={styles.ul}>
            <li>Affiliates must not make misleading or false claims.</li>
            <li>Affiliates must not imply that RROI provides medical treatment or emergency services.</li>
            <li>Spam, deception, and abuse of the affiliate program are prohibited.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Changes</h2>
          <p style={styles.p}>
            RROI may update these Affiliate Terms from time to time. Continued use of
            the affiliate program means you accept those changes.
          </p>
        </section>

        <div style={styles.ctaWrap}>
          <p style={styles.ctaText}>
            To apply as an affiliate, you must be logged in as an active Premium
            subscriber.
          </p>

          <Link href="/login" style={styles.primaryBtn}>
            Log in or Sign up to become an affiliate
          </Link>

          <Link href="/" style={styles.linkMuted}>
            ← Back to Home
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
  ctaWrap: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    textAlign: "center",
  },
  ctaText: {
    maxWidth: 520,
    lineHeight: 1.6,
    opacity: 0.9,
    margin: 0,
  },
  primaryBtn: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 10,
    background: BRAND_GREEN,
    color: "#fff",
    textDecoration: "none",
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 800,
  },
};