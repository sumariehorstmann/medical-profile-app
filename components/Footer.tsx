import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandBlock}>
          <div style={styles.company}>RROI (Pty) Ltd • South Africa</div>
          <div style={styles.email}>support@rroi.co.za</div>
        </div>

        <nav style={styles.links} aria-label="Footer navigation">
          <Link href="/contact" style={styles.link}>Contact</Link>
          <Link href="/affiliate" style={styles.link}>Affiliate Program</Link>
          <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
          <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
          <Link href="/refund-policy" style={styles.link}>Returns</Link>
        </nav>

        <div style={styles.legalBlock}>
          <p style={styles.disclaimer}>
            RROI is not a medical service, healthcare provider, or emergency
            response service. Information displayed is provided by users and may
            be incomplete or inaccurate. RROI does not verify or guarantee the
            accuracy of any information. In an emergency, always contact your
            local emergency services immediately.
          </p>

          <p style={styles.disclaimer}>
            By using this platform, you agree to our Terms & Conditions and
            Privacy Policy.
          </p>
        </div>

        <div style={styles.copy}>
          © {new Date().getFullYear()} RROI (Pty) Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: 56,
    borderTop: "1px solid #E5E7EB",
    background: "#FFFFFF",
    color: "#0F172A",
  },

  container: {
    width: "100%",
    maxWidth: 760,
    margin: "0 auto",
    padding: "34px 20px 42px",
    textAlign: "center",
  },

  brandBlock: {
    marginBottom: 26,
  },

  company: {
    fontSize: 15,
    fontWeight: 850,
    color: "#334155",
    lineHeight: 1.5,
  },

  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 1.5,
  },

  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },

  link: {
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 850,
    fontSize: 15,
    lineHeight: 1.4,
  },

  legalBlock: {
    maxWidth: 680,
    margin: "0 auto",
  },

  disclaimer: {
    margin: "0 0 14px",
    fontSize: 12,
    lineHeight: 1.75,
    color: "#94A3B8",
  },

  copy: {
    marginTop: 26,
    paddingTop: 18,
    borderTop: "1px solid #E5E7EB",
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 700,
  },
};