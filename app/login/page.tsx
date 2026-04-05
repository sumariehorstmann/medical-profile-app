"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type Mode = "login" | "signup";
type MessageType = "success" | "error" | "info";

function LoginPageInner() {
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("info");

  const redirectTo = useMemo(() => {
    return params.get("next") || params.get("redirect") || "/profile";
  }, [params]);

  useEffect(() => {
    const errorCode = params.get("error_code") || params.get("error");
    const errorDesc = params.get("error_description") || params.get("message");

    if (errorCode || errorDesc) {
      setMessageType("error");
      setMessage(
        errorDesc
          ? `Authentication error: ${errorDesc}`
          : "Authentication error. Please try again."
      );
    }
  }, [params]);

  function clearMessage() {
    setMessage(null);
    setMessageType("info");
  }

  function normaliseAuthMessage(raw: string, currentMode: Mode) {
    const value = raw.toLowerCase();

    if (
      value.includes("invalid login credentials") ||
      value.includes("invalid_credentials")
    ) {
      return "Your email address or password is incorrect.";
    }

    if (value.includes("email not confirmed")) {
      return "Please confirm your email address before logging in.";
    }

    if (
      value.includes("user already registered") ||
      value.includes("already been registered")
    ) {
      return "An account with this email address already exists.";
    }

    if (value.includes("password should be at least")) {
      return "Your password must be at least 8 characters long.";
    }

    return currentMode === "login"
      ? "Unable to log you in right now. Please try again."
      : "Unable to create your account right now. Please try again.";
  }

  function validateForm() {
    if (!email.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Please enter your email address and password.");
      return false;
    }

    if (mode === "signup") {
      if (password.length < 8) {
        setMessageType("error");
        setMessage("Your password must be at least 8 characters long.");
        return false;
      }

      if (password !== confirmPassword) {
        setMessageType("error");
        setMessage("Your passwords do not match.");
        return false;
      }

      if (!acceptTerms) {
        setMessageType("error");
        setMessage(
          "Please accept the Terms & Conditions and Privacy Policy to continue."
        );
        return false;
      }
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearMessage();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setMessageType("error");
          setMessage(normaliseAuthMessage(error.message, "login"));
          return;
        }

        window.location.href = redirectTo;
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            redirectTo
          )}`,
        },
      });

      if (error) {
        setMessageType("error");
        setMessage(normaliseAuthMessage(error.message, "signup"));
        return;
      }

      setMessageType("success");
      setMessage(
        "Your account has been created. Please check your email and confirm your address before continuing."
      );
    } catch {
      setMessageType("error");
      setMessage(
        mode === "login"
          ? "Unable to log you in right now. Please try again."
          : "Unable to create your account right now. Please try again."
      );
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

        <h1 style={styles.h1}>RROI</h1>
        <div style={styles.tagline}>Rapid Response Online Information</div>

        <p style={styles.intro}>
          Create your account for free. Upgrade to Premium when you want your
          full emergency profile to be visible when your QR code is scanned.
        </p>

        <p style={styles.trustLine}>
          Your information remains under your control and can be updated at any
          time.
        </p>

        <div style={styles.toggleRow}>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              clearMessage();
            }}
            style={{
              ...styles.toggleBtn,
              ...(mode === "login" ? styles.toggleBtnActive : {}),
            }}
            disabled={loading}
            aria-pressed={mode === "login"}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup");
              clearMessage();
            }}
            style={{
              ...styles.toggleBtn,
              ...(mode === "signup" ? styles.toggleBtnActive : {}),
            }}
            disabled={loading}
            aria-pressed={mode === "signup"}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" style={styles.label}>
            <div style={styles.labelText}>Email address</div>
            <input
              id="email"
              name="email"
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              disabled={loading}
            />
          </label>

          <label htmlFor="password" style={styles.label}>
            <div style={styles.labelText}>Password</div>
            <input
              id="password"
              name="password"
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              disabled={loading}
            />
          </label>

          {mode === "login" ? (
            <div style={styles.forgotWrap}>
              <Link href="/forgot-password" style={styles.inlineLink}>
                Forgot password?
              </Link>
            </div>
          ) : (
            <>
              <div style={styles.passwordNote}>
                Use at least 8 characters.
              </div>

              <label htmlFor="confirmPassword" style={styles.label}>
                <div style={styles.labelText}>Confirm password</div>
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

              <div style={styles.signupNote}>
                You will need to confirm your email address before continuing.
              </div>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={loading}
                />
                <span style={styles.checkboxText}>
                  I agree to the{" "}
                  <Link href="/terms" style={styles.inlineLink}>
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" style={styles.inlineLink}>
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </>
          )}

          <button style={styles.submitBtn} disabled={loading} type="submit">
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main style={styles.page}>
          <div style={{ ...styles.card, textAlign: "center" }}>Loading...</div>
        </main>
      }
    >
      <LoginPageInner />
    </Suspense>
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
    margin: "0 0 10px",
    lineHeight: 1.55,
    color: "#334155",
    fontSize: 15,
  },
  trustLine: {
    textAlign: "center",
    margin: "0 0 20px",
    lineHeight: 1.5,
    color: MUTED,
    fontSize: 14,
    fontWeight: 600,
  },
  toggleRow: {
    display: "flex",
    gap: 8,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    padding: "11px 14px",
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    cursor: "pointer",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: 15,
    color: TEXT,
  },
  toggleBtnActive: {
    background: TEXT,
    color: "#FFFFFF",
    border: `1px solid ${TEXT}`,
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
  forgotWrap: {
    marginTop: -4,
    marginBottom: 10,
    textAlign: "right",
  },
  passwordNote: {
    marginTop: -4,
    marginBottom: 10,
    fontSize: 13,
    color: MUTED,
  },
  signupNote: {
    marginTop: -4,
    marginBottom: 10,
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.5,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  checkboxText: {
    fontSize: 14,
    color: "#334155",
  },
  inlineLink: {
    color: BRAND_GREEN,
    fontWeight: 700,
    textDecoration: "none",
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