import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "19 April 2026";

  return (
    <main
      style={{
        maxWidth: 860,
        margin: "40px auto",
        padding: "20px",
        color: "#111111",
        lineHeight: 1.65,
      }}
    >
      <PageHeader />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 20,
          padding: "28px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            fontSize: 40,
            lineHeight: 1.1,
            margin: "0 0 10px",
            fontWeight: 900,
          }}
        >
          Privacy Policy
        </h1>

        <p style={{ margin: "0 0 24px", color: "#4B5563", fontSize: 15 }}>
          <strong>Last updated:</strong> {lastUpdated}
        </p>

        <h2 style={sectionTitle}>1. Introduction</h2>
        <p style={paragraph}>
          RROI (Pty) Ltd respects your privacy and is committed to protecting
          your personal information in accordance with the Protection of
          Personal Information Act, 4 of 2013 (&quot;POPIA&quot;) of South
          Africa.
        </p>
        <p style={paragraph}>
          This Privacy Policy explains what information we collect, how we use
          it, when it may be shared, and what rights you have in relation to
          your personal information when using the RROI platform.
        </p>

        <h2 style={sectionTitle}>2. What We Do</h2>
        <p style={paragraph}>
          RROI provides a digital emergency profile accessible through a QR
          code. Users may store emergency, medical, and related personal
          information so that limited or full profile information can be viewed
          when the QR code is scanned, depending on the user&apos;s selected
          plan.
        </p>

        <h2 style={sectionTitle}>3. Information We Collect</h2>
        <ul style={listStyle}>
          <li>Name and surname</li>
          <li>Emergency contact information</li>
          <li>Medical and health-related information provided by the user</li>
          <li>Optional profile information entered by the user</li>
          <li>Account information such as email address and login details</li>
          <li>Order, subscription, and payment-related records where applicable</li>
        </ul>

        <h2 style={sectionTitle}>4. How We Collect Information</h2>
        <p style={paragraph}>
          We collect personal information directly from you when you register,
          complete or update your profile, place an order, subscribe to a paid
          plan, contact us, or otherwise use the platform.
        </p>
        <p style={paragraph}>
          Some limited technical information may also be collected automatically
          through normal website and platform operation.
        </p>

        <h2 style={sectionTitle}>5. Purpose of Processing</h2>
        <p style={paragraph}>We use your personal information to:</p>
        <ul style={listStyle}>
          <li>Create, maintain, and display your RROI profile</li>
          <li>Enable emergency access through your QR code</li>
          <li>Manage subscriptions, renewals, and product orders</li>
          <li>Communicate with you about your account or service updates</li>
          <li>Provide support and respond to queries</li>
          <li>Improve, secure, and administer the platform</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>

        <h2 style={sectionTitle}>6. Legal Basis for Processing</h2>
        <p style={paragraph}>
          We process your personal information with your consent and where
          necessary to provide the services you request through the RROI
          platform.
        </p>
        <p style={paragraph}>
          By creating an account, completing your profile, or submitting
          information through the platform, you consent to the processing of
          that information for the purposes described in this Privacy Policy.
        </p>

        <h2 style={sectionTitle}>7. Special Personal Information</h2>
        <p style={paragraph}>
          RROI may process special personal information, including health and
          medical information, where you choose to provide it for emergency
          access purposes.
        </p>
        <p style={paragraph}>
          This information is processed only for the operation of your profile,
          emergency visibility functionality, and related service administration
          in line with your use of the platform and consent.
        </p>

        <h2 style={sectionTitle}>8. Public Visibility of Your Profile</h2>
        <p style={paragraph}>
          RROI is designed to make certain information visible when a QR code is
          scanned in an emergency.
        </p>
        <ul style={listStyle}>
          <li>
            <strong>Free users:</strong> only limited profile information is
            publicly displayed.
          </li>
          <li>
            <strong>Premium users:</strong> a broader set of profile information
            may be publicly displayed when the QR code is scanned.
          </li>
        </ul>
        <p style={paragraph}>
          You are responsible for deciding what information you choose to store
          on the platform.
        </p>

        <h2 style={sectionTitle}>9. Sharing of Information</h2>
        <p style={paragraph}>
          We do not sell your personal information.
        </p>
        <p style={paragraph}>
          We may share personal information only where necessary with:
        </p>
        <ul style={listStyle}>
          <li>People who scan your QR code and view your public profile</li>
          <li>
            Service providers that help us operate the platform, such as hosting,
            database, payment, and infrastructure providers
          </li>
          <li>Professional advisers where reasonably necessary</li>
          <li>Authorities or other parties where required by law</li>
        </ul>

        <h2 style={sectionTitle}>10. Data Storage and Security</h2>
        <p style={paragraph}>
          Personal information is stored using third-party cloud infrastructure,
          including Supabase, and related service providers used to operate the
          platform.
        </p>
        <p style={paragraph}>
          We take reasonable technical and organisational measures to help
          protect personal information against loss, misuse, unauthorised
          access, disclosure, alteration, or destruction.
        </p>
        <p style={paragraph}>
          No method of electronic storage or transmission is completely secure,
          and we cannot guarantee absolute security.
        </p>

        <h2 style={sectionTitle}>11. Data Retention</h2>
        <p style={paragraph}>
          We retain personal information for as long as your account remains
          active, or for as long as reasonably necessary to provide the service,
          maintain records, resolve disputes, enforce agreements, and comply
          with legal obligations.
        </p>
        <p style={paragraph}>
          If you delete your account, we will take reasonable steps to delete or
          de-identify your personal information, subject to any legal,
          administrative, payment, fraud prevention, or record-keeping
          requirements that require retention.
        </p>

        <h2 style={sectionTitle}>12. Your Rights</h2>
        <p style={paragraph}>
          Subject to POPIA and applicable law, you may have the right to:
        </p>
        <ul style={listStyle}>
          <li>Access the personal information we hold about you</li>
          <li>Request correction or updating of your information</li>
          <li>Request deletion of your information where appropriate</li>
          <li>Object to certain processing in limited circumstances</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Lodge a complaint with the Information Regulator</li>
        </ul>

        <h2 style={sectionTitle}>13. Emergency Contacts and Third-Party Information</h2>
        <p style={paragraph}>
          If you provide personal information relating to another person, such
          as an emergency contact, you confirm that you are authorised to
          provide that information and that the relevant person understands that
          their details may be stored and displayed for emergency use.
        </p>

        <h2 style={sectionTitle}>14. Changes to This Policy</h2>
        <p style={paragraph}>
          We may update this Privacy Policy from time to time. The latest
          version will always be published on this page with the updated
          effective date shown above.
        </p>

        <h2 style={sectionTitle}>15. Contact</h2>
        <p style={paragraph}>
          <strong>RROI (Pty) Ltd</strong>
          <br />
          Email: support@rroi.co.za
        </p>
        <p style={paragraph}>
  If you believe your personal information has been handled unlawfully,
  you may also lodge a complaint with the South African Information Regulator.
</p>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontWeight: 900,
              color: "#FFFFFF",
              background: "#157A55",
              padding: "12px 18px",
              borderRadius: 12,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 28,
  lineHeight: 1.2,
  marginTop: 28,
  marginBottom: 10,
  fontWeight: 900,
};

const paragraph: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 17,
};

const listStyle: React.CSSProperties = {
  marginTop: 6,
  marginBottom: 14,
  paddingLeft: 24,
  fontSize: 17,
  lineHeight: 1.7,
};