"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function TermsPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Terms &amp; Conditions</h1>
            <p style={styles.subtitle}>
              These Terms &amp; Conditions govern your access to and use of the
              RROI platform and related services. By creating an account, using
              the platform, or purchasing any paid service, you agree to these
              terms.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>1. About RROI</h2>
            <p style={styles.paragraph}>
              RROI is operated by Rooi Veer (Pty) Ltd, South Africa. RROI is a
              digital emergency information platform that allows users to create
              a profile linked to a QR code so that important information can be
              accessed more quickly in an emergency.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Not Emergency Services or Medical Advice</h2>
            <p style={styles.paragraph}>
              RROI is not an ambulance service, emergency dispatch service,
              hospital, medical scheme, medical practitioner, or healthcare
              provider. RROI does not provide medical advice, diagnosis, or
              treatment and must not be relied on as a substitute for
              professional medical care or emergency assistance.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>3. Eligibility and Account Use</h2>
            <p style={styles.paragraph}>
              You may use RROI only if you are legally permitted to enter into a
              binding agreement. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity
              that occurs under your account.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Information You Provide</h2>
            <p style={styles.paragraph}>
              You are solely responsible for the accuracy, completeness, and
              updating of the information you enter on your profile, including
              medical and emergency contact information. RROI is not responsible
              for any loss, harm, delay, or incorrect outcome caused by
              inaccurate, incomplete, outdated, or misleading information
              supplied by a user.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>5. QR Code Access and Public Visibility</h2>
            <p style={styles.paragraph}>
              Information made visible through your QR-linked profile may be
              accessed by any person who scans your QR code. You understand and
              accept that profile visibility depends on your settings,
              subscription level, and the functionality of the service at the
              time of access.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Free and Premium Services</h2>
            <p style={styles.paragraph}>
              RROI may offer both free and paid features. Free users may create
              and save a profile subject to the visibility limits of the free
              tier. Premium users may receive additional features, expanded
              public profile visibility, and other paid benefits as described on
              the platform at the time of purchase.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Payments, Renewals, and Cancellation</h2>
            <p style={styles.paragraph}>
              Paid services are billed according to the pricing and renewal
              terms displayed at checkout or on the platform. By purchasing a
              paid service, you authorise the applicable charge. Unless clearly
              stated otherwise at checkout, paid fees are non-refundable except
              where required by law. If a paid subscription is cancelled or
              expires, the account may revert to the applicable free-tier
              visibility and features.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Acceptable Use</h2>
            <p style={styles.paragraph}>
              You may not use RROI unlawfully, fraudulently, abusively, or in a
              way that interferes with the platform, other users, or third
              parties. You may not upload false information, impersonate another
              person, misuse QR profiles, attempt unauthorised access, or use
              the platform in a way that could harm the reputation or operation
              of RROI.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Suspension and Termination</h2>
            <p style={styles.paragraph}>
              RROI may suspend, restrict, or terminate access to the platform,
              with or without notice, if we reasonably believe that you have
              breached these terms, acted unlawfully, created risk for users or
              third parties, or misused the platform.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>10. Privacy and POPIA</h2>
            <p style={styles.paragraph}>
              Your use of RROI is also governed by our Privacy Policy. By using
              the platform and submitting personal or medical information, you
              acknowledge that such information will be processed in accordance
              with our Privacy Policy and applicable South African law,
              including POPIA.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>11. Service Availability</h2>
            <p style={styles.paragraph}>
              RROI does not guarantee uninterrupted availability, continuous QR
              scan performance, immediate accessibility, compatibility with all
              devices, or error-free operation. The platform may be unavailable
              from time to time due to maintenance, connectivity issues,
              third-party services, device limitations, or events beyond our
              control.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>12. Limitation of Liability</h2>
            <p style={styles.paragraph}>
              To the fullest extent permitted by law, RROI and Rooi Veer (Pty)
              Ltd will not be liable for any indirect, consequential, special,
              incidental, or punitive damages, or for any loss, injury, delay,
              claim, cost, or damage arising from or related to the use of the
              platform, reliance on profile information, inability to access a
              QR-linked profile, scanning failures, outages, device issues,
              emergency circumstances, or incorrect user-supplied information.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>13. Indemnity</h2>
            <p style={styles.paragraph}>
              You agree to indemnify and hold harmless RROI and Rooi Veer (Pty)
              Ltd from claims, losses, damages, liabilities, and costs arising
              from your misuse of the platform, your breach of these terms, or
              information that you upload, publish, or make available through
              your profile.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>14. Intellectual Property</h2>
            <p style={styles.paragraph}>
              All platform content, branding, logos, software, design elements,
              and materials made available by RROI remain the property of RROI
              or its licensors unless otherwise stated. You may not copy,
              modify, distribute, or exploit them without prior written
              permission.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>15. Changes to the Terms</h2>
            <p style={styles.paragraph}>
              We may update these Terms &amp; Conditions from time to time. The
              updated version will be posted on this page and will apply from
              the date of publication unless otherwise stated. Continued use of
              the platform after changes are published constitutes acceptance of
              the updated terms.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>16. Governing Law</h2>
            <p style={styles.paragraph}>
              These Terms &amp; Conditions are governed by the laws of the
              Republic of South Africa.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>17. Contact</h2>
            <p style={styles.paragraph}>
              If you have any questions about these Terms &amp; Conditions,
              please contact us at{" "}
              <a href="mailto:support@rroi.co.za" style={styles.link}>
                support@rroi.co.za
              </a>.
            </p>
          </div>

          <PageBottomNav />
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
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
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
    color: "#157A55",
    fontWeight: 700,
    textDecoration: "none",
  },
};