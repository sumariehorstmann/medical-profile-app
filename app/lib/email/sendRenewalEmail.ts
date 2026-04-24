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
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>RROI Subscription Renewal</h2>

      <p>Hi ${firstName || "there"},</p>

      <p>Your RROI Premium subscription will expire in <strong>${daysLeft} days</strong>.</p>

      <p>
        To keep your full emergency profile visible, please renew your subscription.
      </p>

      <a href="https://www.rroi.co.za/profile"
         style="display:inline-block;padding:12px 20px;background:#157A55;color:#fff;text-decoration:none;border-radius:6px;">
         Renew Now (R99/year)
      </a>

      <p style="margin-top:20px;font-size:12px;color:#777;">
        If you do not renew, your profile will remain active but revert to the free public view.
      </p>
    </div>
  `;

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
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
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}