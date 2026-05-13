"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type OrderFormData = {
  first_name: string;
  last_name: string;
  blood_type: string;
  allergies: string;
  emergency_contact_name: string;
  emergency_contact_surname: string;
  emergency_contact_phone: string;
  email: string;
  cellphone: string;
  shipping_unit: string;
  shipping_street: string;
  shipping_city: string;
  shipping_province: string;
  shipping_postal_code: string;
  shipping_country: string;
};

type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency1_fullname: string | null;
  emergency1_phone: string | null;
};

const DOG_TAG_PRICE = 99;
const QR_CARD_PRICE = 99;
const DELIVERY_FEE = 99;

const EMPTY_FORM: OrderFormData = {
  first_name: "",
  last_name: "",
  blood_type: "",
  allergies: "",
  emergency_contact_name: "",
  emergency_contact_surname: "",
  emergency_contact_phone: "",
  email: "",
  cellphone: "",
  shipping_unit: "",
  shipping_street: "",
  shipping_city: "",
  shipping_province: "",
  shipping_postal_code: "",
  shipping_country: "South Africa",
};

const FIELD_LABELS: Record<keyof OrderFormData, string> = {
  first_name: "First Name",
  last_name: "Last Name",
  blood_type: "Blood Type",
  allergies: "Allergies",
  emergency_contact_name: "Emergency Contact Name",
  emergency_contact_surname: "Emergency Contact Surname",
  emergency_contact_phone: "Emergency Contact Phone Number",
  email: "Email Address",
  cellphone: "Cellphone Number",
  shipping_unit: "Unit / Complex / Building",
  shipping_street: "Street Address",
  shipping_city: "City / Town",
  shipping_province: "Province",
  shipping_postal_code: "Postal Code",
  shipping_country: "Country",
};

