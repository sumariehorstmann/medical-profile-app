"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

function LoginPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const errorCode = params.get("error_code") || params.get("error");
    const errorDesc = params.get("error_description");
    if (errorCode || errorDesc) {
      setMsg(`Auth callback error: ${errorCode || ""}${errorDesc ? ` — ${errorDesc}` : ""}`);
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
      const redirectTo =
        params.get("redirect") ||
        params.get("next") ||
        "/profile";

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        window.location.href = redirectTo;
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) throw error;

      setMsg("✅ Account created. Please check your email and click the confirmation link to continue.");
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: "40px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 6 }}>RROI</h1>
      <div style={{ opacity: 0.8, marginBottom: 16 }}>Rapid Response Online Info</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setMode("login")}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            background: mode === "login" ? "#000" : "#fff",
            color: mode === "login" ? "#fff" : "#000",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            background: mode === "signup" ? "#000" : "#fff",
            color: mode === "signup" ? "#fff" : "#000",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={submit}>
        <label style={{ display: "block", marginBottom: 10 }}>
          <div style={{ marginBottom: 6 }}>Email</div>
          <input
            style={{ width: "100%", padding: 10 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label style={{ display: "block", marginBottom: 10 }}>
          <div style={{ marginBottom: 6 }}>Password</div>
          <input
            style={{ width: "100%", padding: 10 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>

        <button
          style={{ width: "100%", padding: 12, marginTop: 10, cursor: "pointer" }}
          disabled={loading}
          type="submit"
        >
          {loading ? "Working..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <a href="/subscribe/start">Go to Subscribe</a>
        <a href="/">Home</a>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main style={{ maxWidth: 520, margin: "40px auto", padding: 20 }}>Loading...</main>}>
      <LoginPageInner />
    </Suspense>
  );
}