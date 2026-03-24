import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <Link href="/" style={styles.headerLogo} aria-label="RROI Home">
          <Image src="/logo.png" alt="RROI" width={34} height={34} priority />
        </Link>

        <Link href="/login" style={styles.loginLink}>
          Log in
        </Link>
      </header>

      <section style={styles.hero}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={160} height={160} priority />
          <div style={styles.tagline}>Rapid Response Online Information</div>

          <h1 style={styles.h1}>Emergency information, accessible when it matters</h1>

          <p style={styles.sub}>
            Create your emergency profile for free and make it accessible via a QR code in urgent
            situations.
          </p>

          <Link href="/login" style={styles.primaryBtn}>
            Sign up
          </Link>

          <div style={styles.already}>
            <span style={styles.alreadyText}>Already have an account?</span>{" "}
            <Link href="/login" style={styles.alreadyLink}>
              Log in
            </Link>
          </div>

          <div style={styles.reassure}>
            Free profile setup • Section 1 visible on free tier • Upgrade later for full public
            profile visibility
          </div>
        </div>
      </section>

      <section style={styles.blocks}>
        <div style={styles.card}>
          <h2 style={styles.h2}>What is RROI?</h2>
          <p style={styles.p}>
            RROI is an online emergency information profile designed to help make critical personal
            details accessible when you may not be able to communicate them yourself. Information is
            accessed by scanning your unique QR code, which links to your public emergency profile.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>How it works</h2>

          <div style={styles.step}>
            <div style={styles.stepNum}>1</div>
            <div>
              <div style={styles.stepTitle}>Sign up for free</div>
              <div style={styles.stepText}>
                Create your account and complete your full emergency profile at no cost.
              </div>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNum}>2</div>
            <div>
              <div style={styles.stepTitle}>Free tier shows Section 1 only</div>
              <div style={styles.stepText}>
                When your QR code is scanned on the free tier, only your Section 1 public emergency
                details are visible.
              </div>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNum}>3</div>
            <div>
              <div style={styles.stepTitle}>Upgrade when you want full visibility</div>
              <div style={styles.stepText}>
                Upgrade to Premium only when you want your full medical profile to be visible when
                the QR code is scanned.
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Free vs Premium</h2>

          <div style={styles.compareBlock}>
            <div style={styles.compareTitle}>Free</div>
            <ul style={styles.ul}>
              <li>Create an account for free</li>
              <li>Complete and save your full profile</li>
              <li>Public QR view shows Section 1 only</li>
              <li>Upgrade later at any time</li>
            </ul>
          </div>

          <div style={styles.compareBlock}>
            <div style={styles.compareTitle}>Premium</div>
            <div style={styles.price}>R299 per year</div>
            <ul style={styles.ul}>
              <li>Full medical profile visible when QR is scanned</li>
              <li>Secure online emergency profile</li>
              <li>Three physical QR items included</li>
              <li>Nationwide delivery</li>
            </ul>
          </div>

          <Link href="/login" style={styles.primaryBtn}>
            Sign up free
          </Link>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Affiliates</h2>
          <p style={styles.p}>
            If you would like to promote RROI and earn commission on successful referrals, you can
            apply to become an affiliate.
          </p>
          <Link href="/affiliate" style={styles.secondaryBtn}>
            Apply to become an affiliate
          </Link>
        </div>

        <div style={styles.notice}>
          <strong>Important notice</strong>
          <p style={styles.noticeP}>
            RROI does not provide medical advice, diagnosis, or emergency services. RROI is not a
            replacement for professional medical care or emergency response services. In an
            emergency, always contact local emergency services.
          </p>
          <p style={styles.noticeP}>
            Information is provided by the user and may not be complete or up to date.
          </p>
        </div>
      </section>

      <footer style={styles.footer}>
        <Link href="/contact" style={styles.footerLink}>
          Contact
        </Link>
        <Link href="/terms" style={styles.footerLink}>
          Terms &amp; Conditions
        </Link>
        <Link href="/privacy" style={styles.footerLink}>
          Privacy Policy
        </Link>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    color: "#0F172A",
  },
  header: {
    height: 64,
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #E5E7EB",
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  loginLink: {
    textDecoration: "none",
    fontWeight: 700,
    color: "#157A55",
    padding: "8px 10px",
    borderRadius: 12,
  },
  hero: {
    padding: "28px 16px 16px",
    display: "flex",
    justifyContent: "center",
  },
  brand: {
    width: "100%",
    maxWidth: 560,
    textAlign: "center",
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 0.2,
    opacity: 0.9,
  },
  h1: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 28,
    lineHeight: 1.15,
  },
  sub: {
    margin: "0 0 14px",
    fontSize: 16,
    lineHeight: 1.5,
    opacity: 0.9,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 320,
    padding: "12px 16px",
    borderRadius: 14,
    background: "#157A55",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
    margin: "8px auto 0",
  },
  already: {
    marginTop: 10,
    fontSize: 14,
  },
  alreadyText: { opacity: 0.85 },
  alreadyLink: {
    color: "#157A55",
    fontWeight: 800,
    textDecoration: "none",
  },
  reassure: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.85,
    lineHeight: 1.5,
  },
  blocks: {
    padding: "10px 16px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 16,
    background: "#FFFFFF",
  },
  h2: { margin: "0 0 8px", fontSize: 18 },
  p: { margin: 0, lineHeight: 1.55, opacity: 0.92 },
  step: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "10px 0",
    borderTop: "1px solid #EEF2F7",
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 999,
    background: "#157A55",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    flex: "0 0 auto",
    marginTop: 2,
  },
  stepTitle: { fontWeight: 800, marginBottom: 2 },
  stepText: { opacity: 0.9, lineHeight: 1.45 },
  compareBlock: {
    borderTop: "1px solid #EEF2F7",
    paddingTop: 12,
    marginTop: 12,
  },
  compareTitle: {
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: 900,
    margin: "6px 0 10px",
  },
  ul: {
    margin: "0 0 14px",
    paddingLeft: 18,
    lineHeight: 1.6,
    opacity: 0.92,
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid #157A55",
    color: "#157A55",
    textDecoration: "none",
    fontWeight: 800,
    marginTop: 12,
  },
  notice: {
    width: "100%",
    maxWidth: 560,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 16,
    background: "#F8FAFC",
  },
  noticeP: { margin: "8px 0 0", lineHeight: 1.55, opacity: 0.9, fontSize: 14 },
  footer: {
    marginTop: "auto",
    borderTop: "1px solid #E5E7EB",
    padding: "16px",
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerLink: {
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 700,
    opacity: 0.85,
  },
};