"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type MessageType = "success" | "error" | "info";

export default function ResetPasswordPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("info");

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setMessageType("info");

    if (!password || !confirmPassword) {
      setMessageType("error");
      setMessage("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Your new password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessageType("error");
        setMessage(
          error.message || "Unable to update your password right now."
        );
        return;
      }

      setMessageType("success");
      setMessage(
        "Your password has been updated successfully. Redirecting you to the login page..."
      );

      redirectTimerRef.current = setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch {
      setMessageType("error");
      setMessage("Unable to update your password right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image
            src="/logo.png"
            alt="RROI logo"
            width={84}
            height={84}
            style={{ objectFit: "contain" }}
            priority
            unoptimized
          />
        </div>

        <h1 style={styles.h1}>Set a new password</h1>
        <div style={styles.tagline}>Rapid Response Online Information</div>

        <p style={styles.intro}>
          Enter your new password below to complete your password reset.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="password" style={styles.label}>
            <div style={styles.labelText}>New password</div>
            <input
              id="password"
              name="password"
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              disabled={loading}
            />
          </label>

          <div style={styles.note}>Use at least 8 characters.</div>

          <label htmlFor="confirmPassword" style={styles.label}>
            <div style={styles.labelText}>Confirm new password</div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              style={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={loading}
            />
          </label>

          <button style={styles.submitBtn} disabled={loading} type="submit">
            {loading ? "Please wait..." : "Update password"}
          </button>
        </form>

        {message ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              ...styles.message,
              ...(messageType === "error"
                ? styles.messageError
                : messageType === "success"
                ? styles.messageSuccess
                : styles.messageInfo),
            }}
          >
            {message}
          </div>
        ) : null}

        <div style={styles.footerLinks}>
          <Link href="/login" style={styles.link}>
            Back to login
          </Link>
          <Link href="/" style={styles.link}>
            Home
          </Link>
          <Link href="/terms" style={styles.link}>
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" style={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/contact" style={styles.link}>
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#D1D5DB";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "#F8FAFC",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    border: "1px solid #E5E7EB",
    boxShadow: "0 14px 42px rgba(15, 23, 42, 0.08)",
  },
  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  h1: {
    margin: "0 0 6px",
    textAlign: "center",
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  tagline: {
    textAlign: "center",
    color: MUTED,
    marginBottom: 14,
    fontSize: 15,
    fontWeight: 700,
  },
  intro: {
    textAlign: "center",
    margin: "0 0 20px",
    lineHeight: 1.55,
    color: "#334155",
    fontSize: 15,
  },
  label: {
    display: "block",
    marginBottom: 12,
  },
  labelText: {
    marginBottom: 6,
    fontWeight: 800,
    color: TEXT,
    fontSize: 15,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    fontSize: 15,
    color: TEXT,
    background: "#FFFFFF",
    outline: "none",
  },
  note: {
    marginTop: -4,
    marginBottom: 10,
    fontSize: 13,
    color: MUTED,
  },
  submitBtn: {
    width: "100%",
    padding: "14px 16px",
    marginTop: 12,
    cursor: "pointer",
    borderRadius: 999,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 16,
    boxShadow: "0 6px 16px rgba(21, 122, 85, 0.16)",
  },
  message: {
    marginTop: 14,
    lineHeight: 1.55,
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: 14,
  },
  messageError: {
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    color: "#991B1B",
  },
  messageSuccess: {
    background: "#F0FDF4",
    border: "1px solid #BBF7D0",
    color: "#166534",
  },
  messageInfo: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
  },
  footerLinks: {
    marginTop: 18,
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: TEXT,
    fontWeight: 700,
    opacity: 0.88,
    fontSize: 14,
  },
};