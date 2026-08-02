"use client";

import { useState } from "react";
import AlertCounter from "./components/AlertCounter";
import PremiumBanner from "./components/PremiumBanner";
import SOSButton from "./components/SOSButton";
import SOSContactCard, {
  SOSContactForm,
} from "./components/SOSContactCard";
import {
  clearSOSContact,
  saveSOSContact,
  sendSOSAlert,
} from "./actions";
import { useSOS } from "./hooks/useSOS";

type Props = {
  isPremium: boolean;
  premiumExpiry: string | null;
};

export default function RROISOSClient({
  isPremium,
  premiumExpiry,
}: Props) {
  const { settings, isLoading, error, refreshSettings } = useSOS();
  const [processingContact, setProcessingContact] = useState<1 | 2 | null>(null);
  const [sosMessage, setSOSMessage] = useState("");

  if (isLoading) {
    return (
      <p style={{ padding: "24px 0", color: "#475569" }}>
        Loading RROI SOS...
      </p>
    );
  }

  if (error || !settings) {
    return (
      <section
        style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #DC2626",
          borderRadius: 16,
          background: "#FFF4F4",
          color: "#991B1B",
        }}
      >
        {error || "RROI SOS could not be loaded."}
      </section>
    );
  }

  const contact1Configured = Boolean(settings.contact_1_phone);
  const contact2Configured = Boolean(settings.contact_2_phone);

  async function saveContact(
    contactNumber: 1 | 2,
    contact: SOSContactForm
  ) {
    await saveSOSContact(contactNumber, contact);
    await refreshSettings();
  }

  async function clearContact(contactNumber: 1 | 2) {
    await clearSOSContact(contactNumber);
    await refreshSettings();
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 20,
      }}
    >
      <h1
        style={{
          margin: "0 0 4px",
          fontSize: "clamp(30px, 6vw, 38px)",
          fontWeight: 900,
          color: "#0F172A",
        }}
      >
        RROI SOS
      </h1>

      <PremiumBanner
        isPremiumActive={isPremium}
        premiumExpiryDate={
          premiumExpiry
            ? new Date(premiumExpiry).toLocaleDateString("en-ZA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : null
        }
      />

      <AlertCounter
        alertsUsed={settings.alerts_used}
        alertsLimit={settings.alerts_limit}
      />

      <SOSButton
        contactNumber={1}
        firstName={settings.contact_1_name}
        surname={settings.contact_1_surname}
        relationship={settings.contact_1_relationship}
        isConfigured={contact1Configured}
        isPremiumActive={isPremium}
        onPress={() => {
          console.log("SOS Contact 1 pressed");
        }}
      />

      <SOSButton
        contactNumber={2}
        firstName={settings.contact_2_name}
        surname={settings.contact_2_surname}
        relationship={settings.contact_2_relationship}
        isConfigured={contact2Configured}
        isPremiumActive={isPremium}
        onPress={() => {
          console.log("SOS Contact 2 pressed");
        }}
      />

      <SOSContactCard
        contactNumber={1}
        initialContact={{
          firstName: settings.contact_1_name ?? "",
          surname: settings.contact_1_surname ?? "",
          relationship: settings.contact_1_relationship ?? "",
          phone: settings.contact_1_phone ?? "",
        }}
        onSave={(contact) => saveContact(1, contact)}
        onClear={() => clearContact(1)}
      />

      <SOSContactCard
        contactNumber={2}
        initialContact={{
          firstName: settings.contact_2_name ?? "",
          surname: settings.contact_2_surname ?? "",
          relationship: settings.contact_2_relationship ?? "",
          phone: settings.contact_2_phone ?? "",
        }}
        onSave={(contact) => saveContact(2, contact)}
        onClear={() => clearContact(2)}
      />
    </div>
  );
}