type AffiliateEmailStatus =
  | "submitted"
  | "approved"
  | "declined";

type SendAffiliateApplicationEmailArgs = {
  to: string;
  firstName?: string | null;
  status: AffiliateEmailStatus;
};

export async function sendAffiliateApplicationEmail({
  to,
  firstName,
  status,
}: SendAffiliateApplicationEmailArgs) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set.");
    return;
  }

  const name = firstName?.trim() || "there";

  const isApproved = status === "approved";
const isSubmitted = status === "submitted";

const subject =
  status === "submitted"
    ? "Your RROI affiliate application has been received"
    : status === "approved"
    ? "Your RROI affiliate application has been approved"
    : "Your RROI affiliate application update";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
      <div style="max-width:620px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; padding:28px;">
        <h1 style="margin:0 0 14px; color:#0f172a; font-size:24px;">
          ${isApproved ? "Affiliate application approved" : "Affiliate application update"}
        </h1>

        <p style="font-size:16px; color:#334155; line-height:1.6;">
          Hi ${name},
        </p>

        ${
  isSubmitted
    ? `
      <p style="font-size:16px; color:#334155; line-height:1.6;">
        Thank you for applying to become an RROI affiliate.
      </p>

      <p style="font-size:16px; color:#334155; line-height:1.6;">
        Your application has been received successfully and is currently under review.
      </p>

      <p style="font-size:16px; color:#334155; line-height:1.6;">
        Applications are reviewed manually and approval or decline typically takes place within 14 calendar days.
      </p>

      <div style="margin:24px 0;">
        <a href="https://www.rroi.co.za/affiliate/terms"
           style="display:inline-block; background:#157A55; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:700;">
          View Affiliate Terms
        </a>
      </div>
    `
    : isApproved
    ? `
      <p style="font-size:16px; color:#334155; line-height:1.6;">
        Your RROI affiliate application has been approved.
      </p>

      <p style="font-size:16px; color:#334155; line-height:1.6;">
        You can now access your affiliate dashboard, view your affiliate code,
        copy your referral link, and access official marketing resources.
      </p>

      <div style="margin:24px 0;">
        <a href="https://www.rroi.co.za/affiliate/dashboard"
           style="display:inline-block; background:#157A55; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:700;">
          Open Affiliate Dashboard
        </a>
      </div>
    `
    : `
      <p style="font-size:16px; color:#334155; line-height:1.6;">
        Thank you for applying to become an RROI affiliate.
      </p>

      <p style="font-size:16px; color:#334155; line-height:1.6;">
        After review, your application was not approved at this stage.
      </p>

      <p style="font-size:16px; color:#334155; line-height:1.6;">
        You may contact RROI if you would like to ask whether re-application may be possible in future.
      </p>

      <div style="margin:24px 0;">
        <a href="https://www.rroi.co.za/contact"
           style="display:inline-block; background:#157A55; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:700;">
          Contact RROI
        </a>
      </div>
    `
}

        <p style="font-size:14px; color:#64748b; line-height:1.6; margin-top:24px;">
          RROI (Pty) Ltd<br />
          Rapid Response Online Information
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
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

    if (!res.ok) {
      const text = await res.text();
      console.error("Affiliate email send failed:", text);
    }
  } catch (error) {
    console.error("Affiliate email send error:", error);
  }
}