function StoreCheckoutInner() {
  const params = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const dogTags = Math.max(0, Number(params.get("dogTags") || 0));
  const cards = Math.max(0, Number(params.get("cards") || 0));

  const subtotal = dogTags * DOG_TAG_PRICE + cards * QR_CARD_PRICE;
  const hasItems = subtotal > 0;
  const total = hasItems ? subtotal + DELIVERY_FEE : 0;

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof OrderFormData, string>>
  >({});
  const [form, setForm] = useState<OrderFormData>(EMPTY_FORM);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          const next = `/store/checkout?dogTags=${dogTags}&cards=${cards}`;
          window.location.href = `/login?next=${encodeURIComponent(next)}`;
          return;
        }

        const user = session.user;

        const { data: profile } = await supabase
          .from("profiles")
          .select(`
            first_name,
            last_name,
            blood_type,
            allergies,
            emergency1_fullname,
            emergency1_phone
          `)
          .eq("user_id", user.id)
          .maybeSingle<ProfileRow>();

        const fullName = (profile?.emergency1_fullname || "").trim();
        const nameParts = fullName ? fullName.split(/\s+/) : [];

        const loadedForm: OrderFormData = {
          ...EMPTY_FORM,
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          blood_type: profile?.blood_type || "",
          allergies: profile?.allergies || "",
          emergency_contact_name: nameParts[0] || "",
          emergency_contact_surname: nameParts.slice(1).join(" ") || "",
          emergency_contact_phone: profile?.emergency1_phone || "",
          email: user.email || "",
          shipping_country: "South Africa",
        };

        if (mounted) {
          setForm(loadedForm);
        }
      } catch {
        if (mounted) {
          setError("Could not load your checkout form. Please refresh and try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [supabase, dogTags, cards]);

  function updateField<K extends keyof OrderFormData>(
    field: K,
    value: OrderFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function sanitizeValue(field: keyof OrderFormData, value: string) {
    if (field === "cellphone" || field === "emergency_contact_phone") {
      return value.replace(/[^\d+]/g, "");
    }

    if (field === "shipping_postal_code") {
      return value.replace(/[^\d]/g, "");
    }

    return value;
  }

  function validateForm() {
    const errors: Partial<Record<keyof OrderFormData, string>> = {};

    (Object.keys(form) as Array<keyof OrderFormData>).forEach((key) => {
      if (form[key].trim() === "") {
        errors[key] = `${FIELD_LABELS[key]} is required.`;
      }
    });

    return errors;
  }

  async function handlePayment() {
    setError("");

    if (!hasItems) {
      setError("Please add at least one item to your order.");
      return;
    }

    const validationErrors = validateForm();
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setError("Please complete all required fields before continuing.");
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
          ...form,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to start store payment.");
      }

      window.location.href = json.redirectUrl;
    } catch (err: any) {
      setError(err?.message || "Failed to start store payment.");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.headerWrap}>
          <PageHeader />
        </div>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.progress}>Step 1 of 2 — Store Order Details</div>
            <h1 style={styles.title}>Complete Your Store Order Details</h1>
            <p style={styles.loadingText}>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerWrap}>
        <PageHeader />
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.progress}>Step 1 of 2 — Store Order Details</div>

          <h1 style={styles.title}>Complete Your Store Order Details</h1>

          <p style={styles.subtitle}>
            This information will be used to engrave your QR code products and
            deliver your order.
          </p>

          <div style={styles.summaryBox}>
            <div style={styles.summaryTitle}>Your store order includes:</div>
            <ul style={styles.summaryList}>
              {dogTags > 0 ? <li>Black anodised aluminium dog tag × {dogTags}</li> : null}
              {cards > 0 ? <li>Black anodised aluminium QR card × {cards}</li> : null}
              <li>Delivery: R{DELIVERY_FEE}</li>
              <li>Total: R{total}</li>
            </ul>
          </div>

          <div style={styles.noticeBox}>
            <div style={styles.noticeTitle}>Important</div>
            <div style={styles.noticeText}>
              Your QR code will link to your existing RROI public profile. The
              information shown depends on whether your profile is Free or Premium.
            </div>
          </div>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Details</h2>

            <Field label="First Name" value={form.first_name} onChange={(v) => updateField("first_name", v)} error={fieldErrors.first_name} />
            <Field label="Last Name" value={form.last_name} onChange={(v) => updateField("last_name", v)} error={fieldErrors.last_name} />
            <Field label="Blood Type" value={form.blood_type} onChange={(v) => updateField("blood_type", v)} error={fieldErrors.blood_type} placeholder="Example: O+, A-, AB+" />
            <Field label="Allergies" value={form.allergies} onChange={(v) => updateField("allergies", v)} error={fieldErrors.allergies} placeholder="List allergies exactly as you want them recorded" multiline />
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Emergency Contact</h2>

            <Field label="Emergency Contact Name" value={form.emergency_contact_name} onChange={(v) => updateField("emergency_contact_name", v)} error={fieldErrors.emergency_contact_name} />
            <Field label="Emergency Contact Surname" value={form.emergency_contact_surname} onChange={(v) => updateField("emergency_contact_surname", v)} error={fieldErrors.emergency_contact_surname} />
            <Field
              label="Emergency Contact Phone Number"
              value={form.emergency_contact_phone}
              onChange={(v) => updateField("emergency_contact_phone", sanitizeValue("emergency_contact_phone", v))}
              error={fieldErrors.emergency_contact_phone}
              inputMode="tel"
            />
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Details</h2>

            <Field label="Email Address" value={form.email} onChange={(v) => updateField("email", v)} error={fieldErrors.email} inputMode="email" />
            <Field label="Cellphone Number" value={form.cellphone} onChange={(v) => updateField("cellphone", sanitizeValue("cellphone", v))} error={fieldErrors.cellphone} inputMode="tel" />
            <Field label="Unit / Complex / Building" value={form.shipping_unit} onChange={(v) => updateField("shipping_unit", v)} error={fieldErrors.shipping_unit} />
            <Field label="Street Address" value={form.shipping_street} onChange={(v) => updateField("shipping_street", v)} error={fieldErrors.shipping_street} />
            <Field label="City / Town" value={form.shipping_city} onChange={(v) => updateField("shipping_city", v)} error={fieldErrors.shipping_city} />
            <Field label="Province" value={form.shipping_province} onChange={(v) => updateField("shipping_province", v)} error={fieldErrors.shipping_province} />
            <Field label="Postal Code" value={form.shipping_postal_code} onChange={(v) => updateField("shipping_postal_code", sanitizeValue("shipping_postal_code", v))} error={fieldErrors.shipping_postal_code} inputMode="numeric" />
            <Field label="Country" value={form.shipping_country} onChange={() => {}} error={fieldErrors.shipping_country} disabled />
          </section>

          <div style={styles.stickyFooter}>
            <div style={styles.securityBox}>
              • Secure payment via PayFast
              <br />
              • Your order details are saved before payment
              <br />
              • Your QR code is linked to your existing RROI profile
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paying || !hasItems}
              style={{
                ...styles.primaryButton,
                opacity: paying || !hasItems ? 0.7 : 1,
                cursor: paying || !hasItems ? "not-allowed" : "pointer",
              }}
            >
              {paying ? "Redirecting..." : "Continue to Secure Payment"}
            </button>

            {error ? <div style={styles.errorBox}>{error}</div> : null}

            <Link href="/store" style={styles.secondaryButton}>
              Back to Store
            </Link>
          </div>

          <PageBottomNav />
        </div>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
  error?: string;
  disabled?: boolean;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  multiline = false,
  error,
  disabled = false,
}: FieldProps) {
  return (
    <div style={styles.fieldWrap}>
      <label style={styles.label}>{label}</label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          style={{
            ...styles.input,
            ...styles.textarea,
            ...(error ? styles.inputError : {}),
            ...(disabled ? styles.inputDisabled : {}),
          }}
          rows={4}
          disabled={disabled}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          inputMode={inputMode}
          style={{
            ...styles.input,
            ...(error ? styles.inputError : {}),
            ...(disabled ? styles.inputDisabled : {}),
          }}
          disabled={disabled}
        />
      )}

      {error ? <div style={styles.errorText}>{error}</div> : null}
    </div>
  );
}

