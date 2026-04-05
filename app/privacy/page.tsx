import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <PageHeader />

      <h1>Privacy Policy</h1>

      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>
        RROI (Pty) Ltd respects your privacy and is committed to protecting your personal information
        in accordance with the Protection of Personal Information Act (POPIA) of South Africa.
      </p>

      <h2>2. What We Do</h2>
      <p>
        RROI provides a digital emergency profile accessible via QR code, allowing users to store
        important emergency and medical information.
      </p>

      <h2>3. Information We Collect</h2>
      <ul>
        <li>Name and surname</li>
        <li>Emergency contact details</li>
        <li>Medical information (if provided)</li>
        <li>Optional personal details</li>
      </ul>

      <h2>4. Purpose of Processing</h2>
      <p>
        Your information is used to provide emergency access to your profile and improve the service.
      </p>

      <h2>5. Public Visibility</h2>
      <p>
        Free users display limited information. Premium users display full profiles when QR codes are scanned.
      </p>

      <h2>6. Data Storage</h2>
      <p>
        Data is stored securely using Supabase cloud infrastructure.
      </p>

      <h2>7. Data Sharing</h2>
      <p>
        We do not sell your data. Information is only shared when your QR code is accessed or when required by law.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        You may access, update, or delete your data at any time.
      </p>

      <h2>9. Contact</h2>
      <p>
        Email: rapidresponseonlineinfo@gmail.com
      </p>

      {/* Back to Home Button */}
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            fontWeight: 900,
            color: "#FFFFFF",
            background: "#157A55",
            padding: "12px 18px",
            borderRadius: 12,
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}