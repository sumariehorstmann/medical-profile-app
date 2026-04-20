"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createSupabaseBrowser();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setMessageType("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: "https://www.rroi.co.za/reset-password",
      });

      if (error) {
        setMessageType("error");
        setMessage(error.message || "Unable to send reset email right now.");
        setLoading(false);
        return;
      }

      setMessageType("success");
      setMessage(
        "If an account exists for this email address, a password reset link has been sent. Please check your inbox and spam folder."
      );
      setEmail("");
    } catch {
      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 600,
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "40px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Image
              src="/logo.png"
              alt="RROI logo"
              width={220}
              height={220}
              priority
              style={{
                width: "100%",
                maxWidth: 220,
                height: "auto",
                margin: "0 auto",
              }}
            />
          </div>

          <h1
            style={{
              fontSize: 54,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#08153a",
              margin: "0 0 16px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Forgot password
          </h1>

          <p
            style={{
              margin: "0 0 28px 0",
              fontSize: 17,
              lineHeight: 1.6,
              color: "#334155",
            }}
          >
            Enter your email address below and we will send you a secure link to
            reset your password.
          </p>

          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: 16,
                fontWeight: 700,
                color: "#08153a",
                marginBottom: 10,
              }}
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                height: 58,
                borderRadius: 16,
                border: "1px solid #cbd5e1",
                padding: "0 18px",
                fontSize: 18,
                color: "#08153a",
                outline: "none",
                marginBottom: 20,
                background: "#ffffff",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: 58,
                border: "none",
                borderRadius: 999,
                background: loading ? "#5aa383" : "#157a55",
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 8px 20px rgba(21,122,85,0.18)",
              }}
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>

          {message ? (
            <div
              style={{
                marginTop: 18,
                padding: "14px 16px",
                borderRadius: 16,
                fontSize: 16,
                lineHeight: 1.5,
                textAlign: "left",
                border:
                  messageType === "error"
                    ? "1px solid #f5b5b5"
                    : "1px solid #b7e3c8",
                background:
                  messageType === "error" ? "#fff1f1" : "#effaf3",
                color: messageType === "error" ? "#b42318" : "#157a55",
              }}
            >
              {message}
            </div>
          ) : null}

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              fontSize: 16,
              fontWeight: 600,
              color: "#64748b",
            }}
          >
            <Link
              href="/login"
              style={{
                color: "#08153a",
                textDecoration: "none",
              }}
            >
              Back to login
            </Link>

            <span>•</span>

            <Link
              href="/"
              style={{
                color: "#334155",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}