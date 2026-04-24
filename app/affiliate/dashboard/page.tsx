"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

type AffiliateRow = {
  id: string;
  affiliate_code: string | null;
  status: string | null;
  total_earned: number | null;
  total_paid: number | null;
  full_name: string | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  account_type: string | null;
  branch_code: string | null;
};

type ReferralRow = {
  id: string;
  payment_id: string | null;
  amount: number | null;
  commission: number | null;
  status: string | null;
  created_at: string;
  paid: boolean | null;
};

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const BG = "#F8FAFC";
const PAYOUT_THRESHOLD = 500;

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [savingBank, setSavingBank] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<AffiliateRow | null>(null);
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [origin, setOrigin] = useState("");
  const [hasPremium, setHasPremium] = useState(false);

  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [branchCode, setBranchCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
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

        const { data: subscription, error: subscriptionError } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle();

        if (subscriptionError) throw subscriptionError;

        const premiumActive =
          !!subscription &&
          subscription.status === "active" &&
          (!subscription.current_period_end ||
            new Date(subscription.current_period_end).getTime() > Date.now());

        if (!mounted) return;
        setHasPremium(premiumActive);

        const { data: affiliateData, error: affiliateError } = await supabase
          .from("affiliates")
          .select(
            "id, affiliate_code, status, total_earned, total_paid, full_name, bank_name, account_holder, account_number, account_type, branch_code"
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (affiliateError) throw affiliateError;

        if (!affiliateData) {
          router.replace("/profile");
          return;
        }

        if (!mounted) return;

        setAffiliate(affiliateData);
        setBankName(affiliateData.bank_name ?? "");
        setAccountHolder(affiliateData.account_holder ?? "");
        setAccountNumber(affiliateData.account_number ?? "");
        setAccountType(affiliateData.account_type ?? "Savings");
        setBranchCode(affiliateData.branch_code ?? "");

        if (
          premiumActive &&
          (affiliateData.status === "approved" ||
            affiliateData.status === "active")
        ) {
          const { data: referralData, error: referralError } = await supabase
            .from("affiliate_referrals")
            .select("id, payment_id, amount, commission, status, created_at, paid")
            .eq("affiliate_id", affiliateData.id)
            .order("created_at", { ascending: false });

          if (referralError) throw referralError;

          if (!mounted) return;
          setReferrals(referralData ?? []);
        } else {
          setReferrals([]);
        }
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

  async function saveBankDetails() {
    if (!affiliate) return;

    if (
      !bankName.trim() ||
      !accountHolder.trim() ||
      !accountNumber.trim() ||
      !accountType.trim() ||
      !branchCode.trim()
    ) {
      setMessage("Please complete all payout banking details.");
      return;
    }

    try {
      setSavingBank(true);
      setMessage(null);

      const updates = {
        bank_name: bankName.trim(),
        account_holder: accountHolder.trim(),
        account_number: accountNumber.trim(),
        account_type: accountType.trim(),
        branch_code: branchCode.trim(),
      };

      const { error } = await supabase
        .from("affiliates")
        .update(updates)
        .eq("id", affiliate.id);

      if (error) throw error;

      setAffiliate({
        ...affiliate,
        ...updates,
      });

      setMessage("Payout banking details saved.");
    } catch (err: any) {
      setMessage(err?.message || "Failed to save banking details.");
    } finally {
      setSavingBank(false);
    }
  }

  async function copyText(text: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(successMessage);
      window.setTimeout(() => {
        setMessage(null);
      }, 2200);
    } catch {
      setMessage("Could not copy. Please copy manually.");
    }
  }

  function normalizeStatus(value: string | null | undefined) {
    return String(value || "").trim().toLowerCase();
  }

  function titleCaseStatus(value: string | null | undefined) {
    const status = normalizeStatus(value);
    if (!status) return "-";
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function getNextCutoffAndPayout(now = new Date()) {
    const year = now.getFullYear();

    const cycles = [
      {
        cutoff: new Date(year, 2, 15, 23, 59, 59, 999),
        payout: new Date(year, 2, 31, 23, 59, 59, 999),
      },
      {
        cutoff: new Date(year, 5, 15, 23, 59, 59, 999),
        payout: new Date(year, 5, 30, 23, 59, 59, 999),
      },
      {
        cutoff: new Date(year, 8, 15, 23, 59, 59, 999),
        payout: new Date(year, 8, 30, 23, 59, 59, 999),
      },
      {
        cutoff: new Date(year, 11, 15, 23, 59, 59, 999),
        payout: new Date(year, 11, 31, 23, 59, 59, 999),
      },
    ];

    for (const cycle of cycles) {
      if (now.getTime() <= cycle.payout.getTime()) {
        return cycle;
      }
    }

    return {
      cutoff: new Date(year + 1, 2, 15, 23, 59, 59, 999),
      payout: new Date(year + 1, 2, 31, 23, 59, 59, 999),
    };
  }

  function formatDate(dateValue: Date | string) {
    const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;

    return date.toLocaleDateString("en-ZA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  if (!affiliate) return null;

  const affiliateStatus = normalizeStatus(affiliate.status);
  const isPending = affiliateStatus === "pending";
  const isRejected = affiliateStatus === "rejected";
  const isApproved =
    affiliateStatus === "approved" || affiliateStatus === "active";

  const nextCycle = getNextCutoffAndPayout();
  const referralLink =
    origin && affiliate.affiliate_code
      ? `${origin}/subscribe?ref=${affiliate.affiliate_code}`
      : "";

  const totalEarned = Number(affiliate.total_earned ?? 0);
  const totalPaid = Number(affiliate.total_paid ?? 0);

  const confirmedUnpaid = referrals
    .filter(
      (item) =>
        normalizeStatus(item.status) === "confirmed" && item.paid !== true
    )
    .reduce((sum, item) => sum + Number(item.commission ?? 0), 0);

  const pendingCommissions = referrals
    .filter((item) => normalizeStatus(item.status) === "pending")
    .reduce((sum, item) => sum + Number(item.commission ?? 0), 0);

  const paidCommissions = referrals
    .filter((item) => item.paid === true)
    .reduce((sum, item) => sum + Number(item.commission ?? 0), 0);

  const currentEligiblePayout = Number(confirmedUnpaid.toFixed(2));
  const thresholdRemaining = Math.max(
    0,
    Number((PAYOUT_THRESHOLD - currentEligiblePayout).toFixed(2))
  );
  const thresholdMet = currentEligiblePayout >= PAYOUT_THRESHOLD;

  if (!hasPremium) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <PageHeader />
          <h1 style={styles.h1}>Affiliate Dashboard</h1>

          <div style={styles.stateBox}>
            <h2 style={styles.h2}>Affiliate Access Disabled</h2>
            <p style={styles.p}>
              Your affiliate dashboard is only available while your RROI Premium
              subscription is active.
            </p>

            {message ? <div style={styles.notice}>{message}</div> : null}

            <div style={styles.links}>
              <Link href="/subscribe/order" style={styles.primaryLinkBtn}>
                Upgrade to Premium
              </Link>
              <Link href="/profile" style={styles.link}>
                Profile
              </Link>
              <Link href="/affiliate/terms" style={styles.linkMuted}>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isPending || isRejected || !isApproved) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <PageHeader />
          <h1 style={styles.h1}>Affiliate Dashboard</h1>

          <div style={styles.stateBox}>
            <h2 style={styles.h2}>
              {isPending
                ? "Application Pending Review"
                : isRejected
                ? "Application Declined"
                : "Affiliate Access Unavailable"}
            </h2>
            <p style={styles.p}>
              {isPending
                ? "Your affiliate application is currently under review. Applications are approved or declined within 7 working days."
                : isRejected
                ? "Your affiliate application was not approved. Please contact RROI if you would like to ask whether re-application is possible."
                : "Your affiliate access is not currently active."}
            </p>

            {message ? <div style={styles.notice}>{message}</div> : null}

            <div style={styles.links}>
              <Link href="/profile" style={styles.primaryLinkBtn}>
                Go to Profile
              </Link>
              <Link href="/affiliate/terms" style={styles.link}>
                View Terms
              </Link>
              <Link href="/" style={styles.linkMuted}>
                Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <PageHeader />

        <h1 style={styles.h1}>Affiliate Dashboard</h1>

        <p style={styles.intro}>
          Track your affiliate code, referral link, eligible payout amount,
          payout banking details, and referral activity in one place.
        </p>

        {message ? <div style={styles.notice}>{message}</div> : null}

        <section style={styles.section}>
          <h2 style={styles.h2}>Affiliate Overview</h2>

          <div style={styles.grid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Status</div>
              <div style={styles.statValue}>
                {titleCaseStatus(affiliate.status)}
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Affiliate Code</div>
              <div style={styles.statValue}>
                {affiliate.affiliate_code || "Pending email"}
              </div>
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
              <div style={styles.statLabel}>Eligible for Payout</div>
              <div style={styles.statValue}>
                R{currentEligiblePayout.toFixed(2)}
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Pending Verification</div>
              <div style={styles.statValue}>
                R{pendingCommissions.toFixed(2)}
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Threshold</div>
              <div style={styles.statValue}>
                {thresholdMet
                  ? "Reached"
                  : `R${thresholdRemaining.toFixed(2)} left`}
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Paid Commission</div>
              <div style={styles.statValue}>R{paidCommissions.toFixed(2)}</div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Payout Schedule</h2>

          <div style={styles.grid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Next Cut-Off Date</div>
              <div style={styles.statValue}>{formatDate(nextCycle.cutoff)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Next Payout Date</div>
              <div style={styles.statValue}>{formatDate(nextCycle.payout)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Minimum Payout</div>
              <div style={styles.statValue}>R{PAYOUT_THRESHOLD.toFixed(2)}</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Payout Method</div>
              <div style={styles.statValue}>EFT</div>
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              Approved commissions earned before the cut-off date are processed
              in that payout cycle.
            </p>
            <p style={styles.infoText}>
              Approved balances below R500 roll over to the next payout period.
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Payout Banking Details</h2>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              These banking details are used by RROI to process manual EFT
              affiliate payouts.
            </p>
          </div>

          <div style={styles.formGrid}>
            <label style={styles.field}>
              <span style={styles.label}>Bank Name</span>
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={styles.input}
                placeholder="Example: Capitec, FNB, Standard Bank"
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>Account Holder</span>
              <input
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                style={styles.input}
                placeholder="Name on bank account"
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>Account Number</span>
              <input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={styles.input}
                placeholder="Bank account number"
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>Account Type</span>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={styles.input}
              >
                <option value="Savings">Savings</option>
                <option value="Cheque">Cheque</option>
                <option value="Current">Current</option>
                <option value="Transmission">Transmission</option>
              </select>
            </label>

            <label style={styles.field}>
              <span style={styles.label}>Branch Code</span>
              <input
                value={branchCode}
                onChange={(e) => setBranchCode(e.target.value)}
                style={styles.input}
                placeholder="Universal or branch code"
              />
            </label>
          </div>

          <button
            type="button"
            style={{
              ...styles.primaryBtn,
              opacity: savingBank ? 0.65 : 1,
              cursor: savingBank ? "not-allowed" : "pointer",
              marginTop: 14,
            }}
            disabled={savingBank}
            onClick={saveBankDetails}
          >
            {savingBank ? "Saving..." : "Save Banking Details"}
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Share Your Referral Tools</h2>

          <div style={styles.shareBox}>
            <div style={styles.shareLabel}>Affiliate Code</div>
            <div style={styles.shareValue}>
              {affiliate.affiliate_code || "Pending email"}
            </div>
            <button
              type="button"
              style={styles.primaryBtn}
              disabled={!affiliate.affiliate_code}
              onClick={() =>
                affiliate.affiliate_code
                  ? copyText(affiliate.affiliate_code, "Affiliate code copied.")
                  : null
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
            <div style={styles.emptyBox}>
              No referral activity has been recorded yet.
            </div>
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
                      <td style={styles.td}>{formatDate(referral.created_at)}</td>
                      <td style={styles.td}>{referral.payment_id || "-"}</td>
                      <td style={styles.td}>
                        R{Number(referral.amount ?? 0).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        R{Number(referral.commission ?? 0).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        {referral.paid
                          ? "Paid"
                          : titleCaseStatus(referral.status)}
                      </td>
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
          <Link href="/affiliate/terms" style={styles.link}>
            Terms
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

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: BG,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 980,
    border: `1px solid ${BORDER}`,
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
    lineHeight: 1.5,
  },
  stateBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 18,
    background: "#FFFFFF",
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
  p: {
    margin: "0 0 10px",
    lineHeight: 1.6,
    color: TEXT,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  statCard: {
    border: `1px solid ${BORDER}`,
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
    overflowWrap: "break-word",
    color: TEXT,
  },
  infoBox: {
    marginTop: 14,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 14,
    background: "#F8FAFC",
  },
  infoText: {
    margin: "0 0 8px",
    lineHeight: 1.55,
    color: TEXT,
  },
  formGrid: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 800,
    color: TEXT,
  },
  input: {
    width: "100%",
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    padding: "11px 12px",
    fontSize: 14,
    color: TEXT,
    background: "#FFFFFF",
    outline: "none",
  },
  shareBox: {
    border: `1px solid ${BORDER}`,
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
    overflowWrap: "break-word",
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
  primaryLinkBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 14px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    textDecoration: "none",
  },
  emptyBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 16,
    background: "#F8FAFC",
    color: MUTED,
    fontWeight: 700,
  },
  tableWrap: {
    overflowX: "auto",
    border: `1px solid ${BORDER}`,
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
    borderBottom: `1px solid ${BORDER}`,
    background: "#F8FAFC",
    fontSize: 13,
    fontWeight: 800,
    color: TEXT,
  },
  td: {
    padding: 12,
    borderBottom: `1px solid ${BORDER}`,
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