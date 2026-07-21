"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function DeleteAccountClient() {
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleDeleteAccount() {
    if (!password.trim()) {
      setMessage("❌ Please enter your current password.");
      return;
    }

    if (confirmText.trim() !== "DELETE") {
      setMessage("❌ Please type DELETE exactly to confirm.");
      return;
    }

    try {
      setDeleting(true);
      setMessage(null);

      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmText,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to delete account.");
      }

      await supabase.auth.signOut();

      setMessage("✅ Account deleted successfully. Redirecting...");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (error: any) {
      setMessage(`❌ ${error?.message || "Something went wrong."}`);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      style={{
        marginTop: 20,
        background: "#FFF7F7",
        border: "1px solid #FECACA",
        borderRadius: 14,
        padding: 22,
      }}
    >
      <h2
        style={{
          margin: "0 0 12px",
          color: "#991B1B",
          fontSize: 22,
          fontWeight: 900,
        }}
      >
        Permanently Delete Account
      </h2>

      <div
        style={{
          marginBottom: 18,
          color: "#7F1D1D",
          lineHeight: 1.7,
        }}
      >
        This action cannot be undone.
        <br />
        <br />
        If you continue:
        <br />• your RROI account will be permanently deleted
        <br />• your profile and QR-linked emergency information will be deleted
        <br />• your Premium subscription will be cancelled
        <br />• your saved order information will be deleted
        <br />• affiliate information and unpaid commissions may be permanently lost
        <br />• you will need to create a new account if you return
      </div>

      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontWeight: 800,
          color: "#0F172A",
        }}
      >
        Current password
      </label>

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        placeholder="Enter your current password"
        style={inputStyle}
      />

      <label
        style={{
          display: "block",
          marginTop: 16,
          marginBottom: 8,
          fontWeight: 800,
          color: "#0F172A",
        }}
      >
        Type DELETE to confirm
      </label>

      <input
        type="text"
        value={confirmText}
        onChange={(event) => setConfirmText(event.target.value)}
        placeholder="Type DELETE"
        style={inputStyle}
      />

      <button
        type="button"
        onClick={handleDeleteAccount}
        disabled={
          deleting ||
          !password.trim() ||
          confirmText.trim() !== "DELETE"
        }
        style={{
          marginTop: 18,
          padding: "12px 18px",
          borderRadius: 10,
          border: "1px solid #B91C1C",
          background:
            deleting ||
            !password.trim() ||
            confirmText.trim() !== "DELETE"
              ? "#FCA5A5"
              : "#B91C1C",
          color: "#FFFFFF",
          fontWeight: 900,
          cursor:
            deleting ||
            !password.trim() ||
            confirmText.trim() !== "DELETE"
              ? "not-allowed"
              : "pointer",
        }}
      >
        {deleting ? "Deleting..." : "Permanently delete account"}
      </button>

      {message ? (
        <div
          style={{
            marginTop: 14,
            fontWeight: 800,
            color: "#0F172A",
          }}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: 10,
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: 15,
};