"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createSupabaseBrowser();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // 🔐 Ensure user came from email link (has session)
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessageType("error");
        setMessage("Invalid or expired reset link.");
      }
    };

    checkSession();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessageType("error");
        setMessage(error.message || "Unable to update password.");
        setLoading(false);
        return;
      }

      setMessageType("success");
      setMessage("Password updated successfully. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setMessageType("error");
      setMessage("Something went wrong.");
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
        <Image
          src="/logo.png"
          alt="RROI logo"
          width={200}
          height={200}
          style={{ margin: "0 auto 20px" }}
        />

        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            marginBottom: 16,
            color: "#08153a",
          }}
        >
          Set a new password
        </h1>

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <label style={{ fontWeight: 700 }}>New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              height: 56,
              margin: "8px 0 16px",
              padding: "0 16px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />

          <label style={{ fontWeight: 700 }}>Confirm new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              height: 56,
              margin: "8px 0 20px",
              padding: "0 16px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 56,
              borderRadius: 999,
              border: "none",
              background: "#157a55",
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              background:
                messageType === "error" ? "#fee2e2" : "#dcfce7",
              color:
                messageType === "error" ? "#991b1b" : "#166534",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </main>
  );
}