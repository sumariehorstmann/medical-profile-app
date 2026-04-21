import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

export default function StorePage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Online Store</h1>
            <p style={styles.subtitle}>
              Additional engraved QR code physical items will be available here
              soon for both free and Premium users.
            </p>
          </div>

          <div style={styles.notice}>
            <div style={styles.badge}>Coming Soon</div>
            <p style={styles.paragraph}>
              We are preparing the online store for future purchases of
              additional QR code products.
            </p>
            <p style={styles.paragraph}>
              This store will allow users to order extra engraved QR code items
              directly online once it is launched.
            </p>
          </div>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    lineHeight: 1.6,
    color: MUTED,
    maxWidth: 680,
  },
  notice: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 24,
    background: "#FFFFFF",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 14px",
    borderRadius: 999,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 14,
    marginBottom: 18,
  },
  paragraph: {
    margin: "0 0 12px",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
};