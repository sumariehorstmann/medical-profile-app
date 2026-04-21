import Link from "next/link";
import Image from "next/image";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function HomePage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.logoWrap}>
          <Image
            src="/logo-full-v2.png"
            alt="RROI"
            width={260}
            height={260}
            priority
            style={styles.logo}
          />
        </div>

        <h1 style={styles.title}>
          Your emergency profile, instantly accessible with a QR code when it
          matters most
        </h1>

        <p style={styles.subtitle}>
          Create your emergency profile in minutes. In an emergency, anyone can
          scan your QR code to access critical information instantly.
        </p>

        <div style={styles.ctaWrap}>
          <Link href="/login" style={styles.primaryBtn}>
            Sign up free
          </Link>
        </div>

        <p style={styles.noRiskLine}>
          No payment required • Upgrade only if you want full public access
        </p>

        <p style={styles.loginLine}>
          Already have an account?{" "}
          <Link href="/login" style={styles.loginLink}>
            Log in
          </Link>
        </p>

        <p style={styles.trustLine}>
          Secure • POPIA-aligned • You control what is publicly visible
        </p>

        <p style={styles.conversionLine}>
          Create your full profile for free • Only essential info is visible
          publicly • Upgrade anytime to unlock full emergency access
        </p>
      </section>

      <section style={styles.howItWorksSection}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>How it works</h2>

          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Create your profile</h3>
              <p style={styles.stepText}>
                Sign up and set up your emergency profile for free.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Add your details</h3>
              <p style={styles.stepText}>
                Save your emergency contacts and important medical information.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Use your QR code</h3>
              <p style={styles.stepText}>
                Your QR code links directly to your emergency profile.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>4</div>
              <h3 style={styles.stepTitle}>Instant access in emergencies</h3>
              <p style={styles.stepText}>
                When scanned, your profile can be accessed immediately when it
                matters most.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "36px 16px 56px",
  },
  hero: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
  },
  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 18,
  },
  logo: {
    width: "100%",
    height: "auto",
    maxWidth: 260,
  },
  title: {
    margin: "0 auto",
    maxWidth: 880,
    fontSize: 34,
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "18px auto 0",
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.7,
    color: MUTED,
  },
  ctaWrap: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 240,
    padding: "18px 28px",
    borderRadius: 18,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 18,
    boxShadow: "0 12px 30px rgba(21, 122, 85, 0.18)",
  },
  noRiskLine: {
    margin: "14px 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: MUTED,
    fontWeight: 600,
  },
  loginLine: {
    margin: "18px 0 0",
    fontSize: 16,
    lineHeight: 1.6,
    color: MUTED,
  },
  loginLink: {
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 800,
  },
  trustLine: {
    margin: "18px 0 0",
    fontSize: 15,
    lineHeight: 1.6,
    color: "#334155",
    fontWeight: 800,
  },
  conversionLine: {
    margin: "16px auto 0",
    maxWidth: 860,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  howItWorksSection: {
    maxWidth: 1100,
    margin: "40px auto 0",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  sectionTitle: {
    margin: 0,
    textAlign: "center",
    fontSize: 28,
    fontWeight: 900,
    color: TEXT,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginTop: 24,
  },
  stepCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 20,
    padding: 20,
    background: "#FFFFFF",
    textAlign: "left",
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 999,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 16,
    marginBottom: 14,
  },
  stepTitle: {
    margin: "0 0 8px",
    fontSize: 18,
    fontWeight: 800,
    color: TEXT,
    lineHeight: 1.3,
  },
  stepText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
};