import Link from "next/link";
import Image from "next/image";

export default function SubscribePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={64} height={64} priority />
          <h1 style={styles.h1}>RROI Premium Upgrade</h1>
          <p style={styles.tagline}>Rapid Response Online Information</p>
        </div>

        <p style={styles.intro}>
          Your account and full profile can be created and saved for free. Premium only changes what
          is visible when your QR code is scanned.
        </p>

        <div style={styles.compareBox}>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Free tier</div>
            <ul style={styles.ul}>
              <li>Create your account for free</li>
              <li>Complete and save your full profile</li>
              <li>QR public view shows Section 1 only</li>
            </ul>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Premium tier</div>
            <div style={styles.price}>R299 per year</div>
            <ul style={styles.ul}>
              <li>Full medical profile visible when QR is scanned</li>
              <li>Three physical QR items included</li>
              <li>Nationwide delivery</li>
            </ul>
          </div>
        </div>

        <div style={styles.notice}>
          <strong>Important notice</strong>
          <p style={styles.noticeText}>
            RROI does not provide medical advice, diagnosis, or emergency services. RROI is not a
            replacement for professional medical care or emergency response services.
          </p>
          <p style={styles.noticeText}>
            In an emergency, always contact local emergency services.
          </p>
        </div>

        <Link href="/subscribe/shipping" style={styles.primaryBtn}>
          Upgrade to Premium
        </Link>

        <p style={styles.helper}>
          You should already have an account before continuing to payment.
        </p>

        <Link href="/profile" style={styles.secondaryBtn}>
          Back to profile
        </Link>

        <Link href="/" style={styles.backLink}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "#FFFFFF",
    color: "#0F172A",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 22,
    background: "#FFFFFF",
  },
  brand: {
    textAlign: "center",
    marginBottom: 14,
  },
  h1: {
    fontSize: 24,
    fontWeight: 900,
    margin: "8px 0 4px",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 700,
    opacity: 0.9,
    margin: 0,
  },
  intro: {
    margin: "0 0 16px",
    textAlign: "center",
    lineHeight: 1.5,
    opacity: 0.92,
  },
  compareBox: {
    display: "grid",
    gap: 14,
  },
  section: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
    background: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 900,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 10,
  },
  ul: {
    paddingLeft: 18,
    lineHeight: 1.6,
    opacity: 0.95,
    margin: 0,
  },
  notice: {
    marginTop: 16,
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    background: "#F8FAFC",
    fontSize: 13,
  },
  noticeText: {
    margin: "6px 0 0",
    lineHeight: 1.5,
  },
  primaryBtn: {
    marginTop: 18,
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 15,
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
  },
  helper: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.85,
    textAlign: "center",
  },
  secondaryBtn: {
    marginTop: 12,
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    fontWeight: 900,
    fontSize: 15,
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    background: "#FFFFFF",
  },
  backLink: {
    marginTop: 16,
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 700,
    fontSize: 13,
  },
};