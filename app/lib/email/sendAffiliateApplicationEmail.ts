type AffiliateEmailStatus =
  | "submitted"
  | "new_application"
  | "approved"
  | "declined";

type SendAffiliateApplicationEmailArgs = {
  to: string;
  firstName?: string | null;
  status: AffiliateEmailStatus;
  affiliateCode?: string | null;
  applicantEmail?: string | null;
  applicantPhone?: string | null;
  province?: string | null;
  city?: string | null;
  promotionMethod?: string | null;
};

export async function sendAffiliateApplicationEmail({
  to,
  firstName,
  status,
  affiliateCode,
  applicantEmail,
  applicantPhone,
  province,
  city,
  promotionMethod,
}: SendAffiliateApplicationEmailArgs) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set.");
    return;
  }

  const name = firstName?.trim() || "there";

  const subject =
    status === "submitted"
      ? "Your RROI affiliate application has been received"
      : status === "new_application"
      ? "New RROI affiliate application to review"
      : status === "approved"
      ? "Your RROI affiliate application has been approved"
      : "Your RROI affiliate application update";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
      <div style="max-width:620px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; padding:28px;">
        <h1 style="margin:0 0 14px; color:#0f172a; font-size:24px;">
          ${
            status === "new_application"
              ? "New affiliate application"
              : status === "approved"
              ? "Affiliate application approved"
              : "Affiliate application update"
          }
        </h1>

        ${
          status === "new_application"
            ? `
              <p style="font-size:16px; color:#334155; line-height:1.6;">
                A new RROI affiliate application has been submitted and is ready for review.
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                <strong>Name:</strong> ${name}<br />
                <strong>Email:</strong> ${applicantEmail || "-"}<br />
                <strong>Phone:</strong> ${applicantPhone || "-"}<br />
                <strong>Province:</strong> ${province || "-"}<br />
                <strong>City:</strong> ${city || "-"}<br />
                <strong>Promotion method:</strong> ${promotionMethod || "-"}
              </p>

              <div style="margin:24px 0;">
                <a href="https://www.rroi.co.za/admin/affiliate-applications"
                   style="display:inline-block; background:#157A55; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:700;">
                  Review Application
                </a>
              </div>
            `
            : status === "submitted"
            ? `
              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Hi ${name},
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Thank you for applying to become an RROI affiliate.
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Your application has been received successfully and is currently under review.
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Applications are reviewed manually and approval or decline typically takes place within 14 calendar days.
              </p>
            `
            : status === "approved"
            ? `
              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Hi ${name},
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Your RROI affiliate application has been approved.
              </p>

              ${
                affiliateCode
                  ? `<p style="font-size:16px; color:#334155; line-height:1.6;">
                      Your affiliate code is: <strong>${affiliateCode}</strong>
                    </p>`
                  : ""
              }

              <div style="margin:24px 0;">
                <a href="https://www.rroi.co.za/affiliate/dashboard"
                   style="display:inline-block; background:#157A55; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:700;">
                  Open Affiliate Dashboard
                </a>
              </div>
            `
            : `
              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Hi ${name},
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                Thank you for applying to become an RROI affiliate.
              </p>

              <p style="font-size:16px; color:#334155; line-height:1.6;">
                After review, your application was not approved at this stage.
              </p>
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