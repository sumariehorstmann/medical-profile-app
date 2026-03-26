"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

function LoginPageInner() {
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // ✅ ALWAYS prioritise next param
  const redirectTo = useMemo(() => {
    return (
      params.get("next") || 
      params.get("redirect") || 
      "/profile"
    );
  }, [params]);

  useEffect(() => {
    const errorCode = params.get("error_code") || params.get("error");
    const errorDesc = params.get("error_description") || params.get("message");

    if (errorCode || errorDesc) {
      setMsg(
        `Auth error: ${errorCode || ""}${
          errorDesc ? ` — ${errorDesc}` : ""
        }`
      );
    }
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!email || !password) {
      setMsg("Please enter an email and password.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // ✅ redirect AFTER login
        window.location.href = redirectTo;
        return;
      }

      // SIGN UP
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            redirectTo
          )}`,
        },
      });

      if (error) throw error;

      setMsg(
        "Account created. Check your email and confirm to continue."
      );
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>RROI</h1>
        <div style={styles.tagline}>
          Rapid Response Online Information
        </div>

        <p style={styles.intro}>
          Create your account for free. Premium unlocks full public profile access via QR.
        </p>

        <div style={styles.toggleRow}>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              ...styles.toggleBtn,
              ...(mode === "login" ? styles.toggleBtnActive : {}),
            }}
            disabled={loading}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              ...styles.toggleBtn,
              ...(mode === "signup" ? styles.toggleBtnActive : {}),
            }}
            disabled={loading}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={submit}>
          <label style={styles.label}>
            <div style={styles.labelText}>Email</div>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label style={styles.label}>
            <div style={styles.labelText}>Password</div>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </label>

          <button style={styles.submitBtn} disabled={loading} type="submit">
            {loading
              ? "Working..."
              : mode === "login"
              ? "Log in"
              : "Sign up"}
          </button>
        </form>

        {msg && <p style={styles.message}>{msg}</p>}

        <div style={styles.footerLinks}>
          <a href="/" style={styles.link}>Home</a>
          <a href="/terms" style={styles.link}>Terms</a>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main style={{ maxWidth: 520, margin: "40px auto", padding: 20 }}>
          Loading...
        </main>
      }
    >
      <LoginPageInner />
    </Suspense>
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
    maxWidth: 520,
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
  },
  h1: {
    marginBottom: 6,
    textAlign: "center",
    fontSize: 32,
    fontWeight: 800,
  },
  tagline: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 14,
  },
  intro: {
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  toggleRow: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    borderRadius: 10,
    fontWeight: 700,
  },
  toggleBtnActive: {
    background: "#000",
    color: "#fff",
  },
  label: {
    display: "block",
    marginBottom: 10,
  },
  labelText: {
    marginBottom: 6,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 10,
  },
  submitBtn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    cursor: "pointer",
    borderRadius: 999,
    border: "none",
    background: "#157A55",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
  },
  message: {
    marginTop: 12,
    lineHeight: 1.5,
  },
  footerLinks: {
    marginTop: 16,
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "underline",
  },
};