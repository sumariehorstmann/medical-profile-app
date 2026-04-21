"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type ApplicationRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  promotion_method: string | null;
  target_audience: string | null;
  instagram_handle: string | null;
  facebook_profile: string | null;
  tiktok_handle: string | null;
  experience: string | null;
  experience_details: string | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  account_type: string | null;
  branch_code: string | null;
  status: string | null;
  created_at: string;
};

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";

export default function AdminAffiliateApplicationsPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [workingId, setWorkingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadApplications() {
      try {
        setLoading(true);
        setMessage(null);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login");
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

        const { data, error } = await supabase
          .from("affiliate_applications")
          .select(
            `
              id,
              full_name,
              email,
              phone,
              country,
              province,
              city,
              promotion_method,
              target_audience,
              instagram_handle,
              facebook_profile,
              tiktok_handle,
              experience,
              experience_details,
              bank_name,
              account_holder,
              account_number,
              account_type,
              branch_code,
              status,
              created_at
            `
          )
          .eq("status", "pending")
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (!mounted) return;
        setApplications(data ?? []);
      } catch (err: any) {
        if (!mounted) return;
        setMessage(err?.message || "Failed to load affiliate applications.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadApplications();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleApprove(applicationId: string) {
    try {
      setWorkingId(applicationId);
      setMessage(null);

      const res = await fetch("/api/admin/affiliate-applications/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          reviewNotes: reviewNotes[applicationId] || "",
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to approve application.");
      }

      setApplications((prev) => prev.filter((item) => item.id !== applicationId));
      setMessage("Application approved successfully.");
    } catch (err: any) {
      setMessage(err?.message || "Failed to approve application.");
    } finally {
      setWorkingId(null);
    }
  }

  async function handleDecline(applicationId: string) {
    try {
      setWorkingId(applicationId);
      setMessage(null);

      const res = await fetch("/api/admin/affiliate-applications/decline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          reviewNotes: reviewNotes[applicationId] || "",
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to decline application.");
      }

      setApplications((prev) => prev.filter((item) => item.id !== applicationId));
      setMessage("Application declined successfully.");
    } catch (err: any) {
      setMessage(err?.message || "Failed to decline application.");
    } finally {
      setWorkingId(null);
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Affiliate Applications</h1>
          <p style={styles.text}>Loading applications...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.h1}>Affiliate Applications</h1>
        <p style={styles.text}>
          Review pending affiliate applications and approve or decline them.
        </p>

        {message ? <div style={styles.notice}>{message}</div> : null}

        {applications.length === 0 ? (
          <div style={styles.emptyBox}>No pending applications.</div>
        ) : (
          <div style={styles.list}>
            {applications.map((application) => (
              <section key={application.id} style={styles.card}>
                <div style={styles.headerRow}>
                  <div>
                    <h2 style={styles.h2}>{application.full_name || "Unnamed applicant"}</h2>
                    <p style={styles.meta}>
                      Submitted{" "}
                      {new Date(application.created_at).toLocaleDateString("en-ZA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div style={styles.statusBadge}>Pending</div>
                </div>

                <div style={styles.grid}>
                  <Info label="Email" value={application.email} />
                  <Info label="Phone" value={application.phone} />
                  <Info label="Country" value={application.country} />
                  <Info label="Province" value={application.province} />
                  <Info label="City" value={application.city} />
                  <Info label="Promotion Method" value={application.promotion_method} />
                  <Info label="Target Audience" value={application.target_audience} />
                  <Info label="Instagram" value={application.instagram_handle} />
                  <Info label="Facebook" value={application.facebook_profile} />
                  <Info label="TikTok" value={application.tiktok_handle} />
                  <Info label="Experience" value={application.experience} />
                  <Info label="Experience Details" value={application.experience_details} />
                  <Info label="Bank Name" value={application.bank_name} />
                  <Info label="Account Holder" value={application.account_holder} />
                  <Info label="Account Number" value={application.account_number} />
                  <Info label="Account Type" value={application.account_type} />
                  <Info label="Branch Code" value={application.branch_code} />
                </div>

                <label style={styles.label}>Review notes</label>
                <textarea
                  value={reviewNotes[application.id] || ""}
                  onChange={(e) =>
                    setReviewNotes((prev) => ({
                      ...prev,
                      [application.id]: e.target.value,
                    }))
                  }
                  style={styles.textarea}
                  placeholder="Optional internal review note"
                  disabled={workingId === application.id}
                />

                <div style={styles.actions}>
                  <button
                    type="button"
                    style={styles.approveBtn}
                    onClick={() => handleApprove(application.id)}
                    disabled={workingId === application.id}
                  >
                    {workingId === application.id ? "Processing..." : "Approve"}
                  </button>

                  <button
                    type="button"
                    style={styles.declineBtn}
                    onClick={() => handleDecline(application.id)}
                    disabled={workingId === application.id}
                  >
                    {workingId === application.id ? "Processing..." : "Decline"}
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}

        <div style={styles.links}>
          <Link href="/" style={styles.link}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div style={styles.infoCard}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value || "-"}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: 16,
    display: "flex",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: TEXT,
  },
  wrap: {
    width: "100%",
    maxWidth: 1100,
  },
  h1: {
    fontSize: 32,
    fontWeight: 900,
    margin: "0 0 10px",
  },
  h2: {
    fontSize: 22,
    fontWeight: 900,
    margin: "0 0 6px",
  },
  text: {
    margin: "0 0 18px",
    color: MUTED,
    lineHeight: 1.6,
  },
  meta: {
    margin: 0,
    color: MUTED,
    fontSize: 14,
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
  emptyBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 18,
    background: "#FFFFFF",
    fontWeight: 700,
    color: MUTED,
  },
  list: {
    display: "grid",
    gap: 16,
  },
  card: {
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: 18,
    background: "#FFFFFF",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  statusBadge: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "#FEF3C7",
    color: "#92400E",
    fontWeight: 800,
    fontSize: 13,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  infoCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 12,
    background: "#FFFFFF",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 800,
    color: MUTED,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 700,
    color: TEXT,
    lineHeight: 1.5,
    wordBreak: "break-word",
  },
  label: {
    display: "block",
    marginTop: 16,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 800,
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    resize: "vertical",
    fontFamily: "inherit",
  },
  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 14,
  },
  approveBtn: {
    padding: "11px 16px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  declineBtn: {
    padding: "11px 16px",
    borderRadius: 12,
    border: "1px solid #DC2626",
    background: "#FFFFFF",
    color: "#DC2626",
    fontWeight: 900,
    cursor: "pointer",
  },
  links: {
    marginTop: 20,
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 800,
  },
};