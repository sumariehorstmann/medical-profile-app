export default function TermsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Terms & Conditions</h1>

      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>
        These Terms and Conditions govern your use of RROI (Pty) Ltd services.
        By using this platform, you agree to these terms.
      </p>

      <h2>2. Service Description</h2>
      <p>
        RROI provides a QR-based emergency profile system that allows users to store
        and share personal and medical information in emergency situations.
      </p>

      <h2>3. No Medical Advice</h2>
      <p>
        RROI does not provide medical advice. The information stored is user-provided
        and may not be accurate or up to date.
      </p>

      <h2>4. User Responsibility</h2>
      <p>
        You are responsible for ensuring your information is accurate and updated.
        Incorrect or outdated information may lead to incorrect emergency response.
      </p>

      <h2>5. Emergency Use Disclaimer</h2>
      <p>
        RROI is a support tool only. It does not replace professional medical services.
        Always contact official emergency services.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        RROI (Pty) Ltd is not liable for any damages, injury, or loss resulting from:
      </p>
      <ul>
        <li>Incorrect or missing user data</li>
        <li>Failure to access the QR profile</li>
        <li>Technical issues or downtime</li>
      </ul>

      <h2>7. Payments</h2>
      <p>
        Premium features are billed via PayFast. Payments are non-refundable unless required by law.
      </p>

      <h2>8. Termination</h2>
      <p>
        Users may delete their profiles at any time. RROI reserves the right to suspend accounts
        for misuse or abuse.
      </p>

      <h2>9. Changes</h2>
      <p>
        These terms may be updated at any time. Continued use of the service implies acceptance.
      </p>

      <h2>10. Contact</h2>
      <p>
        Email: rapidresponseonlineinfo@gmail.com
      </p>
    </main>
  );
}