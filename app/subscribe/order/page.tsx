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

type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency1_fullname: string | null;
  emergency1_phone: string | null;
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

const SECTION_FIELDS: Array<Array<keyof OrderFormData>> = [
  ["first_name", "last_name", "blood_type", "allergies"],
  [
    "emergency_contact_name",
    "emergency_contact_surname",
    "emergency_contact_phone",
  ],
  [
    "email",
    "cellphone",
    "shipping_unit",
    "shipping_street",
    "shipping_city",
    "shipping_province",
    "shipping_postal_code",
    "shipping_country",
  ],
];

export default function OrderPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
            .maybeSingle<ProfileRow>(),
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
            .maybeSingle<OrderFormData>(),
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
          setError(
            "Could not load your order form. Please refresh and try again."
          );
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

    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function sanitizeValue(
    field: keyof OrderFormData,
    value: string
  ): string {
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

  async function handleContinue() {
    const validationErrors = validateForm();
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setError("Please complete all required fields before continuing.");
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

      const { error } = await supabase
  .from("premium_order_forms")
  .upsert({
    user_id: session.user.id,
    ...form,
  })
  .select()
  .single();

if (error) {
  console.error("SAVE ERROR:", error);
  alert("Failed to save order form. Please try again.");
  setSaving(false);
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
            <div style={styles.progress}>Step 1 of 2 — Order Details</div>
            <h1 style={styles.title}>Complete Your Order Details</h1>
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
          <div style={styles.progress}>Step 1 of 2 — Order Details</div>

          <h1 style={styles.title}>Complete Your Order Details</h1>

          <p style={styles.subtitle}>
            This information will be used to create your QR code products and
            deliver your order.
          </p>

          <div style={styles.summaryBox}>
            <div style={styles.summaryTitle}>Your Premium Kit includes:</div>
            <ul style={styles.summaryList}>
              <li>2 × QR code emergency products</li>
              <li>Premium emergency profile activation</li>
              <li>Free nationwide delivery</li>
            </ul>
          </div>

          <div style={styles.noticeBox}>
            <div style={styles.noticeTitle}>Important</div>
            <div style={styles.noticeText}>
              All fields are required. This information is used to create your
              QR code products and deliver your order correctly.
            </div>
          </div>

          {error ? <div style={styles.errorBox}>{error}</div> : null}

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Details</h2>

            <Field
              label="First Name"
              value={form.first_name}
              onChange={(value) => updateField("first_name", value)}
              error={fieldErrors.first_name}
            />

            <Field
              label="Last Name"
              value={form.last_name}
              onChange={(value) => updateField("last_name", value)}
              error={fieldErrors.last_name}
            />

            <Field
              label="Blood Type"
              value={form.blood_type}
              onChange={(value) => updateField("blood_type", value)}
              error={fieldErrors.blood_type}
              placeholder="Example: O+, A-, AB+"
            />

            <Field
              label="Allergies"
              value={form.allergies}
              onChange={(value) => updateField("allergies", value)}
              error={fieldErrors.allergies}
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
              error={fieldErrors.emergency_contact_name}
            />

            <Field
              label="Emergency Contact Surname"
              value={form.emergency_contact_surname}
              onChange={(value) =>
                updateField("emergency_contact_surname", value)
              }
              error={fieldErrors.emergency_contact_surname}
            />

            <Field
              label="Emergency Contact Phone Number"
              value={form.emergency_contact_phone}
              onChange={(value) =>
                updateField(
                  "emergency_contact_phone",
                  sanitizeValue("emergency_contact_phone", value)
                )
              }
              error={fieldErrors.emergency_contact_phone}
              inputMode="tel"
            />
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Details</h2>

            <Field
              label="Email Address"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              error={fieldErrors.email}
              inputMode="email"
            />

            <Field
              label="Cellphone Number"
              value={form.cellphone}
              onChange={(value) =>
                updateField("cellphone", sanitizeValue("cellphone", value))
              }
              error={fieldErrors.cellphone}
              inputMode="tel"
            />

            <Field
              label="Unit / Complex / Building"
              value={form.shipping_unit}
              onChange={(value) => updateField("shipping_unit", value)}
              error={fieldErrors.shipping_unit}
            />

            <Field
              label="Street Address"
              value={form.shipping_street}
              onChange={(value) => updateField("shipping_street", value)}
              error={fieldErrors.shipping_street}
            />

            <Field
              label="City / Town"
              value={form.shipping_city}
              onChange={(value) => updateField("shipping_city", value)}
              error={fieldErrors.shipping_city}
            />

            <Field
              label="Province"
              value={form.shipping_province}
              onChange={(value) => updateField("shipping_province", value)}
              error={fieldErrors.shipping_province}
            />

            <Field
              label="Postal Code"
              value={form.shipping_postal_code}
              onChange={(value) =>
                updateField(
                  "shipping_postal_code",
                  sanitizeValue("shipping_postal_code", value)
                )
              }
              error={fieldErrors.shipping_postal_code}
              inputMode="numeric"
            />

            <Field
              label="Country"
              value={form.shipping_country}
              onChange={() => {}}
              error={fieldErrors.shipping_country}
              disabled
            />
          </section>

          <div style={styles.stickyFooter}>
            <div style={styles.securityBox}>
              • Secure payment via PayFast
              <br />
              • Your order details are saved before payment
              <br />
              • Your information is protected and private
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