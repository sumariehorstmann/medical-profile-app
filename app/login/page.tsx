"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setErr(error.message);
    router.push("/profile");
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) return setErr(error.message);
    router.push("/profile");
  };

  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: 16, display: "grid", gap: 12 }}>
      <h1>Sign in / Sign up</h1>
      <form style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button onClick={signIn} disabled={busy}>Sign in</button>
        <button onClick={signUp} disabled={busy}>Create account</button>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
      </form>
      <p><a href="/">← Back home</a></p>
    </main>
  );
}
