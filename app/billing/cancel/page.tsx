import Link from "next/link";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

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
    width: "100%",
    minHeight: "100vh",
    background: PAGE_BG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(16px, 5vw, 40px)",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: "clamp(20px, 5vw, 32px)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    textAlign: "center",
  },

  title: {
    margin: "0 0 12px",
    maxWidth: "100%",
    fontSize: "clamp(28px, 6vw, 36px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  text: {
    margin: "0 auto 28px",
    width: "100%",
    maxWidth: 420,
    fontSize: "clamp(15px, 2.5vw, 16px)",
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
  },

  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },

  primaryBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 320,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 18px",
    boxSizing: "border-box",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.4,
  },

  secondaryBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 320,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 18px",
    boxSizing: "border-box",
    borderRadius: 12,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.4,
  },
};
