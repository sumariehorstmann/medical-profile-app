import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image
            src="/logo.png"
            alt="RROI logo"
            width={96}
            height={96}
            priority
          />
          <h1 style={styles.h1}>Contact</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <div style={styles.notice}>
          <strong>Emergency notice</strong>
          <p style={styles.noticeText}>
            RROI does not provide emergency services. If you or someone else is in
            immediate danger, contact local emergency services right away.
          </p>
        </div>

        <section style={styles.section}>
          <h2 style={styles.h2}>How to reach us</h2>
          <p style={styles.p}>
            For general questions, account issues, subscription queries, or requests
            related to your information (access/correction/deletion), please contact
            us using one of the options below.
          </p>

          <div style={styles.box}>
            {/* Email */}
            <div style={styles.row}>
              <span style={styles.label}>Email</span>
              <a
                href="mailto:rapidresponseonlineinfo@gmail.com"
                style={styles.linkValue}
              >
                rapidresponseonlineinfo@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div style={styles.row}>
              <span style={styles.label}>WhatsApp</span>
              <a
                href="https://wa.me/27687120315?text=Hi%20RROI,%20I%20need%20help%20with%20my%20account."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkValue}
              >
                +27 68 712 0315
              </a>
            </div>

            {/* Response time */}
            <div style={styles.row}>
              <span style={styles.label}>Response time</span>
              <span style={styles.value}>
                Typically within 1–3 business days
              </span>
            </div>
          </div>

          <p style={styles.small}>
            Please do not send medical details via email or WhatsApp unless you are
            comfortable doing so. You can update your emergency profile directly
            inside your account.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Common requests</h2>
          <ul style={styles.ul}>
            <li>Subscription and billing questions</li>
            <li>Delivery questions about physical QR items</li>
            <li>Technical support (login / QR link issues)</li>
            <li>Privacy requests (access, correction, deletion)</li>
            <li>Affiliate program queries</li>
          </ul>
        </section>

        <div style={styles.links}>
          <Link href="/terms" style={styles.link}>
            Terms
          </Link>
          <Link href="/privacy" style={styles.link}>
            Privacy
          </Link>
          <Link href="/" style={styles.linkMuted}>
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    background: "#FFFFFF",
    color: "#0F172A",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 24,
    background: "#FFFFFF",
  },
  brand: {
    textAlign: "center",
    marginBottom: 18,
  },
  h1: {
    fontSize: 28,
    fontWeight: 900,
    margin: "8px 0 4px",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 700,
    opacity: 0.85,
    margin: 0,
  },
  notice: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    background: "#F8FAFC",
    marginBottom: 18,
  },
  noticeText: {
    margin: "6px 0 0",
    lineHeight: 1.5,
    opacity: 0.9,
  },
  section: {
    marginBottom: 18,
  },
  h2: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 6,
  },
  p: {
    margin: "0 0 8px",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  box: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 2px",
    borderTop: "1px solid #EEF2F7",
  },
  label: {
    fontWeight: 800,
    opacity: 0.85,
  },
  value: {
    fontWeight: 800,
  },
  linkValue: {
    fontWeight: 800,
    color: "#157A55",
    textDecoration: "none",
  },
  small: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.85,
    lineHeight: 1.5,
  },
  ul: {
    margin: "6px 0 0 18px",
    lineHeight: 1.7,
    opacity: 0.95,
  },
  links: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 12,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#157A55",
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 800,
  },
};