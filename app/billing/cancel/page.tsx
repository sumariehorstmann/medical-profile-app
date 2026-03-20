export const dynamic = "force-dynamic";

export default function BillingCancelPage() {
  return (
    <main style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Payment cancelled</h1>

      <p style={{ fontSize: 16, lineHeight: 1.6 }}>
        Your payment was not completed.
        <br />
        No charges were made.
      </p>

      <p style={{ marginTop: 16 }}>
        You can return to your profile and try again at any time.
      </p>
    </main>
  );
}
