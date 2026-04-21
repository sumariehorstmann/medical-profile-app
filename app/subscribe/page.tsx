"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const GREEN = "#157A55";

type ProfileRow = {
  public_id: string | null;
  first_name: string | null;
  last_name: string | null;
};

export default function SubscribePage() {
  const supabase = createSupabaseBrowser();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [email, setEmail] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setPageLoading(true);
        setMessage(null);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setMessage("Please log in first.");
          return;
        }

        setEmail(user.email ?? "");

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("public_id, first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (profileError || !profileData) {
          setMessage("Profile not found.");
          return;
        }

        setProfile(profileData);
      } catch {
        setMessage("Failed to load subscription details.");
      } finally {
        setPageLoading(false);
      }
    }

    loadData();
  }, [supabase]);

  async function handleSubscribe() {
    if (!agreed) {
      setMessage(
        "Please agree to the Terms, Privacy Policy, and Refund Policy."
      );
      return;
    }

    if (!profile?.public_id || !email) {
      setMessage("Missing profile or account details.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("/api/payfast/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: profile.public_id,
          buyerEmail: email,
          firstName: profile.first_name ?? "",
          lastName: profile.last_name ?? "",
          affiliateCode: affiliateCode.trim().toUpperCase(),
          agreedToLegal: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to start payment.");
      }

      if (!data?.processUrl || !data?.fields) {
        throw new Error("Invalid payment response.");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.processUrl;

      Object.entries(data.fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value ?? "");
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong.");
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main style={styles.page}>
        <section style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>Upgrade to Premium</h1>
            <p style={styles.subtitle}>Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <div style={styles.topBlock}>
            <h1 style={styles.title}>Upgrade to Premium</h1>
            <p style={styles.subtitle}>
              Unlock full emergency profile visibility and continue to secure
              checkout with PayFast.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Details</h2>
            <p style={styles.paragraph}>
              Name: {profile?.first_name || "-"} {profile?.last_name || "-"}
            </p>
            <p style={styles.paragraph}>Email: {email || "-"}</p>
            <p style={styles.paragraph}>
              Public ID: {profile?.public_id || "-"}
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Affiliate Code</h2>
            <input
              type="text"
              value={affiliateCode}
              onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
              placeholder="Enter affiliate code if you have one"
              style={styles.input}
            />
          </div>

          <div style={styles.section}>
            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>
                I agree to the{" "}
                <a href="/terms" style={styles.link}>
                  Terms &amp; Conditions
                </a>
                ,{" "}
                <a href="/privacy" style={styles.link}>
                  Privacy Policy
                </a>
                , and{" "}
                <a href="/refund-policy" style={styles.link}>
                  Refund &amp; Returns Policy
                </a>
                .
              </span>
            </label>
          </div>

          {message ? <p style={styles.error}>{message}</p> : null}

          <button
            onClick={handleSubscribe}
            disabled={loading || !agreed}
            style={{
              ...styles.button,
              opacity: loading || !agreed ? 0.6 : 1,
              cursor: loading || !agreed ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Redirecting..." : "Continue to PayFast"}
          </button>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 760,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
    maxWidth: 650,
  },
  section: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
    marginBottom: 18,
  },
  sectionTitle: {
    margin: "0 0 12px",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT,
  },
  paragraph: {
    margin: "0 0 8px",
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  input: {
    width: "100%",
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 15,
    color: TEXT,
    outline: "none",
    background: "#FFFFFF",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    cursor: "pointer",
  },
  checkbox: {
    marginTop: 3,
  },
  checkboxText: {
    fontSize: 15,
    lineHeight: 1.7,
    color: MUTED,
  },
  link: {
    color: GREEN,
    fontWeight: 700,
    textDecoration: "none",
  },
  error: {
    margin: "0 0 16px",
    fontSize: 14,
    color: "#B91C1C",
    textAlign: "center",
  },
  button: {
    width: "100%",
    border: "none",
    borderRadius: 14,
    padding: "14px 18px",
    background: GREEN,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 800,
  },
};