"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/client";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const GREEN = "#157A55";
const RED = "#B91C1C";
const AMBER = "#B45309";

const MIN_PAYOUT = 500;

type AffiliateRow = {
  id: string;
  user_id?: string | null;
  affiliate_code?: string | null;
  full_name?: string | null;
  status?: string | null;
  total_earned?: number | null;
  total_paid?: number | null;
  created_at?: string | null;
};

type ReferralRow = {
  id: string;
  affiliate_id?: string | null;
  user_id?: string | null;
  payment_id?: string | null;
  amount?: number | null;
  commission?: number | null;
  status?: string | null;
  created_at?: string | null;
  paid?: boolean | null;
};

type PayoutRow = {
  affiliateId: string;
  affiliateCode: string;
  fullName: string;
  status: string;
  totalEarned: number;
  totalPaid: number;
  unpaidConfirmed: number;
  thresholdRemaining: number;
  eligibleNow: boolean;
  confirmedReferralCount: number;
  latestReferralDate: string | null;
};
type AffiliatePayoutHistoryRow = {
  id: string;
  affiliate_id?: string | null;
  payout_amount?: number | null;
  referral_count?: number | null;
  payout_cycle?: string | null;
  cutoff_date?: string | null;
  paid_at?: string | null;
  paid_by_email?: string | null;
  eft_reference?: string | null;
  notes?: string | null;
};
function formatMoney(value: number) {
  return `R${value.toFixed(2)}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function getCurrentPayoutCycle() {
  const now = new Date();
  const year = now.getFullYear();

  const cycles = [
    { label: `Q1 ${year}`, cutoff: new Date(year, 2, 15), payout: new Date(year, 2, 31) },
    { label: `Q2 ${year}`, cutoff: new Date(year, 5, 15), payout: new Date(year, 5, 30) },
    { label: `Q3 ${year}`, cutoff: new Date(year, 8, 15), payout: new Date(year, 8, 30) },
    { label: `Q4 ${year}`, cutoff: new Date(year, 11, 15), payout: new Date(year, 11, 31) },
  ];

  return cycles.find((cycle) => now <= cycle.cutoff) ?? cycles[3];
}
export default function AdminAffiliatePayoutsPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [affiliates, setAffiliates] = useState<AffiliateRow[]>([]);
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [workingAffiliateId, setWorkingAffiliateId] = useState<string | null>(null);
  const [payoutHistory, setPayoutHistory] = useState<AffiliatePayoutHistoryRow[]>([]);
const payoutCycle = getCurrentPayoutCycle();
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setMessage(null);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          setMessage("Please log in first.");
          setLoading(false);
          return;
        }

        const adminEmails = [
          "sumariehorstmann@gmail.com",
          "support@rroi.co.za",
        ];

        const userEmail = String(user.email || "").toLowerCase();

        if (!adminEmails.includes(userEmail)) {
          setMessage(`Admin access denied for: ${userEmail}`);
          setLoading(false);
          return;
        }

        const { data: affiliateData, error: affiliateError } = await supabase
          .from("affiliates")
          .select("*")
          .order("created_at", { ascending: true });

        if (affiliateError) throw affiliateError;

        const { data: referralData, error: referralError } = await supabase
          .from("affiliate_referrals")
          .select("*")
          .order("created_at", { ascending: false });

        if (referralError) throw referralError;

        if (!mounted) return;

        setAffiliates((affiliateData ?? []) as AffiliateRow[]);
        setReferrals((referralData ?? []) as ReferralRow[]);
      } catch (err: any) {
        if (!mounted) return;
        setMessage(err?.message || "Failed to load affiliate payout data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function handleMarkPaid(affiliateId: string) {
    try {
      setWorkingAffiliateId(affiliateId);
      setMessage(null);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error("You must be logged in as admin.");
      }

      const res = await fetch("/api/admin/affiliate-payouts/mark-paid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ affiliateId }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to mark payout as paid.");
      }

      const payoutAmount = Number(json?.payoutAmount ?? 0);

      setReferrals((prev) =>
        prev.map((referral) =>
          referral.affiliate_id === affiliateId &&
          String(referral.status || "").toLowerCase() === "confirmed" &&
          referral.paid !== true
            ? { ...referral, paid: true }
            : referral
        )
      );

      setAffiliates((prev) =>
        prev.map((affiliate) =>
          affiliate.id === affiliateId
            ? {
                ...affiliate,
                total_paid: Number(affiliate.total_paid ?? 0) + payoutAmount,
              }
            : affiliate
        )
      );

      setMessage(
        `Payout marked as paid successfully. Amount: ${formatMoney(payoutAmount)}`
      );
    } catch (err: any) {
      setMessage(err?.message || "Failed to mark payout as paid.");
    } finally {
      setWorkingAffiliateId(null);
    }
  }

  const payoutRows = useMemo<PayoutRow[]>(() => {
    return affiliates.map((affiliate) => {
      const affiliateReferrals = referrals.filter(
        (referral) => referral.affiliate_id === affiliate.id
      );

      const confirmedReferrals = affiliateReferrals.filter(
        (referral) => String(referral.status || "").toLowerCase() === "confirmed"
      );

      const unpaidConfirmedReferrals = confirmedReferrals.filter((referral) => {
  if (referral.paid === true) return false;
  if (!referral.created_at) return false;

  const referralDate = new Date(referral.created_at);
  return referralDate <= payoutCycle.cutoff;
});

      const unpaidConfirmed = unpaidConfirmedReferrals.reduce((sum, referral) => {
        return sum + Number(referral.commission ?? 0);
      }, 0);

      const totalEarned = Number(affiliate.total_earned ?? 0);
      const totalPaid = Number(affiliate.total_paid ?? 0);
      const thresholdRemaining = Math.max(0, MIN_PAYOUT - unpaidConfirmed);
      const latestReferralDate =
        confirmedReferrals.length > 0 ? confirmedReferrals[0].created_at ?? null : null;

      return {
        affiliateId: affiliate.id,
        affiliateCode: String(affiliate.affiliate_code || "-"),
        fullName: String(affiliate.full_name || "-"),
        status: String(affiliate.status || "-"),
        totalEarned,
        totalPaid,
        unpaidConfirmed,
        thresholdRemaining,
        eligibleNow:
  unpaidConfirmed >= MIN_PAYOUT &&
  new Date() >= payoutCycle.cutoff,
        confirmedReferralCount: confirmedReferrals.length,
        latestReferralDate,
      };
    });
  }, [affiliates, referrals, payoutCycle.cutoff]);

  const totals = useMemo(() => {
    const totalAffiliates = payoutRows.length;
    const approvedAffiliates = payoutRows.filter(
      (row) => row.status.toLowerCase() === "approved"
    ).length;

    const totalConfirmedCommissions = referrals
      .filter((referral) => String(referral.status || "").toLowerCase() === "confirmed")
      .reduce((sum, referral) => sum + Number(referral.commission ?? 0), 0);

    const totalEligibleNow = payoutRows
      .filter((row) => row.eligibleNow)
      .reduce((sum, row) => sum + row.unpaidConfirmed, 0);

    const eligibleAffiliateCount = payoutRows.filter((row) => row.eligibleNow).length;

    return {
      totalAffiliates,
      approvedAffiliates,
      totalConfirmedCommissions,
      totalEligibleNow,
      eligibleAffiliateCount,
    };
  }, [payoutRows, referrals]);

  if (loading) {
    return (
      <main style={styles.page}>
        <section style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>Admin Affiliate Payouts</h1>
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
          <div style={styles.topBar}>
            <div>
              <h1 style={styles.title}>Admin Affiliate Payouts</h1>
              <p style={styles.subtitle}>
                View confirmed commissions, payout eligibility, and which affiliates
                are ready for manual EFT payout.
              </p>
            </div>

            <div style={styles.linkRow}>
              <Link href="/admin/affiliate-applications" style={styles.linkButton}>
                Affiliate Applications
              </Link>
              <Link href="/affiliate/dashboard" style={styles.linkButtonSecondary}>
                Affiliate Dashboard
              </Link>
            </div>
          </div>

          {message ? <div style={styles.errorBox}>{message}</div> : null}

          <div style={styles.grid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Affiliates</div>
              <div style={styles.statValue}>{totals.totalAffiliates}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Approved Affiliates</div>
              <div style={styles.statValue}>{totals.approvedAffiliates}</div>
            </div>
<div style={styles.statCard}>
  <div style={styles.statLabel}>Current Payout Cycle</div>
  <div style={styles.statValue}>{payoutCycle.label}</div>
  <div style={styles.statSubtle}>
    Cut-off: {formatDate(payoutCycle.cutoff.toISOString())} · Payout:{" "}
    {formatDate(payoutCycle.payout.toISOString())}
  </div>
</div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Confirmed Commission</div>
              <div style={styles.statValue}>
                {formatMoney(totals.totalConfirmedCommissions)}
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Ready for Payout Now</div>
              <div style={styles.statValue}>{formatMoney(totals.totalEligibleNow)}</div>
              <div style={styles.statSubtle}>
                {totals.eligibleAffiliateCount} affiliate
                {totals.eligibleAffiliateCount === 1 ? "" : "s"}
              </div>
            </div>
          </div>

          <div style={styles.noticeCard}>
            <div style={styles.noticeTitle}>How to use this page</div>
            <div style={styles.noticeText}>
  Affiliate payouts are processed <strong>quarterly</strong>. Minimum payout
  threshold is <strong>{formatMoney(MIN_PAYOUT)}</strong>. Cut-off dates are{" "}
  <strong>15 March, 15 June, 15 September, 15 December</strong>. Payout dates
  are <strong>31 March, 30 June, 30 September, 31 December</strong>.
</div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Affiliate</th>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Confirmed Referrals</th>
                  <th style={styles.th}>Unpaid Confirmed</th>
                  <th style={styles.th}>Threshold</th>
                  <th style={styles.th}>Eligible</th>
                  <th style={styles.th}>Total Earned</th>
                  <th style={styles.th}>Total Paid</th>
                  <th style={styles.th}>Latest Referral</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {payoutRows.length === 0 ? (
                  <tr>
                    <td style={styles.emptyCell} colSpan={11}>
                      No affiliates found yet.
                    </td>
                  </tr>
                ) : (
                  payoutRows.map((row) => (
                    <tr key={row.affiliateId}>
                      <td style={styles.td}>{row.fullName}</td>
                      <td style={styles.td}>{row.affiliateCode}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            ...(row.status.toLowerCase() === "approved"
                              ? styles.badgeGreen
                              : styles.badgeAmber),
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={styles.td}>{row.confirmedReferralCount}</td>
                      <td style={styles.tdStrong}>{formatMoney(row.unpaidConfirmed)}</td>
                      <td style={styles.td}>
                        {row.eligibleNow
                          ? formatMoney(0)
                          : formatMoney(row.thresholdRemaining)}
                      </td>
                      <td style={styles.td}>
  {row.unpaidConfirmed >= MIN_PAYOUT ? (
    row.eligibleNow ? (
      <span style={{ ...styles.badge, ...styles.badgeGreen }}>Ready</span>
    ) : (
      <span style={{ ...styles.badge, ...styles.badgeAmber }}>
        Waiting for cutoff
      </span>
    )
  ) : (
    <span style={{ ...styles.badge, ...styles.badgeRed }}>
      Below threshold
    </span>
  )}
</td>
                      <td style={styles.td}>{formatMoney(row.totalEarned)}</td>
                      <td style={styles.td}>{formatMoney(row.totalPaid)}</td>
                      <td style={styles.td}>{formatDate(row.latestReferralDate)}</td>
                      <td style={styles.td}>
                        {row.eligibleNow ? (
                          <button
                            onClick={() => handleMarkPaid(row.affiliateId)}
                            disabled={workingAffiliateId === row.affiliateId}
                            style={{
                              ...styles.actionButton,
                              opacity: workingAffiliateId === row.affiliateId ? 0.6 : 1,
                              cursor:
                                workingAffiliateId === row.affiliateId
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {workingAffiliateId === row.affiliateId
                              ? "Processing..."
                              : "Mark as Paid"}
                          </button>
                        ) : (
                          <span style={styles.notEligibleText}>Not eligible</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={styles.bottomNote}>
            This is version 1 of the payout dashboard. It is read-only except for
            marking eligible payouts as paid after manual EFT. The next step will be
            adding payout history tracking.
          </div>
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
    maxWidth: 1400,
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
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px 0 0",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
    maxWidth: 760,
  },
  linkRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  linkButton: {
    textDecoration: "none",
    background: GREEN,
    color: "#FFFFFF",
    padding: "12px 16px",
    borderRadius: 12,
    fontWeight: 800,
  },
  linkButtonSecondary: {
    textDecoration: "none",
    background: "#FFFFFF",
    color: TEXT,
    border: `1px solid ${BORDER}`,
    padding: "12px 16px",
    borderRadius: 12,
    fontWeight: 800,
  },
  errorBox: {
    marginBottom: 18,
    border: "1px solid #FECACA",
    background: "#FEF2F2",
    color: RED,
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 18,
  },
  statCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 18,
    background: "#FFFFFF",
  },
  statLabel: {
    fontSize: 14,
    color: MUTED,
    fontWeight: 700,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    color: TEXT,
    fontWeight: 900,
    lineHeight: 1.1,
  },
  statSubtle: {
    marginTop: 8,
    fontSize: 13,
    color: MUTED,
  },
  noticeCard: {
    border: `1px solid #BBF7D0`,
    background: "#F0FDF4",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: TEXT,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: MUTED,
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    background: "#FFFFFF",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 1220,
  },
  th: {
    textAlign: "left",
    fontSize: 13,
    color: MUTED,
    fontWeight: 800,
    padding: "14px 16px",
    borderBottom: `1px solid ${BORDER}`,
    background: "#F8FAFC",
    whiteSpace: "nowrap",
  },
  td: {
    fontSize: 14,
    color: TEXT,
    padding: "14px 16px",
    borderBottom: `1px solid ${BORDER}`,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  tdStrong: {
    fontSize: 14,
    color: TEXT,
    fontWeight: 800,
    padding: "14px 16px",
    borderBottom: `1px solid ${BORDER}`,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  emptyCell: {
    padding: 24,
    fontSize: 14,
    color: MUTED,
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
  },
  badgeGreen: {
    background: "#DCFCE7",
    color: "#166534",
  },
  badgeAmber: {
    background: "#FEF3C7",
    color: AMBER,
  },
  badgeRed: {
    background: "#FEE2E2",
    color: RED,
  },
  actionButton: {
    padding: "8px 14px",
    borderRadius: 8,
    background: GREEN,
    color: "#FFFFFF",
    fontWeight: 700,
    border: "none",
  },
  notEligibleText: {
    color: "#94A3B8",
    fontWeight: 600,
  },
  bottomNote: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 1.7,
    color: MUTED,
  },
};