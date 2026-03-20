"use client";

import { useState } from "react";

type Props = {
  publicId: string;
  buyerEmail: string;
};

export default function PayfastSubscribeButton({ publicId, buyerEmail }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/payfast/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ publicId, buyerEmail }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Subscribe failed (${res.status}): ${txt}`);
      }

      const json = (await res.json()) as {
        processUrl: string;
        fields: Record<string, string>;
      };

      // PayFast requires POSTing a form (not a fetch redirect)
      const form = document.createElement("form");
      form.method = "POST";
      form.action = json.processUrl;

      Object.entries(json.fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #111",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Redirecting to PayFast..." : "Upgrade to Full (Annual)"}
      </button>

      {error ? (
        <p style={{ marginTop: 10, color: "crimson" }}>{error}</p>
      ) : null}
    </div>
  );
}
