import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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

          <h1 style={styles.h1}>Terms of Service</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Introduction</h2>
          <p style={styles.p}>
            Rapid Response Online Information (“RROI”, “we”, “us”, or “our”) provides an online
            subscription-based platform that allows users to store and display emergency-related
            information via a QR code.
          </p>
          <p style={styles.p}>
            By accessing, subscribing to, or using RROI, you agree to be bound by these Terms of
            Service (“Terms”). If you do not agree, you must not use the service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Nature of the Service</h2>
          <p style={styles.p}>
            RROI is an informational platform only. RROI does <strong>not</strong> provide medical
            advice, diagnosis, treatment, monitoring, or emergency response services.
          </p>
          <p style={styles.p}>
            RROI is <strong>not</strong> a replacement for professional medical care, emergency
            services, or first responders. In all emergencies, users and third parties must contact
            local emergency services immediately.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. User Responsibility</h2>
          <p style={styles.p}>
            Users are solely responsible for the accuracy, completeness, and currency of all
            information they provide on their RROI profile.
          </p>
          <p style={styles.p}>
            RROI does not verify, validate, or guarantee the accuracy of any user-provided
            information and accepts no responsibility for reliance on such information.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Subscription & Billing</h2>
          <p style={styles.p}>
            RROI operates on an annual subscription basis. Subscriptions are billed yearly and may
            automatically renew unless cancelled before the renewal date.
          </p>
          <p style={styles.p}>
            Subscription fees are non-refundable except where required by applicable law.
          </p>
          <p style={styles.p}>
            Upon cancellation, user profiles may remain stored but may be restricted or marked as
            inactive or unsubscribed.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Physical QR Items</h2>
          <p style={styles.p}>
            Physical QR items provided as part of a subscription are for convenience only. RROI does
            not guarantee that QR codes will be scanned, accessed, or used in any emergency
            situation.
          </p>
          <p style={styles.p}>
            Loss, damage, misuse, or failure of physical items does not constitute a service failure
            or entitle the user to a refund.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Limitation of Liability</h2>
          <p style={styles.p}>
            To the maximum extent permitted by law, RROI shall not be liable for any direct,
            indirect, incidental, consequential, or special damages arising out of or related to
            the use of, or inability to use, the service.
          </p>
          <p style={styles.p}>
            This includes, without limitation, injury, loss, death, or damages resulting from
            reliance on information accessed via RROI.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Availability & Changes</h2>
          <p style={styles.p}>
            RROI does not guarantee uninterrupted or error-free availability of the service and may
            modify, suspend, or discontinue any part of the platform at any time.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Termination</h2>
          <p style={styles.p}>
            RROI reserves the right to suspend or terminate accounts that violate these Terms or
            misuse the platform.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>9. Governing Law</h2>
          <p style={styles.p}>
            These Terms are governed by the laws of the Republic of South Africa. Any disputes shall
            be subject to the jurisdiction of South African courts.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>10. Contact</h2>
          <p style={styles.p}>
            For questions regarding these Terms, please contact RROI through the official contact
            channels provided on the website.
          </p>
        </section>

        <Link href="/" style={styles.backLink}>
          ← Back to home
        </Link>
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
    marginBottom: 20,
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
  backLink: {
    marginTop: 16,
    display: "inline-block",
    textDecoration: "none",
    color: "#157A55",
    fontWeight: 800,
  },
};
