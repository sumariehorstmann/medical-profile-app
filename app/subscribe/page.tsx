import Link from "next/link";
import Image from "next/image";

export default function SubscribePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={64} height={64} priority />
          <h1 style={styles.h1}>RROI Subscription</h1>
          <p style={styles.tagline}>Rapid Response Online Information</p>
        </div>

        <div style={styles.priceBlock}>
          <div style={styles.price}>R299 per year</div>
          <ul style={styles.ul}>
            <li>Secure online emergency profile</li>
            <li>Three physical QR items included</li>
            <li>Nationwide delivery</li>
            <li>Annual auto-renewal</li>
            <li>Cancel anytime</li>
          </ul>
        </div>

        <div style={styles.notice}>
          <strong>Important notice</strong>
          <p style={styles.noticeText}>
            RROI does not provide medical advice, diagnosis, or emergency services.
            RROI is not a replacement for professional medical care or emergency
            response services.
          </p>
          <p style={styles.noticeText}>
            In an emergency, always contact local emergency services.
          </p>
        </div>

        {/* PRIMARY ACTION */}
        <Link href="/subscribe/shipping" style={styles.primaryBtn}>
          Continue
        </Link>

        <p style={styles.helper}>
          You will create an account before proceeding to payment.
        </p>

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
    maxWidth: 460,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 22,
    background: "#FFFFFF",
  },
  brand: {
    textAlign: "center",
    marginBottom: 18,
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
  priceBlock: {
    marginBottom: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: 900,
    marginBottom: 10,
    textAlign: "center",
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