export default function StoreCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main style={styles.page}>
          <div style={styles.headerWrap}>
            <PageHeader />
          </div>
          <div style={styles.container}>
            <div style={styles.card}>Loading checkout...</div>
          </div>
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
    background: "#f6f7f8",
  },
  headerWrap: {
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "32px 16px 48px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  progress: {
    fontSize: 13,
    fontWeight: 700,
    color: "#64748b",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 800,
    margin: "0 0 12px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 1.6,
    color: "#475569",
    margin: "0 0 18px",
  },
  summaryBox: {
    background: "#f8fafc",
    border: "1px solid #dbe3ea",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 8,
  },
  summaryList: {
    margin: 0,
    paddingLeft: 18,
    color: "#334155",
    lineHeight: 1.8,
    fontSize: 14,
  },
  noticeBox: {
    background: "#f8fafc",
    border: "1px solid #dbe3ea",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 6,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#475569",
  },
  section: {
    marginBottom: 20,
    padding: 18,
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    background: "#ffffff",
  },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
  },
  input: {
    width: "100%",
    padding: "14px 14px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    fontSize: 15,
    lineHeight: 1.4,
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  },
  inputError: {
    border: "1px solid #ef4444",
    background: "#fef2f2",
  },
  inputDisabled: {
    background: "#f8fafc",
    color: "#334155",
  },
  textarea: {
    resize: "vertical",
    minHeight: 100,
    fontFamily: "inherit",
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "#b91c1c",
  },
  stickyFooter: {
    position: "sticky",
    bottom: 0,
    background: "#ffffff",
    paddingTop: 12,
  },
  securityBox: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 600,
    color: "#166534",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 12,
    padding: 14,
    lineHeight: 1.7,
  },
  primaryButton: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: 12,
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 12,
  },
  secondaryButton: {
    display: "block",
    width: "100%",
    padding: "15px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
  },
  errorBox: {
    marginBottom: 20,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    fontWeight: 600,
  },
  loadingText: {
    fontSize: 15,
    color: "#475569",
    margin: 0,
  },
};