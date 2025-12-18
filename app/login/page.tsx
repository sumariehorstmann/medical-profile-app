"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanEmail || !cleanPassword) {
      setMessage("Please enter an email and password.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) throw error;

        // If email confirmations are ON, user may not be logged in yet.
        // Still send them to profile; your profile page can show a "not logged in" state if needed.
        window.location.href = "/profile";
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error) throw error;

      // HARD redirect avoids router/session timing issues on Vercel
      window.location.href = "/profile";
    } catch (err: any) {
      setMessage(err?.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, padding: 24 }}>
      <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 6 }}>
        OMI LOGIN v2
      </h1>
      <div style={{ marginBottom: 18 }}>Online Medical Info</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setMode("login")}
          style={{
            padding: "6px 10px",
            border: "1px solid #ddd",
            background: mode === "login" ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          style={{
            padding: "6px 10px",
            border: "1px solid #ddd",
            background: mode === "signup" ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 14,
          }}
        />

        <label style={{ display: "block", marginBottom: 6 }}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 14,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 6,
            padding: 12,
            border: "1px solid #000",
            background: "#111",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      {message ? (
        <div style={{ marginTop: 14, padding: 10, border: "1px solid #ddd" }}>
          {message}
        </div>
      ) : null}

      <div style={{ marginTop: 14, fontSize: 12, color: "#666" }}>
        If you do NOT see “OMI LOGIN v2”, you are viewing a different /login page
        (wrong server or cached route).
      </div>
    </div>
  );
}
