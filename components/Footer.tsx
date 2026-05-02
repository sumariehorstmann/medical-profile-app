import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        <Link href="/contact" style={styles.link}>Contact</Link>
        <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
        <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
        <Link href="/refund-policy" style={styles.link}>Refund & Returns</Link>
      </div>

      <div style={styles.meta}>
        <div>RROI (Pty) Ltd • South Africa</div>
        <div>Email: support@rroi.co.za</div>
        <div>© {new Date().getFullYear()} RROI (Pty) Ltd. All rights reserved.</div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: 40,
    padding: "20px 16px",
    borderTop: "1px solid #E5E7EB",
    background: "#FFFFFF",
    textAlign: "center",
  },
  links: {
  display: "grid",
  gridTemplateColumns: "repeat(4, auto)",
  justifyContent: "center",
  gap: 20,
  marginBottom: 12,
},
  link: {
  textDecoration: "none",
  fontWeight: 800,
  color: "#0F172A",
  fontSize: 14,
},
  meta: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
  },
};