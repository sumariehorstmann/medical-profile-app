"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";
import { createSupabaseBrowser } from "@/lib/supabase/client";

const DOG_TAG_PRICE = 99;
const QR_CARD_PRICE = 99;
const DELIVERY_FEE = 99;

function StoreCheckoutInner() {
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const dogTags = Math.max(0, Number(params.get("dogTags") || 0));
  const cards = Math.max(0, Number(params.get("cards") || 0));

  const subtotal = dogTags * DOG_TAG_PRICE + cards * QR_CARD_PRICE;
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    unit: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  });

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        const next = `/store/checkout?dogTags=${dogTags}&cards=${cards}`;
        window.location.href = `/login?next=${encodeURIComponent(next)}`;
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setForm((prev) => ({
          ...prev,
          email: user.email || "",
        }));
      }

      setLoading(false);
    }

    loadUser();
  }, [supabase, dogTags, cards]);

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handlePayment() {
    setMessage(null);

    if (subtotal <= 0) {
      setMessage("Please add at least one item to your order.");
      return;
    }

    if (
      !form.customerName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.street.trim() ||
      !form.city.trim() ||
      !form.province.trim() ||
      !form.postalCode.trim()
    ) {
      setMessage("Please complete all required delivery fields.");
      return;
    }

    try {
      setPaying(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("/api/payfast/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          dogTags,
          cards,
          deliveryFee: DELIVERY_FEE,
          customerName: form.customerName,
          email: form.email,
          phone: form.phone,
          unit: form.unit,
          street: form.street,
          city: form.city,
          province: form.province,
          postalCode: form.postalCode,
          country: form.country,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to start store payment.");
      }

      window.location.href = json.redirectUrl;
    } catch (err: any) {
      setMessage(err?.message || "Failed to start store payment.");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <PageHeader />
          <p style={styles.loadingText}>Loading checkout...</p>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Store Checkout</h1>
            <p style={styles.subtitle}>
              Complete your delivery details for your engraved RROI QR code
              items.
            </p>
          </div>

          <div style={styles.notice}>
            Your QR code will link to your existing RROI public profile. The
            information shown depends on whether your profile is Free or Premium.
          </div>

          <div style={styles.grid}>
            <div style={styles.formCard}>
              <h2 style={styles.h2}>Delivery details</h2>

              <Input label="Full name *" value={form.customerName} onChange={(v) => updateField("customerName", v)} />
              <Input label="Email *" value={form.email} onChange={(v) => updateField("email", v)} />
              <Input label="Phone number *" value={form.phone} onChange={(v) => updateField("phone", v)} />
              <Input label="Unit / Complex / Building" value={form.unit} onChange={(v) => updateField("unit", v)} />
              <Input label="Street address *" value={form.street} onChange={(v) => updateField("street", v)} />
              <Input label="City / Town *" value={form.city} onChange={(v) => updateField("city", v)} />
              <Input label="Province *" value={form.province} onChange={(v) => updateField("province", v)} />
              <Input label="Postal code *" value={form.postalCode} onChange={(v) => updateField("postalCode", v)} />
              <Input label="Country *" value={form.country} onChange={(v) => updateField("country", v)} />
            </div>

            <div style={styles.summaryCard}>
              <h2 style={styles.h2}>Order summary</h2>

              {dogTags > 0 ? (
                <div style={styles.summaryLine}>
                  <span>Dog Tag x {dogTags}</span>
                  <strong>R{dogTags * DOG_TAG_PRICE}</strong>
                </div>
              ) : null}

              {cards > 0 ? (
                <div style={styles.summaryLine}>
                  <span>QR Card x {cards}</span>
                  <strong>R{cards * QR_CARD_PRICE}</strong>
                </div>
              ) : null}

              <div style={styles.summaryLine}>
                <span>Delivery</span>
                <strong>R{DELIVERY_FEE}</strong>
              </div>

              <div style={styles.totalLine}>
                <span>Total</span>
                <strong>R{total}</strong>
              </div>

              {message ? <div style={styles.error}>{message}</div> : null}

              <button
                type="button"
                onClick={handlePayment}
                disabled={paying || subtotal <= 0}
                style={{
                  ...styles.payBtn,
                  ...(paying || subtotal <= 0 ? styles.payBtnDisabled : {}),
                }}
              >
                {paying ? "Redirecting..." : "Pay Now"}
              </button>

              <Link href="/store" style={styles.backLink}>
                ← Back to Store
              </Link>
            </div>
          </div>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label style={styles.label}>
      <span style={styles.labelText}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
    </label>
  );
}

export default function StoreCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main style={styles.page}>
          <section style={styles.card}>Loading checkout...</section>
        </main>
      }
    >
      <StoreCheckoutInner />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    color: "#0F172A",
  },
  subtitle: {
    margin: "12px auto 0",
    maxWidth: 680,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#475569",
  },
  notice: {
    border: "1px solid #A7F3D0",
    borderRadius: 16,
    padding: 16,
    background: "#ECFDF5",
    color: "#065F46",
    fontWeight: 700,
    lineHeight: 1.6,
    marginBottom: 22,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 0.8fr)",
    gap: 20,
    alignItems: "start",
  },
  formCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
  },
  summaryCard: {
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 20,
    background: "#F8FAFC",
  },
  h2: {
    margin: "0 0 16px",
    fontSize: 22,
    fontWeight: 900,
    color: "#0F172A",
  },
  label: {
    display: "block",
    marginBottom: 14,
  },
  labelText: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 800,
    color: "#0F172A",
  },
  input: {
    width: "100%",
    border: "1px solid #D1D5DB",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 15,
    color: "#0F172A",
    background: "#FFFFFF",
    outline: "none",
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "8px 0",
    fontSize: 15,
    color: "#475569",
  },
  totalLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    borderTop: "1px solid #E5E7EB",
    marginTop: 10,
    paddingTop: 16,
    fontSize: 22,
    fontWeight: 900,
    color: "#0F172A",
  },
  payBtn: {
    width: "100%",
    marginTop: 20,
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    background: "#157A55",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
  },
  payBtnDisabled: {
    background: "#94A3B8",
    cursor: "not-allowed",
  },
  backLink: {
    display: "block",
    textAlign: "center",
    marginTop: 14,
    color: "#157A55",
    fontWeight: 800,
    textDecoration: "none",
  },
  error: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    background: "#FEF2F2",
    color: "#991B1B",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  loadingText: {
    textAlign: "center",
    color: "#475569",
    fontWeight: 700,
  },
};