"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function ShippingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const ref = (searchParams.get("ref") || "").trim().toUpperCase();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    cellphone: "",
    streetAddress: "",
    cityTown: "",
    postalCode: "",
    province: "",
    unitComplexBuilding: "",
  });

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login?next=/subscribe/shipping");
        return;
      }

      setForm((prev) => ({
        ...prev,
        email: data.user?.email ?? "",
      }));

      setCheckingAuth(false);
    }

    loadUser();
  }, [router, supabase]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    // store shipping
    sessionStorage.setItem("rroi_shipping", JSON.stringify(form));

    // store referral
    if (ref) {
      sessionStorage.setItem("rroi_ref", ref);
    }

    // carry ref to payment page
    const nextUrl = ref
      ? `/subscribe/pay?ref=${encodeURIComponent(ref)}`
      : "/subscribe/pay";

    router.push(nextUrl);
  }

  if (checkingAuth) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.h1}>Checking account...</h1>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Premium delivery details</h1>
        <p style={styles.sub}>
          This step is only for users upgrading to Premium. Your account and profile remain free.
        </p>

        {ref ? (
          <div style={styles.refBox}>
            <strong>Affiliate Code Applied:</strong> {ref}
          </div>
        ) : null}

        <div style={styles.infoBox}>
          <strong>Premium includes:</strong>
          <ul style={styles.ul}>
            <li>Full medical profile visible when QR is scanned</li>
            <li>Three physical QR items included</li>
            <li>Nationwide delivery</li>
          </ul>
        </div>

        <form onSubmit={handleContinue}>
          <Field label="Name" value={form.name} onChange={(v) => updateField("name", v)} />
          <Field label="Surname" value={form.surname} onChange={(v) => updateField("surname", v)} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => updateField("email", v)} />
          <Field label="Cellphone Number" value={form.cellphone} onChange={(v) => updateField("cellphone", v)} />
          <Field label="Street Address" value={form.streetAddress} onChange={(v) => updateField("streetAddress", v)} />
          <Field label="City / Town" value={form.cityTown} onChange={(v) => updateField("cityTown", v)} />
          <Field label="Postal Code" value={form.postalCode} onChange={(v) => updateField("postalCode", v)} />
          <Field label="Province" value={form.province} onChange={(v) => updateField("province", v)} />
          <Field
            label="Unit / Complex / Building"
            value={form.unitComplexBuilding}
            onChange={(v) => updateField("unitComplexBuilding", v)}
            required={false}
          />

          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? "Continuing..." : "Continue to payment"}
          </button>
        </form>

        <button type="button" onClick={() => router.push("/profile")} style={styles.secondaryBtn}>
          Back to profile
        </button>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={styles.input}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
  },
  h1: {
    marginBottom: 6,
    fontSize: 28,
    fontWeight: 800,
  },
  sub: {
    opacity: 0.85,
    marginBottom: 18,
    lineHeight: 1.5,
  },
  refBox: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    background: "#F0FDF4",
    border: "1px solid #BBF7D0",
    color: "#166534",
    fontWeight: 700,
  },
  infoBox: {
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 14,
  },
  ul: {
    margin: "8px 0 0",
    paddingLeft: 18,
    lineHeight: 1.6,
  },
  label: {
    display: "block",
    fontWeight: 700,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  primaryBtn: {
    marginTop: 20,
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #157A55",
    background: "#157A55",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    marginTop: 12,
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #ccc",
    background: "#fff",
    color: "#111",
    fontWeight: 700,
    cursor: "pointer",
  },
};