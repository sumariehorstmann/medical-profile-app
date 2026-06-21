export async function sendTrackingEmail({
  to,
  customerName,
  orderReference,
  courierName,
  trackingNumber,
  trackingUrl,
}: {
  to: string;
  customerName?: string | null;
  orderReference: string;
  courierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("Missing BREVO_API_KEY");
    return false;
  }

  const subject = "Your RROI Order Has Been Shipped";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
      <h2>Your RROI Order Has Been Shipped</h2>

      <p>Hi ${customerName || "there"},</p>

      <p>Your RROI order has been shipped and is on its way to you.</p>

      <p><strong>Order reference:</strong> ${orderReference}</p>

      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:12px;padding:16px;margin:20px 0;">
        <p><strong>Courier:</strong> ${courierName || "-"}</p>
        <p><strong>Tracking number:</strong> ${trackingNumber || "-"}</p>
        ${
          trackingUrl
            ? `<p><a href="${trackingUrl}" style="color:#157A55;font-weight:bold;">Track your parcel</a></p>`
            : ""
        }
      </div>

      <p>If you need assistance, contact us at <a href="mailto:support@rroi.co.za" style="color:#157A55;">support@rroi.co.za</a>.</p>

      <hr style="margin:30px 0;border:none;border-top:1px solid #E5E7EB;" />

      <p style="font-size:12px;color:#64748B;">
        RROI (Rapid Response Online Information)<br />
        Emergency information when it matters most.<br />
        www.rroi.co.za
      </p>
    </div>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo tracking email failed:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Tracking email send error:", error);
    return false;
  }
}
