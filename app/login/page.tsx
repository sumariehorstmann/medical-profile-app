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

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // ✅ Hard redirect avoids stuck state
        window.location.href = "/profile";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Signup successful. You can now log in.");
        setMode("login");
      }
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>OMI LOGIN v2</h1>
      <p>Online Medical Info</p>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setMode("login")}
          disabled={mode === "login"}
          style={{ marginRight: 6 }}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          disabled={mode === "signup"}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Log in"
            : "Sign up"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 12 }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: 12, fontSize: 12 }}>
        If you do NOT see “OMI LOGIN v2”, you are viewing a different /login page
        (cached route or wrong deployment).
      </p>
    </main>
  );
}
