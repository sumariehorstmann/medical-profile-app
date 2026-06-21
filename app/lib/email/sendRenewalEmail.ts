export async function sendRenewalEmail({
  to,
  firstName,
  daysLeft,
}: {
  to: string;
  firstName?: string;
  daysLeft: number;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("Missing BREVO_API_KEY");
    return;
  }

  const subject =
    daysLeft === 30
      ? "Your RROI subscription expires soon"
      : "Final reminder: Your RROI subscription expires in 7 days";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
      
      <h2 style="margin-bottom: 16px;">
        RROI Premium Renewal Reminder
      </h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Hi ${firstName || "there"},
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        Your RROI Premium subscription will expire in 
        <strong>${daysLeft} days</strong>.
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        Renew your Premium subscription to keep your full emergency medical profile publicly visible when your QR code is scanned.
      </p>

      <div style="margin: 30px 0;">
        <a
          href="https://www.rroi.co.za/profile"
          style="
            display: inline-block;
            padding: 14px 24px;
            background: #157A55;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 15px;
          "
        >
          Renew Premium — R129/year
        </a>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        If your subscription expires, your account and saved profile information will remain active, but your public profile will revert to the Free Profile visibility level.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;" />

      <p style="font-size: 12px; color: #64748B; line-height: 1.6;">
        RROI (Rapid Response Online Information)<br />
        www.rroi.co.za
      </p>
    </div>
  `;

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: {
            email: "support@rroi.co.za",
            name: "RROI",
          },
          to: [{ email: to }],
          subject,
          htmlContent,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo email failed:", errorText);
      return;
    }

    console.log(
      `Renewal reminder email sent to ${to} (${daysLeft} days left)`
    );
  } catch (error) {
    console.error("Email send error:", error);
  }
}