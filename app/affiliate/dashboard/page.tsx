"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

type AffiliateRow = {
  id: string;
  affiliate_code: string;
  status: string;
  total_earned: number | null;
  total_paid: number | null;
  full_name: string | null;
};

type ReferralRow = {
  id: string;
  payment_id: string;
  amount: number | null;
  commission: number | null;
  status: string | null;
  created_at: string;
};

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<AffiliateRow | null>(null);
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setMessage(null);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login?next=/affiliate/dashboard");
          return;
        }

        const { data: affiliateData, error: affiliateError } = await supabase
          .from("affiliates")
          .select("id, affiliate_code, status, total_earned, total_paid, full_name")
          .eq("user_id", user.id)
          .maybeSingle();

        if (affiliateError) throw affiliateError;

        if (!affiliateData) {
          router.replace("/profile");
          return;
        }

        const { data: referralData, error: referralError } = await supabase
          .from("affiliate_referrals")
          .select("id, payment_id, amount, commission, status, created_at")
          .eq("affiliate_id", affiliateData.id)
          .order("created_at", { ascending: false });

        if (referralError) throw referralError;

        if (!mounted) return;

        setAffiliate(affiliateData);
        setReferrals(referralData ?? []);
      } catch (err: any) {
        if (!mounted) return;
        setMessage(err?.message || "Failed to load affiliate dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function copyText(text: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(successMessage);
      setTimeout(() => setMessage(null), 2000);
    } catch {
      setMessage("Could not copy. Please copy manually.");
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <PageHeader />
          <p style={styles.loading}>Loading affiliate dashboard...</p>
        </div>
      </main>
    );
  }

  if (!affiliate) {
    return null;
  }

  const totalEarned = Number(affiliate.total_earned ?? 0);
  const totalPaid = Number(affiliate.total_paid ?? 0);
  const pendingPayout = Number((totalEarned - totalPaid).toFixed(2));
  const referralLink = origin
    ? `${origin}/subscribe?ref=${affiliate.affiliate_code}`
    : "";

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <PageHeader />

        <h1 style={styles.h1}>Affiliate Dashboard</h1>

        <p style={styles.intro}>
          Manage your affiliate code, referral link, earnings, and recent
          referral activity from one place.
        </p>

        {message ? <div style={styles.notice}>{message}</div> : null}

        <section style={styles.section}>
          <h2 style={styles.h2}>Affiliate Details</h2>

          <div style={styles.grid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Status</div>
              <div style={styles.statValue}>{affiliate.status}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Affiliate Code</div>
              <div style={styles.statValue}>{affiliate.affiliate_code}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Earned</div>
              <div style={styles.statValue}>R{totalEarned.toFixed(2)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Paid</div>
              <div style={styles.statValue}>R{totalPaid.toFixed(2)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Pending Payout</div>
              <div style={styles.statValue}>R{pendingPayout.toFixed(2)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Confirmed Referrals</div>
              <div style={styles.statValue}>{referrals.length}</div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Share Your Code</h2>

          <div style={styles.shareBox}>
            <div style={styles.shareLabel}>Affiliate Code</div>
            <div style={styles.shareValue}>{affiliate.affiliate_code}</div>
            <button
              type="button"
              style={styles.primaryBtn}
              onClick={() =>
                copyText(affiliate.affiliate_code, "Affiliate code copied.")
              }
            >
              Copy Code
            </button>
          </div>

          <div style={{ ...styles.shareBox, marginTop: 14 }}>
            <div style={styles.shareLabel}>Referral Link</div>
            <div style={styles.linkBox}>{referralLink || "Loading link..."}</div>
            <button
              type="button"
              style={styles.primaryBtn}
              disabled={!referralLink}
              onClick={() => copyText(referralLink, "Referral link copied.")}
            >
              Copy Referral Link
            </button>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Recent Referrals</h2>

          {referrals.length === 0 ? (
            <div style={styles.emptyBox}>No referrals recorded yet.</div>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Payment</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Commission</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id}>
                      <td style={styles.td}>
                        {new Date(referral.created_at).toLocaleDateString("en-ZA", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td style={styles.td}>{referral.payment_id}</td>
                      <td style={styles.td}>
                        R{Number(referral.amount ?? 0).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        R{Number(referral.commission ?? 0).toFixed(2)}
                      </td>
                      <td style={styles.td}>{referral.status ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div style={styles.links}>
          <Link href="/profile" style={styles.link}>
            Profile
          </Link>
          <span style={styles.dot}>•</span>
          <Link href="/" style={styles.linkMuted}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: 16,
    display: "flex",
    justifyContent: "center",
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 980,
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 24,
    background: "#FFFFFF",
    boxShadow: "0 14px 42px rgba(15, 23, 42, 0.08)",
  },
  h1: {
    fontSize: 34,
    fontWeight: 900,
    margin: "0 0 10px",
    textAlign: "center",
    color: TEXT,
  },
  intro: {
    margin: "0 0 20px",
    fontSize: 15,
    lineHeight: 1.6,
    color: MUTED,
    textAlign: "center",
  },
  loading: {
    margin: 0,
    fontWeight: 700,
    textAlign: "center",
    color: TEXT,
  },
  notice: {
    marginBottom: 18,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #BBF7D0",
    background: "#F0FDF4",
    color: "#166534",
    fontWeight: 700,
  },
  section: {
    marginTop: 24,
  },
  h2: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 12,
    color: TEXT,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  statCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
    background: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 800,
    opacity: 0.75,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 900,
    wordBreak: "break-word",
    color: TEXT,
  },
  shareBox: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
    background: "#F8FAFC",
  },
  shareLabel: {
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 6,
    opacity: 0.8,
    color: TEXT,
  },
  shareValue: {
    fontSize: 28,
    fontWeight: 900,
    color: BRAND_GREEN,
    marginBottom: 12,
    letterSpacing: 1,
    wordBreak: "break-word",
  },
  linkBox: {
    padding: 12,
    borderRadius: 10,
    background: "#FFFFFF",
    border: "1px solid #CBD5E1",
    marginBottom: 12,
    overflowWrap: "anywhere",
    lineHeight: 1.5,
    color: TEXT,
  },
  primaryBtn: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 800,
    cursor: "pointer",
  },
  emptyBox: {
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
    background: "#F8FAFC",
    color: MUTED,
    fontWeight: 700,
  },
  tableWrap: {
    overflowX: "auto",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    background: "#FFFFFF",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 720,
  },
  th: {
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid #E5E7EB",
    background: "#F8FAFC",
    fontSize: 13,
    fontWeight: 800,
    color: TEXT,
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #E5E7EB",
    fontSize: 14,
    verticalAlign: "top",
    color: TEXT,
  },
  links: {
    marginTop: 24,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 800,
  },
  linkMuted: {
    textDecoration: "none",
    color: TEXT,
    opacity: 0.85,
    fontWeight: 800,
  },
  dot: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 1,
  },
};