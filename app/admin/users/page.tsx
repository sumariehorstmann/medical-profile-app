"use client";

import { useEffect, useMemo, useState } from "react";

type AdminUser = {
  user_id: string;
  public_id: string | null;
  first_name: string | null;
  last_name: string | null;
  is_paid: boolean | null;
  subscription_status: string | null;
  plan: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  amount: number | null;
  payment_status: string | null;
  paid_at: string | null;
};

type FilterType = "all" | "free" | "premium" | "active" | "expired";
type SortType = "end_asc" | "end_desc" | "name_asc" | "amount_desc";

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatMoney(value: number | null) {
  if (value === null || value === undefined) return "-";
  return `R${Number(value).toFixed(2)}`;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("end_asc");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/admin/users", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load users.");
        }

        setUsers(data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();

    let rows = users.filter((user) => {
      const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
      const publicId = String(user.public_id || "").toLowerCase();

      const matchesSearch =
        !q || fullName.includes(q) || publicId.includes(q);

      const status = String(user.subscription_status || "").toLowerCase();
      const isPremium = user.is_paid === true || status === "active";

      const matchesFilter =
        filter === "all" ||
        (filter === "free" && !isPremium) ||
        (filter === "premium" && isPremium) ||
        (filter === "active" && status === "active") ||
        (filter === "expired" && status === "expired");

      return matchesSearch && matchesFilter;
    });

    rows = [...rows].sort((a, b) => {
      if (sort === "name_asc") {
        return `${a.first_name || ""} ${a.last_name || ""}`.localeCompare(
          `${b.first_name || ""} ${b.last_name || ""}`
        );
      }

      if (sort === "amount_desc") {
        return Number(b.amount || 0) - Number(a.amount || 0);
      }

      const aDate = a.current_period_end
        ? new Date(a.current_period_end).getTime()
        : Number.MAX_SAFE_INTEGER;

      const bDate = b.current_period_end
        ? new Date(b.current_period_end).getTime()
        : Number.MAX_SAFE_INTEGER;

      return sort === "end_desc" ? bDate - aDate : aDate - bDate;
    });

    return rows;
  }, [users, search, filter, sort]);

  const totalUsers = users.length;
  const premiumUsers = users.filter(
    (u) => u.is_paid === true || u.subscription_status === "active"
  ).length;
  const freeUsers = totalUsers - premiumUsers;
  const revenueTotal = users.reduce(
    (sum, u) => sum + Number(u.amount || 0),
    0
  );

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Admin Users</h1>

      <section style={styles.statsGrid}>
        <Stat label="Total Users" value={totalUsers} />
        <Stat label="Premium Users" value={premiumUsers} />
        <Stat label="Free Users" value={freeUsers} />
        <Stat label="Total Payments" value={`R${revenueTotal.toFixed(2)}`} />
      </section>

      <section style={styles.controls}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or public ID"
          style={styles.input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          style={styles.select}
        >
          <option value="all">All users</option>
          <option value="free">Free profiles</option>
          <option value="premium">Premium profiles</option>
          <option value="active">Active subscriptions</option>
          <option value="expired">Expired subscriptions</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
          style={styles.select}
        >
          <option value="end_asc">Subscription end: soonest first</option>
          <option value="end_desc">Subscription end: latest first</option>
          <option value="name_asc">Name A-Z</option>
          <option value="amount_desc">Amount paid: highest first</option>
        </select>
      </section>

      {loading ? <p>Loading users...</p> : null}
      {error ? <p style={styles.error}>{error}</p> : null}

      {!loading && !error ? (
        <section style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Profile Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Start</th>
                <th style={styles.th}>End</th>
                <th style={styles.th}>Amount Paid</th>
                <th style={styles.th}>Payment</th>
                <th style={styles.th}>Paid At</th>
                <th style={styles.th}>Public ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const status = String(user.subscription_status || "").toLowerCase();
                const isPremium = user.is_paid === true || status === "active";

                return (
                  <tr key={user.user_id}>
                    <td style={styles.td}>
                      {[user.first_name, user.last_name].filter(Boolean).join(" ") || "-"}
                    </td>
                    <td style={styles.td}>{isPremium ? "Premium" : "Free"}</td>
                    <td style={styles.td}>{user.subscription_status || "-"}</td>
                    <td style={styles.td}>{formatDate(user.current_period_start)}</td>
                    <td style={styles.td}>{formatDate(user.current_period_end)}</td>
                    <td style={styles.tdStrong}>{formatMoney(user.amount)}</td>
                    <td style={styles.td}>{user.payment_status || "-"}</td>
                    <td style={styles.td}>{formatDate(user.paid_at)}</td>
                    <td style={styles.tdSmall}>{user.public_id || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: 24,
    color: "#0F172A",
    background: "#F8FAFC",
  },
  title: {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: 20,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
    marginBottom: 20,
  },
  statCard: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 18,
  },
  statLabel: {
    fontSize: 13,
    color: "#475569",
    fontWeight: 800,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 900,
  },
  controls: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    minWidth: 260,
    fontSize: 15,
  },
  select: {
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    fontSize: 15,
    background: "#FFFFFF",
  },
  tableWrap: {
    overflowX: "auto",
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "14px 12px",
    background: "#F1F5F9",
    color: "#334155",
    fontWeight: 900,
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "14px 12px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
  },
  tdStrong: {
    padding: "14px 12px",
    borderBottom: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
    fontWeight: 900,
  },
  tdSmall: {
    padding: "14px 12px",
    borderBottom: "1px solid #E5E7EB",
    fontSize: 12,
    color: "#475569",
    whiteSpace: "nowrap",
  },
  error: {
    color: "#B91C1C",
    fontWeight: 700,
  },
};