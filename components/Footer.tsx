import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.links}>
          <Link href="/contact" style={styles.link}>Contact</Link>
          <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
          <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
          <Link href="/refund-policy" style={styles.link}>Returns</Link>
        </div>

        <div style={styles.meta}>
          <div>RROI (Pty) Ltd • South Africa</div>
          <div>Email: support@rroi.co.za</div>
          <div>© {new Date().getFullYear()} RROI (Pty) Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: 48,
    borderTop: "1px solid #E5E7EB",
    background: "#FFFFFF",
  },

  container: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 16px 28px",
    textAlign: "center",
  },

  links: {
    display: "flex",
    justifyContent: "center",
    gap: 18,
    flexWrap: "wrap",
    marginBottom: 14,
  },

  link: {
    textDecoration: "none",
    fontWeight: 700,
    color: "#0F172A",
    fontSize: 14,
    transition: "opacity 0.2s ease",
  },

  meta: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 1.6,
  },
};