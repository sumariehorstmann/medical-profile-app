"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type SubStatus = "inactive" | "active" | "past_due" | "cancelled";

export default function AffiliateApplyPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();

  const [subStatus, setSubStatus] = useState<SubStatus | null>(null);
  const [checking, setChecking] = useState(true);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [promoteWhere, setPromoteWhere] = useState("Instagram");
  const [audience, setAudience] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 1) On page load: ensure user is logged in + fetch subscription status
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setChecking(true);
      setMessage(null);

      try {
        const { data: authData, error: authErr } = await supabase.auth.getUser();
        if (authErr) throw authErr;

        const user = authData.user;
        if (!user) {
          router.push("/login");
          return;
        }

        const { data: subRow, error: subErr } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (subErr) throw subErr;

        // If no row yet, treat as inactive
        const status = (subRow?.status as SubStatus | undefined) ?? "inactive";
        if (!cancelled) setSubStatus(status);
      } catch (err: any) {
        if (!cancelled) setMessage(err?.message || "Failed to check subscription status.");
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  const isEligible = subStatus === "active";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!isEligible) {
      setMessage("An active subscription is required to apply.");
      return;
    }

    if (!agree) {
      setMessage("Please accept the affiliate terms to continue.");
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr) throw authErr;

      const user = authData.user;
      if (!user) {
        router.push("/login");
        return;
      }

      const { error: insertErr } = await supabase.from("affiliate_applications").insert({
        user_id: user.id,
        full_name: fullName.trim(),
        mobile: mobile.trim(),
        promote_where: promoteWhere,
        audience: audience.trim() ? audience.trim() : null,
      });

      if (insertErr) {
        const msg = insertErr.message?.toLowerCase() ?? "";
        if (msg.includes("duplicate") || msg.includes("unique")) {
          setMessage("You have already submitted an affiliate application.");
          setSubmitted(true);
          return;
        }
        throw insertErr;
      }

      setSubmitted(true);
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={96} height={96} priority />
          <h1 style={styles.h1}>Apply to Become an Affiliate</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        {/* Subscription gate */}
        <div style={styles.notice}>
          <strong>Requirements</strong>
          <p style={styles.noticeText}>
            Affiliates must have an active RROI subscription. Applications are reviewed manually.
            RROI does not guarantee approval.
          </p>

          {checking ? (
            <p style={{ marginTop: 10, opacity: 0.9, fontWeight: 700 }}>Checking your subscription…</p>
          ) : isEligible ? (
            <p style={{ marginTop: 10, color: "#065F46", fontWeight: 800 }}>
              Subscription status: Active ✅
            </p>
          ) : (
            <div style={{ marginTop: 10 }}>
              <p style={{ margin: 0, color: "#9A3412", fontWeight: 800 }}>
                Subscription status: Not active
              </p>
              <p style={{ margin: "6px 0 0", opacity: 0.9 }}>
                You need an active subscription to apply.
              </p>
              <Link href="/subscribe" style={styles.secondaryBtn}>
                Subscribe
              </Link>
            </div>
          )}
        </div>

        {submitted ? (
          <div style={styles.success}>
            <h2 style={styles.h2}>Application received</h2>
            <p style={styles.p}>
              Thanks — your application has been saved. We’ll review it and contact you using your
              account email.
            </p>

            {message && (
              <p style={{ marginTop: 10, color: "#B91C1C", fontWeight: 700 }}>{message}</p>
            )}

            <div style={styles.links}>
              <Link href="/affiliate" style={styles.link}>
                ← Back to Affiliate Program
              </Link>
              <Link href="/" style={styles.linkMuted}>
                Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              placeholder="Full name and surname"
              required
              disabled={loading || checking || !isEligible}
            />

            <label style={styles.label}>Mobile number</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={styles.input}
              placeholder="+27..."
              required
              disabled={loading || checking || !isEligible}
            />

            <label style={styles.label}>Where will you promote RROI?</label>
            <select
              value={promoteWhere}
              onChange={(e) => setPromoteWhere(e.target.value)}
              style={styles.input}
              disabled={loading || checking || !isEligible}
            >
              <option>Instagram</option>
              <option>TikTok</option>
              <option>Facebook</option>
              <option>WhatsApp</option>
              <option>Website</option>
              <option>In-person business</option>
              <option>Other</option>
            </select>

            <label style={styles.label}>Audience / customer type (optional)</label>
            <textarea
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              style={styles.textarea}
              placeholder="Example: families, elderly care, sports clubs, schools, security companies..."
              disabled={loading || checking || !isEligible}
            />

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                disabled={loading || checking || !isEligible}
              />
              <span style={styles.checkboxText}>
                I agree to the{" "}
                <Link href="/affiliate/terms" style={styles.inlineLink}>
                  affiliate terms
                </Link>{" "}
                and confirm I will not make misleading claims about RROI.
              </span>
            </label>

            <button
              type="submit"
              style={styles.primaryBtn}
              disabled={!agree || loading || checking || !isEligible}
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>

            {message && (
              <p style={{ marginTop: 12, color: "#B91C1C", fontWeight: 700 }}>{message}</p>
            )}

            <p style={styles.small}>
              Banking details are requested only after approval and before first payout.
            </p>

            <div style={styles.links}>
              <Link href="/affiliate" style={styles.linkMuted}>
                ← Back
              </Link>
              <Link href="/terms" style={styles.link}>
                Terms
              </Link>
              <Link href="/privacy" style={styles.link}>
                Privacy
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 16,
    background: "#FFFFFF",
    color: "#0F172A",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 24,
    background: "#FFFFFF",
  },
  brand: {
    textAlign: "center",
    marginBottom: 18,
  },
  h1: {
    fontSize: 28,
    fontWeight: 900,
    margin: "8px 0 4px",
  },
  tagline: {
    fontSize: 14,
    fontWeight: 700,
    opacity: 0.85,
    margin: 0,
  },
  notice: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    background: "#F8FAFC",
    marginBottom: 18,
  },
  noticeText: {
    margin: "6px 0 0",
    lineHeight: 1.5,
    opacity: 0.9,
  },
  success: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
    background: "#FFFFFF",
  },
  h2: {
    fontSize: 18,
    fontWeight: 900,
    margin: "0 0 8px",
  },
  p: {
    margin: "0 0 8px",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 800,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    outline: "none",
    background: "#FFFFFF",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: 10,
    marginBottom: 12,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    outline: "none",
    background: "#FFFFFF",
    resize: "vertical",
  },
  checkboxRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    margin: "8px 0 14px",
  },
  checkboxText: {
    fontSize: 13,
    lineHeight: 1.45,
    opacity: 0.9,
    fontWeight: 700,
  },
  inlineLink: {
    color: BRAND_GREEN,
    fontWeight: 900,
    textDecoration: "underline",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 14,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    marginTop: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    fontWeight: 900,
    textDecoration: "none",
    background: "#FFFFFF",
  },
  small: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.85,
    lineHeight: 1.5,
  },
  links: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 16,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: "#0F172A",
    opacity: 0.85,
    fontWeight: 800,
  },
};
