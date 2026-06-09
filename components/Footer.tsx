import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandBlock}>
          <div style={styles.company}>
            RROI (Pty) Ltd • South Africa
          </div>

          <a
  href="mailto:support@rroi.co.za"
  style={styles.email}
>
  support@rroi.co.za
</a>
        </div>

        <nav style={styles.links} aria-label="Footer navigation">
          <Link href="/contact" style={styles.link}>
            Contact
          </Link>

          <Link href="/affiliate" style={styles.link}>
            Affiliate
          </Link>

          <Link href="/terms" style={styles.link}>
            Terms & Conditions
          </Link>

          <Link href="/privacy" style={styles.link}>
            Privacy Policy
          </Link>

          <Link href="/refund-policy" style={styles.link}>
            Returns & Refunds
          </Link>
        </nav>

        <div style={styles.legalBlock}>
  <p style={styles.disclaimer}>
    RROI is an information-sharing platform only. RROI is not a medical
    device, healthcare provider, emergency response service, or substitute for
    professional medical advice, diagnosis, treatment, or emergency assistance.
  </p>

  <p style={styles.disclaimer}>
    Information displayed on RROI profiles is provided and maintained by users.
RROI does not verify, certify, or guarantee the accuracy, completeness,
availability, or suitability of any information. Access may depend on internet
connectivity, device compatibility, QR code condition, user settings, and
third-party services.
  </p>

  <p style={styles.disclaimer}>
    RROI does not guarantee that emergency responders, healthcare personnel, or
    bystanders will scan, access, use, or rely on a QR profile in an emergency.
    In an emergency, contact local emergency services immediately.
  </p>

  <p style={styles.disclaimer}>
    By using this platform, you agree to our Terms & Conditions, Privacy Policy,
    and Returns & Refunds Policy.
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
    fontWeight: 700,
    color: "#334155",
    lineHeight: 1.5,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  email: {
  marginTop: 4,
  fontSize: 14,
  color: "#64748B",
  lineHeight: 1.5,
  textDecoration: "none",
  display: "inline-block",
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
},

  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },

  link: {
  width: "100%",
  maxWidth: 260,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  background: "#F8FAFC",
  textDecoration: "none",

  color: "#0F172A",
  WebkitTextFillColor: "#0F172A",

  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.2,
  letterSpacing: "0.02em",

  textAlign: "center",
  display: "block",

  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
},

  legalBlock: {
    maxWidth: 680,
    margin: "0 auto",
  },

  disclaimer: {
    margin: "0 0 14px",
    fontSize: 12,
    lineHeight: 1.8,
    color: "#94A3B8",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  copy: {
    marginTop: 26,
    paddingTop: 18,
    borderTop: "1px solid #E5E7EB",
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 700,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};