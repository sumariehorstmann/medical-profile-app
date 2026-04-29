import Link from "next/link";

export default function PremiumKitPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/profile" style={styles.backLink}>
  ← Back to Profile
</Link>
        <h1 style={styles.h1}>Premium Kit</h1>

        <p style={styles.subtitle}>
          Everything you receive when you upgrade to RROI Premium.
        </p>

        {/* Placeholder for image (you will add later) */}
        <div style={styles.imagePlaceholder}>
          Product image coming soon
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>What is included</h2>

          <ul style={styles.list}>
            <li>1-year RROI Premium subscription</li>
            <li>2 physical QR code items</li>
            <li>Free nationwide delivery</li>
          </ul>
        </div>

        <Link href="/subscribe/order" style={styles.cta}>
          Get Premium Kit for R399
        </Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "40px 20px",
  },
  container: {
    maxWidth: 700,
    margin: "0 auto",
  },
  h1: {
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  imagePlaceholder: {
    height: 220,
    background: "#F3F4F6",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    marginBottom: 24,
  },
  card: {
    background: "#ECFDF5",
    border: "1px solid #A7F3D0",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  h2: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 10,
  },
  list: {
    paddingLeft: 18,
    lineHeight: 1.6,
  },
  cta: {
    display: "inline-block",
    background: "#065F46",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
  },
};