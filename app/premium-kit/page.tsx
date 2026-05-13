"use client";

import Link from "next/link";

export default function PremiumKitPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link href="/profile" style={styles.backLink}>
          ← Back to Profile
        </Link>

        <div style={styles.badge}>RROI Premium</div>

        <h1 style={styles.h1}>Premium Kit</h1>

        <p style={styles.subtitle}>
          Everything included when upgrading to RROI Premium.
        </p>

        {/* Product Preview Placeholder */}
        <div style={styles.imagePlaceholder}>
          Product image coming soon
        </div>

        {/* Included */}
        <div style={styles.card}>
          <h2 style={styles.h2}>What is included</h2>

          <ul style={styles.list}>
            <li>1-year RROI Premium subscription</li>
            <li>2 physical QR code items</li>
            <li>Full emergency profile visibility</li>
            <li>Free nationwide delivery</li>
          </ul>
        </div>

        {/* Example Profile */}
        <div style={styles.exampleCard}>
          <h2 style={styles.h2}>Example Premium public profile</h2>

          <p style={styles.exampleText}>
            View an example of how a Premium emergency profile appears when a
            QR code is scanned.
          </p>

          <Link
            href="/e/891729a6-9f88-49b8-b14d-9d702bde2c6b"
            target="_blank"
            style={styles.secondaryButton}
          >
            View Example Profile
          </Link>
        </div>

        {/* CTA */}
        <Link href="/subscribe/order" style={styles.cta}>
          Get Premium Kit for R399
        </Link>

        <p style={styles.smallText}>
          Includes first-year Premium access and physical QR code items.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "48px 20px",
    background: "#FFFFFF",
    minHeight: "100vh",
  },

  container: {
    maxWidth: 760,
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    marginBottom: 20,
    textDecoration: "none",
    color: "#374151",
    fontWeight: 600,
    fontSize: 15,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#ECFDF5",
    color: "#065F46",
    border: "1px solid #A7F3D0",
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 16,
  },

  h1: {
    fontSize: 42,
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: 14,
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: 30,
    maxWidth: 620,
  },

  imagePlaceholder: {
    height: 280,
    background: "#F3F4F6",
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    fontSize: 15,
    marginBottom: 26,
    border: "1px solid #E5E7EB",
  },

  card: {
    background: "#F8FAFC",
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 24,
    marginBottom: 22,
  },

  exampleCard: {
    background: "#FFFFFF",
    border: "1px solid #D1D5DB",
    borderRadius: 18,
    padding: 24,
    marginBottom: 30,
  },

  h2: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 14,
    color: "#0F172A",
  },

  list: {
    paddingLeft: 22,
    lineHeight: 1.9,
    color: "#1F2937",
    fontSize: 16,
  },

  exampleText: {
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: 18,
    fontSize: 15,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    background: "#FFFFFF",
    border: "1px solid #D1D5DB",
    color: "#111827",
  },

  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#065F46",
    color: "#FFFFFF",
    padding: "15px 26px",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 17,
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(6,95,70,0.18)",
  },

  smallText: {
    marginTop: 14,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 1.5,
  },
};