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
      setError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Supabase signUp error:", error);
        setError(error.message);
        return;
      }

      setMessage(
        "Account created. Please check your email and click the confirmation link to continue."
      );
    } catch (err) {
      console.error("Network/Unexpected error during signUp:", err);
      setError("Could not contact the server. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Subscribe
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: 4,
            fontWeight: 500,
          }}
        >
          Rapid Response Online Information
        </p>
        <p
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          R699 per year
        </p>

        <p style={{ textAlign: "center", marginBottom: 24 }}>
          Create your account to continue to payment.
        </p>

        <form onSubmit={createAccount}>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14,
              }}
              required
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14,
              }}
              required
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" style={{ textDecoration: "underline" }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {error && (
            <div
              style={{
                marginBottom: 12,
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#fdecea",
                color: "#a61b1b",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              style={{
                marginBottom: 12,
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#edf7ed",
                color: "#1e4620",
                fontSize: 14,
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !agree}
            style={{
              width: "100%",
              padding: "10px 16px",
              borderRadius: 999,
              border: "none",
              fontWeight: 600,
              fontSize: 15,
              backgroundColor: loading || !agree ? "#8abf9b" : "#005826",
              color: "#fff",
              cursor: loading || !agree ? "not-allowed" : "pointer",
              marginBottom: 16,
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            marginTop: 8,
          }}
        >
          <span>
            Already subscribed?{" "}
            <Link href="/login" style={{ textDecoration: "underline" }}>
              Log in
            </Link>
          </span>
          <Link href="/" style={{ textDecoration: "underline" }}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
