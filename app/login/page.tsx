"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!email || !password) {
        setMessage("Please enter an email and password.");
        return;
      }

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        console.log("Signup result", { data, error });

        if (error) throw error;

        setMessage(
          "✅ Signup successful. Please check your email (if confirmation is required) and then log in."
        );
        setMode("login");
        return;
      }

      // LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login result", { data, error });

      if (error) throw error;

      setMessage("✅ Logged in. Redirecting...");
      console.log("Pushing to /profile");

      // First try client-side navigation
      router.push("/profile");

      // Hard fallback redirect in case router.push is ignored for any reason
      if (typeof window !== "undefined") {
        setTimeout(() => {
          if (window.location.pathname === "/login") {
            console.log("Hard redirect to /profile");
            window.location.href = "/profile";
          }
        }, 500);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
        OMI LOGIN v2
      </h1>
      <p style={{ marginBottom: 24 }}>Online Medical Info</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setMode("login")}
          style={{
            flex: 1,
            padding: "8px 0",
            border: "1px solid #000",
            background: mode === "login" ? "#000" : "#fff",
            color: mode === "login" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          style={{
            flex: 1,
            padding: "8px 0",
            border: "1px solid #000",
            background: mode === "signup" ? "#000" : "#fff",
            color: mode === "signup" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 4 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 12,
            border: "1px solid #ccc",
          }}
        />

        <label style={{ display: "block", marginBottom: 4 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 16,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading
            ? mode === "login"
              ? "Logging in..."
              : "Signing up..."
            : mode === "login"
            ? "Log in"
            : "Sign up"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: 16,
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: 24, fontSize: 12, color: "#555" }}>
        If you do NOT see "OMI LOGIN v2", you are viewing a different /login
        page (wrong server or cached route).
      </p>
    </main>
  );
}
