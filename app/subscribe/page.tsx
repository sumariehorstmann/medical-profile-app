"use client";

import { useState } from "react";

export default function SubscribePage() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!agreed) {
      alert("Please agree to the Terms, Privacy Policy, and Refund Policy.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/payfast/subscribe", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      // Redirect to PayFast
      window.location.href = data.url;
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Upgrade to Premium</h1>

        <p style={styles.subtitle}>
          Unlock full emergency profile visibility and receive your QR product kit.
        </p>

        {/* ✅ CHECKBOX */}
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={styles.checkbox}
          />

          <label htmlFor="agree" style={styles.checkboxLabel}>
            I agree to the{" "}
            <a href="/terms" style={styles.link}>Terms & Conditions</a>,{" "}
            <a href="/privacy" style={styles.link}>Privacy Policy</a>, and{" "}
            <a href="/refund-policy" style={styles.link}>Refund & Returns Policy</a>
          </label>
        </div>

        {/* ✅ BUTTON */}
        <button
          onClick={handleSubscribe}
          disabled={!agreed || loading}
          style={{
            ...styles.button,
            opacity: !agreed || loading ? 0.6 : 1,
            cursor: !agreed || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Redirecting..." : "Upgrade to Premium"}
        </button>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F8FAFC",
    padding: 16,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    maxWidth: 420,
    width: "100%",
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 10,
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 24,
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    textAlign: "left",
    marginBottom: 20,
  },
  checkbox: {
    marginTop: 4,
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.5,
  },
  link: {
    color: "#157A55",
    fontWeight: 600,
    textDecoration: "none",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#157A55",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 14,
  },
};