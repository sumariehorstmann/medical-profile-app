"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function RenewPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleRenew() {
    try {
      setLoading(true);
      setMessage(null);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("/api/payfast/renew", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to start renewal payment.");
      }

      window.location.href = json.redirectUrl;
    } catch (err: any) {
      setMessage(err?.message || "Failed to start renewal payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Renew RROI Premium</h1>

        <p style={styles.text}>
          Renew your RROI Premium visibility for another year.
        </p>

        <div style={styles.priceBox}>
          <span style={styles.label}>Annual renewal</span>
          <strong style={styles.price}>R99</strong>
        </div>

        <p style={styles.note}>
          Your profile information stays saved. Renewal keeps your full public
          emergency profile visible when your QR code is scanned.
        </p>

        {message ? <div style={styles.error}>{message}</div> : null}

        <button
          type="button"
          onClick={handleRenew}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Redirecting..." : "Renew Now"}
        </button>
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
    maxWidth: 520,
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
  },
  title: {
    margin: "0 0 10px",
    fontSize: 34,
    fontWeight: 900,
    color: "#0F172A",
  },
  text: {
    margin: "0 0 20px",
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.6,
  },
  priceBox: {
    border: "1px solid #D1FAE5",
    background: "#ECFDF5",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  label: {
    display: "block",
    color: "#475569",
    fontWeight: 700,
    marginBottom: 6,
  },
  price: {
    fontSize: 42,
    color: "#0F172A",
  },
  note: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
  },
  error: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    background: "#FEF2F2",
    color: "#991B1B",
    fontWeight: 700,
  },
  button: {
    width: "100%",
    marginTop: 20,
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    background: "#157A55",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
  },
};