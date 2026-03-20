"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const router = useRouter();

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

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();

    // Temporary: store shipping details in sessionStorage for next step
    sessionStorage.setItem("rroi_shipping", JSON.stringify(form));

    router.push("/subscribe/pay");
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 6 }}>Delivery Details</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Please enter the delivery information for your RROI physical items.
      </p>

      <form onSubmit={handleContinue}>
        <Field
          label="Name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
        />
        <Field
          label="Surname"
          value={form.surname}
          onChange={(v) => updateField("surname", v)}
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => updateField("email", v)}
        />
        <Field
          label="Cellphone Number"
          value={form.cellphone}
          onChange={(v) => updateField("cellphone", v)}
        />
        <Field
          label="Street Address"
          value={form.streetAddress}
          onChange={(v) => updateField("streetAddress", v)}
        />
        <Field
          label="City / Town"
          value={form.cityTown}
          onChange={(v) => updateField("cityTown", v)}
        />
        <Field
          label="Postal Code"
          value={form.postalCode}
          onChange={(v) => updateField("postalCode", v)}
        />
        <Field
          label="Province"
          value={form.province}
          onChange={(v) => updateField("province", v)}
        />
        <Field
          label="Unit / Complex / Building"
          value={form.unitComplexBuilding}
          onChange={(v) => updateField("unitComplexBuilding", v)}
        />

        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continue to Payment
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 10,
          border: "1px solid #ccc",
          fontSize: 14,
        }}
      />
    </div>
  );
}