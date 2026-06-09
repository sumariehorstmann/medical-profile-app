"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const GREEN = "#157A55";

const BASE_PRICE = 499;

type ProfileRow = {
  public_id: string | null;
  first_name: string | null;
  last_name: string | null;
};

type OrderFormRow = {
  first_name: string | null;
  last_name: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency_contact_name: string | null;
  emergency_contact_surname: string | null;
  emergency_contact_phone: string | null;
  email: string | null;
  cellphone: string | null;
  shipping_unit: string | null;
  shipping_street: string | null;
  shipping_city: string | null;
  shipping_province: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  discount_code: string | null;
  discount_percent: number | null;
};

export default function SubscribePage() {
  const supabase = createSupabaseBrowser();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [orderForm, setOrderForm] = useState<OrderFormRow | null>(null);
  const [email, setEmail] = useState("");

  const discountPercent = Number(orderForm?.discount_percent || 0);

const isAffiliateCode =
  orderForm?.discount_code?.startsWith("RROI") &&
  discountPercent === 0;

const discountAmount = isAffiliateCode
  ? 30
  : BASE_PRICE * (discountPercent / 100);

const finalAmount = Number(
  (BASE_PRICE - discountAmount).toFixed(2)
);

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
          window.location.href = "/login?next=/subscribe";
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

        const { data: orderData, error: orderError } = await supabase
          .from("premium_order_forms")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (orderError || !orderData) {
          setMessage(
            "Order details not found. Please complete your order details first."
          );
          return;
        }

        setOrderForm(orderData);
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
      setMessage("Please agree to the Terms, Privacy Policy, and Refund Policy.");
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
          affiliateCode: "",
          agreedToLegal: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Unable to start payment.");
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
            <h1 style={styles.title}>Review Your Premium Order</h1>
            <p style={styles.subtitle}>
              Please confirm your details before continuing to secure checkout with PayFast.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Details</h2>
            <p style={styles.paragraph}>Name: {orderForm?.first_name || "-"} {orderForm?.last_name || "-"}</p>
            <p style={styles.paragraph}>Email: {orderForm?.email || email || "-"}</p>
            <p style={styles.paragraph}>Cellphone: {orderForm?.cellphone || "-"}</p>
            <p style={styles.paragraph}>Blood Type: {orderForm?.blood_type || "-"}</p>
            <p style={styles.paragraph}>Allergies: {orderForm?.allergies || "-"}</p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Emergency Contact</h2>
            <p style={styles.paragraph}>
              Name: {orderForm?.emergency_contact_name || "-"} {orderForm?.emergency_contact_surname || "-"}
            </p>
            <p style={styles.paragraph}>
              Phone: {orderForm?.emergency_contact_phone || "-"}
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Address</h2>
            <p style={styles.paragraph}>{orderForm?.shipping_unit || "-"}</p>
            <p style={styles.paragraph}>{orderForm?.shipping_street || "-"}</p>
            <p style={styles.paragraph}>
              {orderForm?.shipping_city || "-"}, {orderForm?.shipping_province || "-"}
            </p>
            <p style={styles.paragraph}>
              {orderForm?.shipping_postal_code || "-"}, {orderForm?.shipping_country || "South Africa"}
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Order Summary</h2>
            <p style={styles.paragraph}>Product: RROI Premium Full Kit</p>
            <p style={styles.paragraph}>Includes: 2 × QR code emergency products</p>
            <p style={styles.paragraph}>Premium profile activation: Included</p>
            <p style={styles.paragraph}>Nationwide delivery: Included</p>
            <p style={styles.paragraph}>Normal Price: R499.00</p>
            {orderForm?.discount_code ? (
              <p style={styles.paragraph}>
                Discount Code: {orderForm.discount_code}{" "}
{isAffiliateCode ? "(R30 off)" : `(${discountPercent}% off)`}
              </p>
            ) : null}
            <p style={styles.amount}>Amount to Pay: R{finalAmount.toFixed(2)}</p>
          </div>

          <button
            type="button"
            onClick={() => (window.location.href = "/subscribe/order")}
            style={styles.backButton}
          >
            Back to Edit Order Details
          </button>

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
                <a href="/terms" style={styles.link}>Terms &amp; Conditions</a>,{" "}
                <a href="/privacy" style={styles.link}>Privacy Policy</a>, and{" "}
                <a href="/refund-policy" style={styles.link}>Refund &amp; Returns Policy</a>.
              </span>
            </label>
          </div>

          {message ? <p style={styles.error}>{message}</p> : null}

          <button
            onClick={handleSubscribe}
            disabled={loading || !agreed || !orderForm}
            style={{
              ...styles.button,
              opacity: loading || !agreed || !orderForm ? 0.6 : 1,
              cursor: loading || !agreed || !orderForm ? "not-allowed" : "pointer",
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
  amount: {
    margin: "14px 0 0",
    fontSize: 22,
    lineHeight: 1.4,
    color: GREEN,
    fontWeight: 900,
  },
  backButton: {
    width: "100%",
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: "13px 18px",
    background: "#FFFFFF",
    color: TEXT,
    fontSize: 15,
    fontWeight: 800,
    marginBottom: 18,
    cursor: "pointer",
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