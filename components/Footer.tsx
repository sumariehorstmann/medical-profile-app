import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <nav style={styles.links} aria-label="Footer navigation">
          {[
            ["Contact", "/contact"],
            ["Affiliate Program", "/affiliate"],
            ["Terms & Conditions", "/terms"],
            ["Privacy Policy", "/privacy"],
            ["Returns", "/refund-policy"],
          ].map(([label, href]) => (
            <Link key={href} href={href} style={styles.link}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={styles.meta}>
          <div style={styles.company}>RROI (Pty) Ltd • South Africa</div>
          <div style={styles.email}>support@rroi.co.za</div>

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

          <div style={styles.copy}>
            © {new Date().getFullYear()} RROI (Pty) Ltd. All rights reserved.
          </div>
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
    maxWidth: 920,
    margin: "0 auto",
    padding: "34px 18px 42px",
    textAlign: "center",
  },

  links: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px 18px",
    marginBottom: 26,
  },

  link: {
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 850,
    fontSize: 15,
    lineHeight: 1.2,
    padding: "10px 8px",
    borderRadius: 12,
  },

  meta: {
    maxWidth: 760,
    margin: "0 auto",
  },

  company: {
    fontSize: 15,
    fontWeight: 850,
    color: "#334155",
    lineHeight: 1.5,
    marginTop: 4,
  },

  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 1.5,
  },

  disclaimer: {
    margin: "16px auto 0",
    maxWidth: 680,
    fontSize: 12,
    lineHeight: 1.75,
    color: "#94A3B8",
  },

  copy: {
    marginTop: 18,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 700,
  },
};