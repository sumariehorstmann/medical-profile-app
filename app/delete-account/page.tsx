import PageHeader from "@/components/PageHeader";
import DeleteAccountClient from "./DeleteAccountClient";

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

        <DeleteAccountClient />
      </div>
    </main>
  );
}