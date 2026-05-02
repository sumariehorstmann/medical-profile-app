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
  borderTop: "1px solid #2A2A2A",
  background: "#000000", // PURE BLACK
  textAlign: "center",
  colorScheme: "dark",   // tells browser this is already dark
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
  color: "#E5E7EB",
  fontSize: 14,
  textAlign: "center",
  WebkitTextFillColor: "#E5E7EB",
},
  meta: {
  fontSize: 13,
  color: "#9CA3AF",
  lineHeight: 1.6,
},
};