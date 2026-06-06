type StoreOrderItem = {
  name?: string;
  quantity?: number;
  unit_price?: number;
  total?: number;
};

export async function sendStoreOrderConfirmationEmail({
  to,
  customerName,
  paymentReference,
  items,
  totalAmount,
}: {
  to: string;
  customerName?: string;
  paymentReference: string;
  items?: StoreOrderItem[];
  totalAmount: number;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("Missing BREVO_API_KEY");
    return false;
  }

  const safeItems = Array.isArray(items) ? items : [];

  const itemsHtml =
    safeItems.length > 0
      ? safeItems
          .map(
            (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #E5E7EB;">
                  ${item.name || "RROI Product"}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #E5E7EB; text-align: center;">
                  ${item.quantity || 0}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #E5E7EB; text-align: right;">
                  R${Number(item.total || 0).toFixed(2)}
                </td>
              </tr>
            `
          )
          .join("")
      : `
          <tr>
            <td colspan="3" style="padding: 10px; border-bottom: 1px solid #E5E7EB;">
              RROI store order
            </td>
          </tr>
        `;

  const subject = "RROI Order Confirmation";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
      <h2 style="margin-bottom: 16px;">Order Confirmation</h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Hi ${customerName || "there"},
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        Thank you. Your payment was successful and your RROI order has been received. Your order is now in our production queue.
      </p>

      <p style="font-size: 15px; line-height: 1.6;">
        <strong>Order reference:</strong> ${paymentReference}
      </p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 2px solid #E5E7EB;">Product</th>
            <th style="text-align: center; padding: 10px; border-bottom: 2px solid #E5E7EB;">Qty</th>
            <th style="text-align: right; padding: 10px; border-bottom: 2px solid #E5E7EB;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="font-size: 16px; line-height: 1.6;">
        <strong>Total paid:</strong> R${Number(totalAmount || 0).toFixed(2)}
      </p>

      <p style="font-size: 15px; line-height: 1.6;">
        Your order is custom made. Manufacturing and delivery can take approximately 
        <strong>7–14 working days</strong>. We will process your order as soon as possible.
      </p>

      <p style="font-size: 15px; line-height: 1.6;">
        If you need assistance, contact us at 
        <a href="mailto:support@rroi.co.za" style="color: #157A55;">support@rroi.co.za</a>.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;" />

      <p style="font-size: 12px; color: #64748B; line-height: 1.6;">
        RROI (Rapid Response Online Information)<br />
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
  console.error("Brevo store order email failed:", errorText);
  return false;
}

console.log(`Store order confirmation email sent to ${to}`);
return true;
} catch (error) {
  console.error("Store order email send error:", error);
  return false;
}
}