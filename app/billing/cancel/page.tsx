import Link from "next/link";

export const dynamic = "force-dynamic";

export default function BillingCancelPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Payment cancelled</h1>

        <p style={styles.text}>
          Your payment was cancelled. No payment has been completed and your
          profile has not been upgraded.
        </p>

        <div style={styles.actions}>
          <Link href="/profile" style={styles.primaryBtn}>
            Back to Profile
          </Link>

          <Link href="/" style={styles.secondaryBtn}>
            Home
          </Link>
        </div>
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
    textAlign: "center",
  },

  title: {
    margin: "0 0 10px",
    fontSize: 34,
    fontWeight: 900,
    color: "#0F172A",
  },

  text: {
    margin: "0 auto 24px",
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.7,
    maxWidth: 420,
  },

  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 12,
    background: "#157A55",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
  },

  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#0F172A",
    textDecoration: "none",
    fontWeight: 800,
  },
};