"use client";

import Link from "next/link";

export default function StorePaymentSuccessPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Store payment submitted</h1>

        <p style={styles.text}>
          Thank you. Your store payment has been submitted successfully.
        </p>

        <p style={styles.text}>
          Your order will be processed after PayFast confirms the payment.
        </p>

        <div style={styles.infoBox}>
          <strong>Next step:</strong>
          <br />
          Your custom RROI QR products will be manufactured and delivered within
          7–14 working days.
        </div>

        <Link href="/profile" style={styles.primaryButton}>
          Go to Profile
        </Link>

        <Link href="/store" style={styles.secondaryButton}>
          Back to Store
        </Link>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 620,
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
  },

  title: {
    margin: "0 0 12px",
    fontSize: 34,
    fontWeight: 900,
    lineHeight: 1.1,
    color: "#0F172A",
  },

  text: {
    margin: "0 0 12px",
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.6,
  },

  infoBox: {
    marginTop: 18,
    marginBottom: 22,
    padding: 16,
    borderRadius: 14,
    background: "#ECFDF5",
    border: "1px solid #BBF7D0",
    color: "#166534",
    fontSize: 15,
    lineHeight: 1.7,
  },

  primaryButton: {
    display: "block",
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    background: "#157A55",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 900,
    textAlign: "center",
    textDecoration: "none",
    marginBottom: 12,
  },

  secondaryButton: {
    display: "block",
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#0F172A",
    fontSize: 16,
    fontWeight: 800,
    textAlign: "center",
    textDecoration: "none",
  },
};