"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function RefundPolicyPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

<div style={styles.topBlock}>
  <h1 style={styles.title}>Refund &amp; Returns Policy</h1>
  <p style={styles.subtitle}>
    RROI provides both digital services and custom-manufactured physical products.
    Due to the nature of these offerings, specific refund and return conditions
    apply. By completing a purchase, you agree to the terms outlined in this policy.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>1. Responsible Party</h2>
  <p style={styles.paragraph}>
    This Refund &amp; Returns Policy applies to purchases made from RROI (Pty) Ltd, South Africa.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>2. Digital Products (Premium Subscription)</h2>
  <p style={styles.paragraph}>
    RROI Premium is a digital service that provides enhanced profile visibility and functionality.
  </p>
  <p style={styles.paragraphSpaced}>
    Once payment has been successfully processed and Premium access has been activated:
  </p>
  <ul style={styles.list}>
    <li style={styles.listItem}>Payments are generally non-refundable once Premium access has been activated.</li>
    <li style={styles.listItem}>Access is considered used immediately upon activation</li>
  </ul>
  <p style={styles.paragraphSpaced}>
    Refunds will only be considered for duplicate payments, verified billing errors, or where required by applicable law.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>3. Custom Physical Products (QR Items)</h2>
  <p style={styles.paragraph}>
    All RROI physical products are made to order, custom-linked to a user&apos;s unique QR profile, and manufactured specifically for each customer.
  </p>
  <p style={styles.paragraphSpaced}>
    Product colour, engraving appearance, finish, and shape may vary slightly from product images due to material and manufacturing differences.
  </p>
  <p style={styles.paragraphSpaced}>
  Product photographs, mockups, and examples are provided for illustrative purposes only.
</p>
  <ul style={styles.listSpaced}>
    <li style={styles.listItem}>No cancellations are allowed once payment has been made</li>
    <li style={styles.listItem}>No returns or refunds are accepted for change of mind or incorrect information submitted by the user</li>
  </ul>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>4. Damaged, Defective, or Incorrect Items</h2>
  <p style={styles.paragraph}>
    RROI will replace or refund an order only if the item arrives damaged, is defective, does not match the confirmed order details, or the wrong item was sent.
  </p>
  <p style={styles.paragraphSpaced}>
    The issue must be reported within 48 hours of delivery and clear photographic evidence must be provided.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>5. Shipping and Delivery Issues</h2>
  <p style={styles.paragraph}>
    Physical products are made to order and are typically manufactured and delivered within 7–14 working days, unless otherwise stated.
  </p>
  <p style={styles.paragraphSpaced}>
    RROI uses third-party courier services for delivery. While RROI will assist in resolving courier-related issues, delivery times are estimates only and may be affected by courier delays, weather, public holidays, remote locations, or circumstances beyond our reasonable control.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>6. Refund Processing</h2>
  <p style={styles.paragraph}>
    If a refund is approved, it will be processed via the original payment method where possible. Processing time: 5–10 business days.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>7. Contact</h2>
  <p style={styles.paragraph}>
    If you have any questions about this Refund &amp; Returns Policy, please contact us at{" "}
    <a href="mailto:support@rroi.co.za" style={styles.link}>
      support@rroi.co.za
    </a>.
  </p>
</div>

<PageBottomNav />
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
    maxWidth: 650,
  },
  section: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
    marginBottom: 18,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT,
  },
  paragraph: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  paragraphSpaced: {
    margin: "12px 0 0",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  list: {
    margin: "10px 0 0 22px",
    padding: 0,
    color: MUTED,
  },
  listSpaced: {
    margin: "12px 0 0 22px",
    padding: 0,
    color: MUTED,
  },
  listItem: {
    marginBottom: 8,
    fontSize: 15,
    lineHeight: 1.7,
  },
  link: {
    color: "#157A55",
    fontWeight: 700,
    textDecoration: "none",
  },
};