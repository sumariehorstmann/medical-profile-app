"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type AffiliateRow = {
  affiliate_code: string;
  total_earned: number | null;
  total_paid: number | null;
  status: string;
} | null;

export default function AffiliateApplyPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [existingAffiliate, setExistingAffiliate] = useState<AffiliateRow>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [branchCode, setBranchCode] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

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
          router.replace("/login");
          return;
        }

        const { data: subscription, error: subErr } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle();

        if (subErr) throw subErr;

        const isPremium =
          !!subscription &&
          subscription.status === "active" &&
          (!subscription.current_period_end ||
            new Date(subscription.current_period_end) > new Date());

        if (!isPremium) {
          router.replace("/subscribe");
          return;
        }

        const { data: affiliate, error: affiliateErr } = await supabase
          .from("affiliates")
          .select("affiliate_code, total_earned, total_paid, status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (affiliateErr) throw affiliateErr;

        if (!cancelled && affiliate) {
          setExistingAffiliate(affiliate);
          setCreatedCode(affiliate.affiliate_code);
        }
      } catch (err: any) {
        if (!cancelled) {
          setMessage(err?.message || "Failed to load affiliate status.");
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!agree) {
      setMessage("Please accept the affiliate terms to continue.");
      return;
    }

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !bankName.trim() ||
      !accountHolder.trim() ||
      !accountNumber.trim() ||
      !accountType.trim() ||
      !branchCode.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/affiliate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          bankName: bankName.trim(),
          accountHolder: accountHolder.trim(),
          accountNumber: accountNumber.trim(),
          accountType: accountType.trim(),
          branchCode: branchCode.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to create affiliate account.");
      }

      setCreatedCode(json.affiliateCode || null);
      setExistingAffiliate({
        affiliate_code: json.affiliateCode,
        total_earned: 0,
        total_paid: 0,
        status: "active",
      });
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const showSuccess = !!existingAffiliate;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="RROI logo" width={96} height={96} priority />
          <h1 style={styles.h1}>Become an Affiliate</h1>
          <p style={styles.tagline}>Rapid Response Online Information (RROI)</p>
        </div>

        <div style={styles.notice}>
          <strong>Premium benefit</strong>
          <p style={styles.noticeText}>
            Affiliate access is available to active Premium users only.
          </p>
          <p style={styles.noticeText}>
            Earn <strong>8% commission on the base price</strong> when someone joins Premium
            using your code.
          </p>
        </div>

        {checking ? (
          <div style={styles.loadingBox}>Checking your account…</div>
        ) : showSuccess ? (
          <div style={styles.success}>
            <h2 style={styles.h2}>Affiliate account active</h2>
            <p style={styles.p}>Your affiliate account has been created successfully.</p>

            <div style={styles.codeBox}>
              <div style={styles.codeLabel}>Your Affiliate Code</div>
              <div style={styles.codeValue}>{createdCode}</div>
            </div>

            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Status</div>
                <div style={styles.summaryValue}>{existingAffiliate?.status || "active"}</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Total Earned</div>
                <div style={styles.summaryValue}>
                  R{Number(existingAffiliate?.total_earned ?? 0).toFixed(2)}
                </div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Total Paid</div>
                <div style={styles.summaryValue}>
                  R{Number(existingAffiliate?.total_paid ?? 0).toFixed(2)}
                </div>
              </div>
            </div>

            {message && <p style={styles.errorText}>{message}</p>}

            <div style={styles.links}>
              <Link href="/profile" style={styles.primaryLinkBtn}>
                Go to Profile
              </Link>
              <Link href="/affiliate" style={styles.link}>
                Affiliate page
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
              disabled={loading}
            />

            <label style={styles.label}>Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              placeholder="e.g. 0821234567"
              required
              disabled={loading}
            />

            <label style={styles.label}>Bank name</label>
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              style={styles.input}
              placeholder="e.g. Capitec"
              required
              disabled={loading}
            />

            <label style={styles.label}>Account holder</label>
            <input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              style={styles.input}
              placeholder="Name on the bank account"
              required
              disabled={loading}
            />

            <label style={styles.label}>Account number</label>
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              style={styles.input}
              placeholder="Bank account number"
              required
              disabled={loading}
            />

            <label style={styles.label}>Account type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              style={styles.input}
              disabled={loading}
            >
              <option>Savings</option>
              <option>Cheque</option>
              <option>Business</option>
              <option>Transmission</option>
            </select>

            <label style={styles.label}>Branch code</label>
            <input
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              style={styles.input}
              placeholder="Branch code"
              required
              disabled={loading}
            />

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                disabled={loading}
              />
              <span style={styles.checkboxText}>
                I agree to the{" "}
                <Link href="/affiliate/terms" style={styles.inlineLink}>
                  affiliate terms
                </Link>{" "}
                and confirm my banking details are correct.
              </span>
            </label>

            <button type="submit" style={styles.primaryBtn} disabled={loading || !agree}>
              {loading ? "Creating affiliate account..." : "Create affiliate account"}
            </button>

            {message && <p style={styles.errorText}>{message}</p>}

            <p style={styles.small}>
              Your affiliate code will be created instantly after successful signup and will also
              appear on your profile page.
            </p>

            <div style={styles.links}>
              <Link href="/profile" style={styles.linkMuted}>
                ← Back to Profile
              </Link>
              <Link href="/affiliate" style={styles.link}>
                Affiliate page
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
  loadingBox: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
    background: "#FFFFFF",
    fontWeight: 800,
  },
  success: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
    background: "#FFFFFF",
  },
  h2: {
    fontSize: 20,
    fontWeight: 900,
    margin: "0 0 8px",
  },
  p: {
    margin: "0 0 8px",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  codeBox: {
    marginTop: 14,
    marginBottom: 16,
    border: `1px solid ${BRAND_GREEN}`,
    borderRadius: 14,
    padding: 16,
    background: "#F0FDF4",
  },
  codeLabel: {
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 6,
    opacity: 0.85,
  },
  codeValue: {
    fontSize: 28,
    fontWeight: 900,
    color: BRAND_GREEN,
    letterSpacing: 1,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginTop: 10,
  },
  summaryCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 12,
    background: "#FFFFFF",
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 800,
    opacity: 0.75,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 900,
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
  primaryLinkBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    textDecoration: "none",
  },
  small: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.85,
    lineHeight: 1.5,
  },
  errorText: {
    marginTop: 12,
    color: "#B91C1C",
    fontWeight: 700,
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