"use client";

import { useState } from "react";

export type SOSContactForm = {
  firstName: string;
  surname: string;
  relationship: string;
  phone: string;
};

type SOSContactCardProps = {
  contactNumber: 1 | 2;
  initialContact: SOSContactForm;
  onSave: (contact: SOSContactForm) => Promise<void>;
  onClear: () => Promise<void>;
};

export default function SOSContactCard({
  contactNumber,
  initialContact,
  onSave,
  onClear,
}: SOSContactCardProps) {
  const [contact, setContact] = useState(initialContact);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(field: keyof SOSContactForm, value: string) {
    setContact((current) => ({
      ...current,
      [field]: field === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  }

  async function handleSave() {
    setMessage("");

    if (
      !contact.firstName.trim() ||
      !contact.surname.trim() ||
      !contact.relationship.trim()
    ) {
      setMessage("Please complete the name, surname and relationship.");
      return;
    }

    if (!/^\d{10}$/.test(contact.phone)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        firstName: contact.firstName.trim(),
        surname: contact.surname.trim(),
        relationship: contact.relationship.trim(),
        phone: contact.phone,
      });
      setMessage(`SOS Contact ${contactNumber} saved successfully.`);
    } catch {
      setMessage("The contact could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleClear() {
    const confirmed = window.confirm(
      `Are you sure you want to clear SOS Contact ${contactNumber}? This will disable the SOS button until a new contact is saved.`
    );

    if (!confirmed) return;

    try {
      setIsSaving(true);
      setMessage("");
      await onClear();

      setContact({
        firstName: "",
        surname: "",
        relationship: "",
        phone: "",
      });

      setMessage(`SOS Contact ${contactNumber} cleared.`);
    } catch {
      setMessage("The contact could not be cleared. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "16px",
  };

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #d9e2dd",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <h2 style={{ margin: "0 0 18px", fontSize: "20px" }}>
        SOS CONTACT {contactNumber}
      </h2>

      <div style={{ display: "grid", gap: "14px" }}>
        <label>
          <span style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
            Name
          </span>
          <input
            type="text"
            value={contact.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            style={inputStyle}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
            Surname
          </span>
          <input
            type="text"
            value={contact.surname}
            onChange={(event) => updateField("surname", event.target.value)}
            style={inputStyle}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
            Relationship
          </span>
          <input
            type="text"
            value={contact.relationship}
            onChange={(event) =>
              updateField("relationship", event.target.value)
            }
            style={inputStyle}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
            Mobile number
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={contact.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="0821234567"
            style={inputStyle}
          />
        </label>

        {message ? (
          <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
            {message}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          style={{
            border: "none",
            borderRadius: "10px",
            padding: "13px",
            background: "#157a55",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 800,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "SAVING..." : `SAVE CONTACT ${contactNumber}`}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isSaving}
          style={{
            border: "1px solid #b91c1c",
            borderRadius: "10px",
            padding: "12px",
            background: "#ffffff",
            color: "#b91c1c",
            fontSize: "15px",
            fontWeight: 800,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          CLEAR CONTACT {contactNumber}
        </button>
      </div>
    </section>
  );
}