"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function TermsPage() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <div style={styles.topBlock}>
            <h1 style={styles.title}>Terms &amp; Conditions</h1>
            <p style={styles.subtitle}>
              These terms govern your use of the RROI platform and services.
              Please read them carefully before using the site.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p style={styles.paragraph}>
              By creating an account or using RROI, you agree to be bound by
              these Terms &amp; Conditions and any related policies published on
              the site.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Service Description</h2>
            <p style={styles.paragraph}>
              RROI provides a digital emergency medical profile platform that
              allows users to store and share selected information through a QR
              code-linked profile.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>3. User Responsibility</h2>
            <p style={styles.paragraph}>
              You are responsible for ensuring that all information entered on
              your profile is accurate, complete, and kept up to date. RROI is
              not responsible for errors caused by incorrect or outdated
              information submitted by the user.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Emergency Use Disclaimer</h2>
            <p style={styles.paragraph}>
              RROI is designed to assist in emergencies by making user-provided
              information easier to access. It does not replace professional
              medical advice, diagnosis, treatment, or emergency services.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Subscription and Visibility</h2>
            <p style={styles.paragraph}>
              Free users may create and save a full profile, but only limited
              profile information is publicly visible when the QR code is
              scanned. Premium users unlock expanded public profile visibility
              based on the active subscription status.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Account Suspension or Removal</h2>
            <p style={styles.paragraph}>
              RROI reserves the right to suspend or terminate accounts that are
              used unlawfully, fraudulently, abusively, or in violation of these
              terms.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p style={styles.paragraph}>
              To the fullest extent permitted by law, RROI will not be liable
              for any loss, damage, injury, delay, or claim arising from use of
              the platform, reliance on profile information, or inability to
              access the service.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Changes to Terms</h2>
            <p style={styles.paragraph}>
              We may update these Terms &amp; Conditions from time to time. Any
              changes will be posted on this page and will take effect once
              published.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Contact</h2>
            <p style={styles.paragraph}>
              If you have any questions about these Terms &amp; Conditions,
              please contact us at{" "}
              <a href="mailto:support@rroi.co.za" style={styles.link}>
                support@rroi.co.za
              </a>
              .
            </p>
          </div>

          <div style={styles.footerLinks}>
            <Link href="/contact" style={styles.footerLink}>
              Contact
            </Link>
            <span style={styles.dot}>•</span>
            <Link href="/privacy-policy" style={styles.footerLink}>
              Privacy Policy
            </Link>
          </div>

          <div style={styles.backWrap}>
            <button type="button" onClick={handleBack} style={styles.backBtn}>
              ← Back
            </button>
          </div>
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
  },
  title: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px 0 0",
    fontSize: 16,
    lineHeight: 1.6,
    color: MUTED,
    maxWidth: 650,
  },
  section: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
    marginBottom: 18,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT,
  },
  paragraph: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  link: {
    color: BRAND_GREEN,
    fontWeight: 700,
    textDecoration: "none",
  },
  footerLinks: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  footerLink: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 700,
    fontSize: 14,
  },
  dot: {
    color: "#94A3B8",
    fontSize: 14,
  },
  backWrap: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
  },
  backBtn: {
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    fontWeight: 800,
    fontSize: 14,
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },
};