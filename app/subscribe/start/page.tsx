"use client";

import { useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type FormError = string | null;

export default function SubscribeStartPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<FormError>(null);

  async function createAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!agree) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
  email: email.trim(),
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});

      if (error) {
        setError(error.message);
        return;
      }

      setMessage(
        "Account created. Please check your email to confirm your account."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Create your free account</h1>

        <p style={styles.sub}>
          Your emergency profile is free to create and save.
        </p>

        <div style={styles.infoBox}>
          <strong>How it works</strong>
          <ul style={styles.ul}>
            <li>Create your account for free</li>
            <li>Complete your full profile</li>
            <li>Free QR shows Section 1 only</li>
            <li>Upgrade later for full profile visibility</li>
          </ul>
        </div>

        <form onSubmit={createAccount}>
          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms">Terms</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </span>
          </label>

          {error && <div style={styles.error}>{error}</div>}
          {message && <div style={styles.success}>{message}</div>}

          <button
            type="submit"
            disabled={loading || !agree}
            style={styles.button}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div style={styles.footer}>
          <span>
            Already have an account? <Link href="/login">Log in</Link>
          </span>
          <Link href="/">Back to home</Link>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    borderRadius: 16,
    padding: 28,
  },
  h1: {
    fontSize: 28,
    fontWeight: 800,
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    marginBottom: 20,
  },
  infoBox: {
    background: "#f8fafc",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  ul: {
    marginTop: 8,
    paddingLeft: 18,
  },
  field: {
    marginBottom: 14,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  checkbox: {
    display: "flex",
    gap: 8,
    marginBottom: 14,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 999,
    border: "none",
    background: "#157A55",
    color: "#fff",
    fontWeight: 700,
  },
  error: {
    background: "#fdecea",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#a61b1b",
  },
  success: {
    background: "#edf7ed",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#1e4620",
  },
  footer: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },
};