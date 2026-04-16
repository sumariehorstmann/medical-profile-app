"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

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

export default function OrderPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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
          window.location.href = "/login?redirect=/subscribe/order";
          return;
        }

        const user = session.user;

        const [{ data: profile }, { data: savedOrderForm }] = await Promise.all([
          supabase
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
            .maybeSingle(),
          supabase
            .from("premium_order_forms")
            .select(`
              first_name,
              last_name,
              blood_type,
              allergies,
              emergency_contact_name,
              emergency_contact_surname,
              emergency_contact_phone,
              email,
              cellphone,
              shipping_unit,
              shipping_street,
              shipping_city,
              shipping_province,
              shipping_postal_code,
              shipping_country
            `)
            .eq("user_id", user.id)
            .maybeSingle(),
        ]);

        const fullName = (profile?.emergency1_fullname || "").trim();
        const nameParts = fullName ? fullName.split(/\s+/) : [];

        const profileDefaults: Partial<OrderFormData> = {
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          blood_type: profile?.blood_type || "",
          allergies: profile?.allergies || "",
          emergency_contact_name: nameParts[0] || "",
          emergency_contact_surname: nameParts.slice(1).join(" ") || "",
          emergency_contact_phone: profile?.emergency1_phone || "",
          email: user.email || "",
        };

        const merged: OrderFormData = {
          ...EMPTY_FORM,
          ...profileDefaults,
          ...(savedOrderForm || {}),
          shipping_country:
            savedOrderForm?.shipping_country?.trim() || "South Africa",
        };

        if (mounted) {
          setForm(merged);
        }
      } catch {
        if (mounted) {
          setError("Could not load your order form. Please refresh and try again.");
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
  }, [supabase]);

  function updateField<K extends keyof OrderFormData>(
    field: K,
    value: OrderFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function getMissingFields() {
    return (Object.keys(form) as Array<keyof OrderFormData>)
      .filter((key) => form[key].trim() === "")
      .map((key) => FIELD_LABELS[key]);
  }

  async function handleContinue() {
    const missingFields = getMissingFields();

    if (missingFields.length > 0) {
      alert(
        `Please complete all required fields before continuing:\n\n${missingFields.join("\n")}`
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        window.location.href = "/login?redirect=/subscribe/order";
        return;
      }

      const { error: upsertError } = await supabase
        .from("premium_order_forms")
        .upsert(
          {
            user_id: session.user.id,
            ...form,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        setError("Failed to save your order form. Please try again.");
        return;
      }

      router.push("/subscribe/pay");
    } catch {
      setError("Something went wrong while saving your order form.");
    } finally {
      setSaving(false);
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
            <h1 style={styles.title}>Complete Your Order</h1>
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
          <h1 style={styles.title}>Complete Your Order</h1>
          <p style={styles.subtitle}>
            Please complete all required details below before proceeding to secure
            payment. This information is used to prepare your two physical QR code
            products and delivery.
          </p>

          <div style={styles.noticeBox}>
            <div style={styles.noticeTitle}>Important</div>
            <div style={styles.noticeText}>
              All fields on this form are required. Profile information shown here
              may be pre-filled for convenience, but this order form is completed
              separately for your Premium order.
            </div>
          </div>

          {error ? <div style={styles.errorBox}>{error}</div> : null}

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Details</h2>

            <Field
              label="First Name"
              value={form.first_name}
              onChange={(value) => updateField("first_name", value)}
            />

            <Field
              label="Last Name"
              value={form.last_name}
              onChange={(value) => updateField("last_name", value)}
            />

            <Field
              label="Blood Type"
              value={form.blood_type}
              onChange={(value) => updateField("blood_type", value)}
            />

            <Field
              label="Allergies"
              value={form.allergies}
              onChange={(value) => updateField("allergies", value)}
              placeholder="List allergies exactly as you want them recorded"
              multiline
            />
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Emergency Contact</h2>

            <Field
              label="Emergency Contact Name"
              value={form.emergency_contact_name}
              onChange={(value) => updateField("emergency_contact_name", value)}
            />

            <Field
              label="Emergency Contact Surname"
              value={form.emergency_contact_surname}
              onChange={(value) =>
                updateField("emergency_contact_surname", value)
              }
            />

            <Field
              label="Emergency Contact Phone Number"
              value={form.emergency_contact_phone}
              onChange={(value) =>
                updateField("emergency_contact_phone", value)
              }
              inputMode="tel"
            />
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Details</h2>

            <Field
              label="Email Address"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              inputMode="email"
            />

            <Field
              label="Cellphone Number"
              value={form.cellphone}
              onChange={(value) => updateField("cellphone", value)}
              inputMode="tel"
            />

            <Field
              label="Unit / Complex / Building"
              value={form.shipping_unit}
              onChange={(value) => updateField("shipping_unit", value)}
            />

            <Field
              label="Street Address"
              value={form.shipping_street}
              onChange={(value) => updateField("shipping_street", value)}
            />

            <Field
              label="City / Town"
              value={form.shipping_city}
              onChange={(value) => updateField("shipping_city", value)}
            />

            <Field
              label="Province"
              value={form.shipping_province}
              onChange={(value) => updateField("shipping_province", value)}
            />

            <Field
              label="Postal Code"
              value={form.shipping_postal_code}
              onChange={(value) => updateField("shipping_postal_code", value)}
              inputMode="numeric"
            />

            <Field
              label="Country"
              value={form.shipping_country}
              onChange={(value) => updateField("shipping_country", value)}
            />
          </section>

          <div style={styles.securityBox}>
            Secure payment will be processed via PayFast after this form is saved.
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={saving}
            style={{
              ...styles.primaryButton,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Continue to Secure Payment"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            disabled={saving}
            style={styles.secondaryButton}
          >
            Back to Profile
          </button>
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
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  multiline = false,
}: FieldProps) {
  return (
    <div style={styles.fieldWrap}>
      <label style={styles.label}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          style={{ ...styles.input, ...styles.textarea }}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          inputMode={inputMode}
          style={styles.input}
        />
      )}
    </div>
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
    margin: "0 0 20px",
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
  section: {
    marginBottom: 24,
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
  textarea: {
    resize: "vertical",
    minHeight: 100,
    fontFamily: "inherit",
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
    width: "100%",
    padding: "15px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  loadingText: {
    fontSize: 15,
    color: "#475569",
    margin: 0,
  },
};