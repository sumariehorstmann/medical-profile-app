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
    <li style={styles.listItem}>Access is considered used immediately upon activation.</li>
  </ul>
  <p style={styles.paragraphSpaced}>
    Refunds will only be considered for duplicate payments, verified billing errors, or where required by applicable law.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>
    3. Custom Physical Products and Personalised QR Items
  </h2>

  <p style={styles.paragraph}>
    RROI physical QR products are made to order and personalised by linking
    them to the customer&apos;s unique RROI Emergency Profile.
  </p>

  <p style={styles.paragraphSpaced}>
    Product colour, engraving appearance, finish, dimensions and shape may vary
    slightly from photographs, mockups and examples because of normal material
    and manufacturing variations.
  </p>

  <p style={styles.paragraphSpaced}>
    To the extent permitted by applicable law, personalised products cannot
    ordinarily be cancelled, returned or refunded merely because the customer
    changes their mind after production has started.
  </p>

  <p style={styles.paragraphSpaced}>
    RROI is not responsible for incorrect names, contact details, medical
    information, delivery details or other information submitted or confirmed
    by the customer. This does not limit any non-excludable rights relating to
    defective, unsafe, incorrectly supplied or materially non-conforming goods.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.sectionTitle}>
    4. Damaged, Defective or Incorrect Items
  </h2>

  <p style={styles.paragraph}>
    Where an item arrives damaged, is defective, differs materially from the
    confirmed order, or the wrong item was supplied, please contact RROI as soon
    as reasonably possible after delivery.
  </p>

  <p style={styles.paragraphSpaced}>
    We request that visible delivery damage or order errors be reported within
    48 hours, together with clear photographs and the relevant order details,
    so that the matter can be investigated promptly. Failure to report within
    48 hours does not remove any rights that cannot lawfully be excluded.
  </p>

  <p style={styles.paragraphSpaced}>
    After assessment, RROI will provide the remedy required by applicable law,
    which may include repair, replacement or refund.
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
    width: "100%",
    minHeight: "100vh",
    background: PAGE_BG,
    padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 16px) 56px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: 900,
    minWidth: 0,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: "clamp(16px, 4vw, 28px)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  topBlock: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: 24,
    textAlign: "center",
  },

  title: {
    margin: 0,
    maxWidth: "100%",
    fontSize: "clamp(30px, 6vw, 36px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  subtitle: {
    width: "100%",
    maxWidth: 680,
    margin: "12px auto 0",
    fontSize: "clamp(15px, 2.5vw, 16px)",
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
  },

  section: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "clamp(16px, 3vw, 20px)",
    background: "#FFFFFF",
    marginBottom: 18,
  },

  sectionTitle: {
    margin: "0 0 10px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 20px)",
    lineHeight: 1.35,
    fontWeight: 800,
    color: TEXT,
    overflowWrap: "break-word",
  },

  paragraph: {
    margin: 0,
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.75,
    color: MUTED,
    overflowWrap: "break-word",
  },

  paragraphSpaced: {
    margin: "12px 0 0",
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.75,
    color: MUTED,
    overflowWrap: "break-word",
  },

  list: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "10px 0 0",
    paddingLeft: 22,
    color: MUTED,
  },
  
  listItem: {
    marginBottom: 8,
    paddingLeft: 3,
    fontSize: 15,
    lineHeight: 1.7,
    overflowWrap: "break-word",
  },

  link: {
    display: "inline",
    maxWidth: "100%",
    color: "#157A55",
    fontWeight: 700,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    overflowWrap: "anywhere",
  },
};