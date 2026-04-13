"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

type Mode = "login" | "signup";
type MessageType = "success" | "error" | "info";

function getPasswordStrength(password: string) {
  if (!password) {
    return { label: "", color: "#94A3B8" };
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { label: "Weak", color: "#DC2626" };
  }

  if (score <= 4) {
    return { label: "Medium", color: "#D97706" };
  }

  return { label: "Strong", color: "#157A55" };
}

function LoginPageInner() {
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("info");

  const redirectTo = useMemo(() => {
    return params.get("next") || params.get("redirect") || "/profile";
  }, [params]);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const passwordsDoNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

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
        <PageHeader />

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

            <div style={styles.passwordWrap}>
              <input
                id="password"
                name="password"
                style={styles.passwordInput}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={styles.eyeBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {mode === "login" ? (
            <div style={styles.forgotWrap}>
              <Link href="/forgot-password" style={styles.inlineLink}>
                Forgot password?
              </Link>
            </div>
          ) : (
            <>
              <div style={styles.passwordMetaRow}>
                <div style={styles.passwordNote}>Use at least 8 characters.</div>

                {password ? (
                  <div
                    style={{
                      ...styles.strengthBadge,
                      borderColor: passwordStrength.color,
                      color: passwordStrength.color,
                    }}
                  >
                    {passwordStrength.label}
                  </div>
                ) : null}
              </div>

              <label htmlFor="confirmPassword" style={styles.label}>
                <div style={styles.labelText}>Confirm password</div>

                <div style={styles.passwordWrap}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    style={{
                      ...styles.passwordInput,
                      ...(passwordsDoNotMatch
                        ? styles.inputError
                        : passwordsMatch
                        ? styles.inputSuccess
                        : {}),
                    }}
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    style={styles.eyeBtn}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    disabled={loading}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </label>

              {passwordsMatch ? (
                <div style={styles.matchSuccess}>Passwords match.</div>
              ) : passwordsDoNotMatch ? (
                <div style={styles.matchError}>Passwords do not match.</div>
              ) : null}

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

        <div style={styles.cardLinks}>
          {mode === "login" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  clearMessage();
                }}
                style={styles.textButton}
                disabled={loading}
              >
                Create account
              </button>

              <span style={styles.dot}>•</span>

              <Link href="/" style={styles.secondaryLink}>
                Home
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  clearMessage();
                }}
                style={styles.textButton}
                disabled={loading}
              >
                Back to login
              </button>

              <span style={styles.dot}>•</span>

              <Link href="/" style={styles.secondaryLink}>
                Home
              </Link>
            </>
          )}
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
    padding: 20,
    border: "1px solid #E5E7EB",
    boxShadow: "0 14px 42px rgba(15, 23, 42, 0.08)",
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
  passwordWrap: {
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    padding: "12px 46px 12px 14px",
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    fontSize: 15,
    color: TEXT,
    background: "#FFFFFF",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    lineHeight: 1,
    padding: 4,
  },
  forgotWrap: {
    marginTop: -4,
    marginBottom: 10,
    textAlign: "right",
  },
  passwordMetaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: -4,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  passwordNote: {
    fontSize: 13,
    color: MUTED,
  },
  strengthBadge: {
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid",
    borderRadius: 999,
    padding: "4px 10px",
    background: "#FFFFFF",
  },
  signupNote: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.5,
  },
  matchSuccess: {
    marginTop: -4,
    marginBottom: 10,
    fontSize: 13,
    color: "#166534",
    fontWeight: 700,
  },
  matchError: {
    marginTop: -4,
    marginBottom: 10,
    fontSize: 13,
    color: "#B91C1C",
    fontWeight: 700,
  },
  inputSuccess: {
    border: "1px solid #22C55E",
  },
  inputError: {
    border: "1px solid #EF4444",
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
  cardLinks: {
    marginTop: 18,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  textButton: {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: TEXT,
    fontWeight: 800,
    fontSize: 14,
  },
  secondaryLink: {
    textDecoration: "none",
    color: MUTED,
    fontWeight: 700,
    fontSize: 14,
  },
  dot: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 1,
  },
};