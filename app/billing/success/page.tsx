"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";

function BillingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState(
    "We are waiting for PayFast to confirm your payment."
  );
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    const paymentId = searchParams.get("payment_id");

    let mounted = true;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    

    async function checkPayment() {
      try {
        if (!paymentId) {
          if (!mounted) return;
          setChecking(false);
          setMessage("Payment submitted. You can go to your profile now.");
          return;
        }

        const res = await fetch(
  `/api/payment-status?payment_id=${encodeURIComponent(paymentId)}`
);

const result = await res.json();

if (!res.ok) {
  throw new Error(result?.status || "payment_status_error");
}

if (!mounted) return;

if (result.status === "paid") {
          setChecking(false);
          setMessage(
  "Payment successful. Your profile has been upgraded to Premium."
);

          if (pollInterval) clearInterval(pollInterval);

          
        }
      } catch (err) {
        console.error("Billing success error:", err);

        if (!mounted) return;
        setChecking(false);
        setMessage("We could not verify your payment automatically yet.");
      }
    }

    checkPayment();

    pollInterval = setInterval(() => {
      checkPayment();
    }, 4000);

    timeoutHandle = setTimeout(() => {
      if (!mounted) return;
      if (pollInterval) clearInterval(pollInterval);
      setChecking(false);
      setMessage(
        "Payment submitted successfully. Your subscription may take a little longer to confirm. You can go to your profile now."
      );
    }, 45000);

    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [router, searchParams]);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Payment Successful</h1>

        <p style={styles.p}>Thanks. We have received your payment submission.</p>

        <p style={styles.p}>
  Your Premium subscription is now active.
</p>

        <div style={styles.statusBox}>
          <div style={styles.statusTitle}>Status</div>
          <div style={styles.statusText}>{message}</div>

          {checking && (
  <div style={styles.checkingText}>Checking payment status...</div>
)}
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            style={styles.primaryBtn}
            onClick={() => router.push("/profile")}
          >
            Go to Profile
          </button>

          <button
            type="button"
            style={styles.secondaryBtn}
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    </main>
  );
}
export default function BillingSuccessPage() {
  return (
    <Suspense fallback={null}>
      <BillingSuccessContent />
    </Suspense>
  );
}
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    background: "#F8FAFC",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#FFFFFF",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 14px 42px rgba(15, 23, 42, 0.08)",
  },
  h1: {
    fontSize: 32,
    fontWeight: 900,
    color: TEXT,
    margin: "0 0 14px",
  },
  p: {
    fontSize: 16,
    lineHeight: 1.6,
    color: TEXT,
    margin: "0 0 10px",
  },
  statusBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 14,
    border: `1px solid ${BORDER}`,
    background: "#F8FAFC",
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: MUTED,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 700,
    color: TEXT,
    lineHeight: 1.6,
  },
  checkingText: {
    marginTop: 10,
    fontSize: 14,
    color: BRAND_GREEN,
    fontWeight: 700,
  },
  
  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 20,
  },
  primaryBtn: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px 16px",
    borderRadius: 12,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    fontWeight: 800,
    cursor: "pointer",
  },
};
