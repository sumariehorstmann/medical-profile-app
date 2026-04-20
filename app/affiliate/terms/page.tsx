import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function AffiliateTermsPage() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      
      <PageHeader />

      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ marginBottom: 10 }}>Affiliate Terms</h1>

        <h2>1. Overview</h2>
        <p>
          These Affiliate Terms apply to participants in the RROI Affiliate Program.
          By participating in the program, you agree to these terms in addition to
          RROI’s Terms and Privacy Policy.
        </p>

        <h2>2. Who Can Apply</h2>
        <p>
          To apply to become an RROI affiliate, you must be logged in as an active
          Premium subscriber.
        </p>
        <p>
          If you already have a Premium subscription, please log in and go to your
          profile page to apply.
        </p>
        <p>
          If you have a free profile, please log in and upgrade to Premium first.
        </p>
        <p>
          If you do not yet have a profile, please sign up, log in, upgrade to
          Premium, and then apply to become an affiliate from your profile.
        </p>

        <h2>3. Affiliate Code</h2>
        <p>
          Once your affiliate account is created successfully, you will receive a
          unique affiliate code, which will also appear on your profile page.
        </p>

        <h2>4. Discount and Commission</h2>
        <p>
          Customers using your affiliate code receive a discount on the Premium
          upgrade. You will earn a commission on each successful payment made using
          your code.
        </p>

        <h2>5. Payouts</h2>
        <p>
          Commissions are paid out quarterly, provided the minimum payout threshold
          is reached. RROI reserves the right to adjust payout schedules if required.
        </p>

        <h2>6. Affiliate Responsibilities</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Promote RROI honestly and ethically</li>
          <li>Do not provide misleading information</li>
          <li>Do not spam or misuse marketing channels</li>
        </ul>

        <h2>7. Termination</h2>
        <p>
          RROI reserves the right to revoke affiliate access if these terms are
          violated or if misuse is detected.
        </p>

        <h2>8. Changes</h2>
        <p>
          These terms may be updated at any time. Continued participation implies
          acceptance of the updated terms.
        </p>
      </div>

      {/* Back to Home Button */}
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            fontWeight: 900,
            color: "#FFFFFF",
            background: "#157A55",
            padding: "14px 22px",
            borderRadius: 16,
            fontSize: 16,
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}