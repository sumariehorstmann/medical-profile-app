import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "1. Digital Products (Premium Subscription)",
    content: (
      <>
        <p className="text-[17px] leading-8 text-slate-600">
          RROI Premium is a digital service that provides enhanced profile
          visibility and functionality.
        </p>

        <p className="mt-4 text-[17px] leading-8 text-slate-600">
          Once payment has been successfully processed and Premium access has
          been activated:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600">
          <li>Payments are non-refundable</li>
          <li>Access is considered used immediately upon activation</li>
        </ul>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">
          Refunds will only be considered in the following cases:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600">
          <li>Duplicate payment</li>
          <li>Verified billing error</li>
          <li>Where required by applicable law</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Custom Physical Products (QR Items)",
    content: (
      <>
        <p className="text-[17px] leading-8 text-slate-600">
          All RROI physical products are made to order, custom-linked to a
          user&apos;s unique QR profile, and manufactured specifically for each
          customer.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600">
          <li>No cancellations are allowed once payment has been made</li>
          <li>
            No returns or refunds are accepted for change of mind or incorrect
            information submitted by the user
          </li>
        </ul>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">
          Customers are responsible for ensuring that all submitted details are
          accurate before completing payment.
        </p>
      </>
    ),
  },
  {
    title: "3. Damaged, Defective, or Incorrect Items",
    content: (
      <>
        <p className="text-[17px] leading-8 text-slate-600">
          We will replace or refund an order only if:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600">
          <li>The item arrives damaged</li>
          <li>The item is defective</li>
          <li>The item does not match the confirmed order details</li>
          <li>The wrong item was sent</li>
        </ul>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">To qualify:</p>

        <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-600">
          <li>The issue must be reported within 48 hours of delivery</li>
          <li>Clear photographic evidence must be provided</li>
        </ul>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">
          RROI reserves the right to assess each claim before approving a
          replacement or refund.
        </p>
      </>
    ),
  },
  {
    title: "4. Shipping and Delivery Issues",
    content: (
      <>
        <p className="text-[17px] leading-8 text-slate-600">
          RROI uses third-party courier services for delivery. We are not
          responsible for delays caused by courier services or incorrect
          delivery details provided by the customer.
        </p>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">
          If a parcel is lost or damaged in transit, we will assist in resolving
          the issue with the courier.
        </p>
      </>
    ),
  },
  {
    title: "5. Refund Processing (If Applicable)",
    content: (
      <>
        <p className="text-[17px] leading-8 text-slate-600">
          If a refund is approved, it will be processed via the original payment
          method where possible.
        </p>

        <p className="mt-5 text-[17px] leading-8 text-slate-600">
          Processing time: 5–10 business days.
        </p>
      </>
    ),
  },
  {
    title: "6. Contact",
    content: (
      <div className="space-y-4">
        <p className="text-[17px] leading-8 text-slate-600">
          Email:{" "}
          <a
            href="mailto:support@rroi.co.za"
            className="font-medium text-emerald-700 underline underline-offset-4"
          >
            support@rroi.co.za
          </a>
        </p>

        <p className="text-[17px] leading-8 text-slate-600">
          Website:{" "}
          <a
            href="https://www.rroi.co.za"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-emerald-700 underline underline-offset-4"
          >
            www.rroi.co.za
          </a>
        </p>
      </div>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo.png"
              alt="RROI logo"
              width={180}
              height={180}
              className="h-auto w-[130px] sm:w-[160px]"
              priority
            />

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Refund &amp; Returns Policy
            </h1>

            <div className="mt-6 max-w-3xl space-y-3">
              <p className="text-[18px] leading-8 text-slate-600">
                RROI provides both digital services and custom-manufactured
                physical products.
              </p>
              <p className="text-[18px] leading-8 text-slate-600">
                Due to the nature of these offerings, specific refund and return
                conditions apply.
              </p>
              <p className="text-[18px] leading-8 text-slate-600">
                By completing a purchase, you agree to the terms outlined in
                this policy.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[24px] border border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {section.title}
                </h2>
                <div className="mt-5">{section.content}</div>
              </section>
            ))}
          </div>
        </div>

        <footer className="mt-8 pb-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 RROI. All rights reserved.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-emerald-700">
            <Link href="/terms" className="hover:underline">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/refund-policy" className="hover:underline">
              Refund &amp; Returns Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}