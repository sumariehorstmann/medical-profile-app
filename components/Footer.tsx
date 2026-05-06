import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <nav style={styles.links} aria-label="Footer navigation">
          <Link href="/contact" style={styles.link}>Contact</Link>
          <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
          <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
          <Link href="/refund-policy" style={styles.link}>Returns</Link>
        </nav>

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
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    colorScheme: "light",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 16px 28px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    colorScheme: "light",
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
    fontWeight: 800,
    color: "#0F172A",
    WebkitTextFillColor: "#0F172A",
    fontSize: 14,
  },
  meta: {
    fontSize: 13,
    color: "#64748B",
    WebkitTextFillColor: "#64748B",
    lineHeight: 1.6,
  },
};