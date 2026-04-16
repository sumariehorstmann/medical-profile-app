"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function OrderPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.href = "/login?redirect=/subscribe/order";
        return;
      }

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
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
  const fullName = profile.emergency1_fullname || "";
  const parts = fullName.trim().split(" ");

  setForm((prev) => ({
    ...prev,
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    blood_type: profile.blood_type || "",
    allergies: profile.allergies || "",
    emergency_contact_name: parts[0] || "",
    emergency_contact_surname: parts.slice(1).join(" ") || "",
    emergency_contact_phone: profile.emergency1_phone || "",
    email: session.user.email || "",
  }));
}

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    return Object.values(form).every((v) => v.trim() !== "");
  }

  async function handleContinue() {
    if (!validate()) {
      alert("Please complete all fields before continuing.");
      return;
    }

    try {
      setSaving(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { error } = await supabase
        .from("premium_order_forms")
        .upsert({
          user_id: session.user.id,
          ...form,
        });

      if (error) {
        alert("Failed to save order form.");
        return;
      }

      router.push("/subscribe/pay");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
        Complete Your Order
      </h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key.replaceAll("_", " ")}
          value={(form as any)[key]}
          onChange={(e) => updateField(key, e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
      ))}

      <button
        onClick={handleContinue}
        disabled={saving}
        style={{
          width: "100%",
          padding: 14,
          background: "black",
          color: "white",
          borderRadius: 10,
        }}
      >
        {saving ? "Saving..." : "Continue to Payment"}
      </button>
    </div>
  );
}