import PageHeader from "@/components/PageHeader";

export default function DeleteAccountPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <PageHeader />

        <h1
          style={{
            fontSize: 34,
            fontWeight: 900,
            marginBottom: 16,
          }}
        >
          Delete RROI Account
        </h1>

        <div
          style={{
            background: "#fff5f5",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h2
            style={{
              color: "#991b1b",
              marginTop: 0,
            }}
          >
            Permanently Delete Account
          </h2>

          <p>
            This page allows you to permanently delete your RROI account and
            all associated emergency profile information.
          </p>

          <p>
            You must be logged in before you can delete your account.
          </p>

          <a
            href="/login"
            style={{
              display: "inline-block",
              marginTop: 20,
              padding: "12px 18px",
              background: "#157A55",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </main>
  );
}