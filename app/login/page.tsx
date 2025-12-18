"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");

      if (!email || !password) {
        setMessage("Please enter an email and password.");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        setMessage("✅ Signup successful. Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        setMessage("✅ Logged in successfully. Redirecting…");
        window.location.assign("/profile");
      }
    } catch (err: any) {
      setMessage(`❌ ${err?.message ?? "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>OMI LOGIN v2</h1>
      <p style={{ marginTop: 6, marginBottom: 18 }}>Online Medical Info</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setMode("login")}
          disabled={loading}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            background: mode === "login" ? "#f3f3f3" : "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          disabled={loading}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            background: mode === "signup" ? "#f3f3f3" : "white",
            cursor: "pointer",
          }}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            disabled={loading}
            style={{ padding: 10, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            name="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            disabled={loading}
            style={{ padding: 10, border: "1px solid #ddd" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 6,
            padding: 10,
            border: "1px solid #ddd",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Log in"}
        </button>

        {message && <p style={{ marginTop: 8, lineHeight: 1.4 }}>{message}</p>}
      </form>
    </main>
  );
}
