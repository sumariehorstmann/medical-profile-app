export const dynamic = "force-dynamic";

export default function BillingSuccessPage() {
  return (
    <main style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Payment submitted</h1>
      <p style={{ fontSize: 16, lineHeight: 1.6 }}>
        Thanks — we&apos;ve received your payment submission.
        <br />
        Your subscription will activate as soon as PayFast confirms it (ITN),
        usually within a minute.
      </p>

      <p style={{ marginTop: 16 }}>
        You can close this page and return to your profile.
      </p>
    </main>
  );
}
