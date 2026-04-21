export default function RefundPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-slate-800">
      <h1 className="text-3xl font-semibold mb-8">Refund & Returns Policy</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          RROI provides both digital services and custom-manufactured physical
          products. Due to the nature of these offerings, specific refund and
          return conditions apply.
        </p>
        <p>
          By completing a purchase, you agree to the terms outlined in this
          policy.
        </p>

        <h2 className="text-lg font-semibold mt-8">
          1. Digital Products (Premium Subscription)
        </h2>
        <p>
          RROI Premium is a digital service that provides enhanced profile
          visibility and functionality.
        </p>
        <p>
          Once payment has been successfully processed and Premium access has
          been activated:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Payments are non-refundable</li>
          <li>Access is considered used immediately upon activation</li>
        </ul>
        <p>Refunds will only be considered in the following cases:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Duplicate payment</li>
          <li>Verified billing error</li>
          <li>Where required by applicable law</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8">
          2. Custom Physical Products (QR Items)
        </h2>
        <p>
          All RROI physical products are made to order, custom-linked to a
          user’s unique QR profile, and manufactured specifically for each
          customer.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No cancellations are allowed once payment has been made</li>
          <li>
            No returns or refunds are accepted for change of mind or incorrect
            information submitted by the user
          </li>
        </ul>
        <p>
          Customers are responsible for ensuring that all submitted details are
          accurate before completing payment.
        </p>

        <h2 className="text-lg font-semibold mt-8">
          3. Damaged, Defective, or Incorrect Items
        </h2>
        <p>We will replace or refund an order only if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The item arrives damaged</li>
          <li>The item is defective</li>
          <li>The item does not match the confirmed order details</li>
          <li>The wrong item was sent</li>
        </ul>
        <p>To qualify:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The issue must be reported within 48 hours of delivery</li>
          <li>Clear photographic evidence must be provided</li>
        </ul>
        <p>
          RROI reserves the right to assess each claim before approving a
          replacement or refund.
        </p>

        <h2 className="text-lg font-semibold mt-8">
          4. Shipping and Delivery Issues
        </h2>
        <p>
          RROI uses third-party courier services for delivery. We are not
          responsible for delays caused by courier services or incorrect
          delivery details provided by the customer.
        </p>
        <p>
          If a parcel is lost or damaged in transit, we will assist in resolving
          the issue with the courier.
        </p>

        <h2 className="text-lg font-semibold mt-8">
          5. Refund Processing (If Applicable)
        </h2>
        <p>
          If a refund is approved, it will be processed via the original payment
          method where possible.
        </p>
        <p>Processing time: 5–10 business days</p>

        <h2 className="text-lg font-semibold mt-8">6. Contact</h2>
        <p>
          Email:{" "}
          <a
            href="mailto:support@rroi.co.za"
            className="text-blue-600 underline"
          >
            support@rroi.co.za
          </a>
        </p>
        <p>Website: www.rroi.co.za</p>
      </section>
    </main>
  );
}