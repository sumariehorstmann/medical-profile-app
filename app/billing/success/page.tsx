"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";

export default function BillingSuccessPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();

  const [message, setMessage] = useState(
    "We are waiting for PayFast to confirm your payment."
  );
  const [checking, setChecking] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let mounted = true;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let redirectInterval: ReturnType<typeof setInterval> | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    async function checkSubscription() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          if (!mounted) return;
          setChecking(false);
          setMessage("Payment received. Redirecting you to log in...");
          setCountdown(3);

          redirectInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                if (redirectInterval) clearInterval(redirectInterval);
                router.replace("/login");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return;
        }

        const { data: subscription, error: subscriptionError } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle();

        if (subscriptionError) {
          throw subscriptionError;
        }

        const isPremium =
          !!subscription &&
          subscription.status === "active" &&
          (!subscription.current_period_end ||
            new Date(subscription.current_period_end).getTime() > Date.now());

        if (!mounted) return;

        if (isPremium) {
          setChecking(false);
          setMessage("Payment confirmed. Redirecting you to your profile...");
          setCountdown(3);

          if (pollInterval) clearInterval(pollInterval);

          redirectInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                if (redirectInterval) clearInterval(redirectInterval);
                router.replace("/profile");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch {
        if (!mounted) return;
        setChecking(false);
        setMessage("We could not verify your payment automatically yet.");
      }
    }

    checkSubscription();

    pollInterval = setInterval(() => {
      checkSubscription();
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
      if (redirectInterval) clearInterval(redirectInterval);
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [router, supabase]);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Payment submitted</h1>

        <p style={styles.p}>
          Thanks. We have received your payment submission.
        </p>

        <p style={styles.p}>
          Your subscription will activate as soon as PayFast confirms it.
        </p>

        <div style={styles.statusBox}>
          <div style={styles.statusTitle}>Status</div>
          <div style={styles.statusText}>{message}</div>

          {!checking && countdown > 0 ? (
            <div style={styles.countdownText}>
              Redirecting in {countdown}...
            </div>
          ) : checking ? (
            <div style={styles.checkingText}>Checking payment status...</div>
          ) : null}
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
  countdownText: {
    marginTop: 10,
    fontSize: 14,
    color: MUTED,
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