"use client";

import { useState } from "react";
import SOSHistory from "./components/SOSHistory";
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
  const {
  settings,
  history,
  isLoading,
  error,
  refreshSettings,
} = useSOS();
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
      {sosMessage && (
  <section
    role="status"
    aria-live="polite"
    style={{
      padding: 16,
      borderRadius: 14,
      border: "1px solid #CBD5E1",
      background: "#FFFFFF",
      color: sosMessage.includes("successfully")
        ? "#166534"
        : sosMessage.includes("could not") ||
            sosMessage.includes("not available") ||
            sosMessage.includes("Please")
          ? "#991B1B"
          : "#0F172A",
      fontWeight: 700,
      textAlign: "center",
    }}
  >
    {processingContact
      ? `SOS Contact ${processingContact}: ${sosMessage}`
      : sosMessage}
  </section>
)}

      <SOSButton
        contactNumber={1}
        firstName={settings.contact_1_name}
        surname={settings.contact_1_surname}
        relationship={settings.contact_1_relationship}
        isConfigured={contact1Configured}
        isPremiumActive={isPremium}
        onPress={() => {
  if (!navigator.geolocation) {
    setSOSMessage("Location services are not available on this device.");
    return;
  }

  setProcessingContact(1);
  setSOSMessage("Getting your current location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setSOSMessage("Sending SOS alert...");

        await sendSOSAlert({
          contactNumber: 1,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setSOSMessage("SOS alert sent successfully.");
        await refreshSettings();
      } catch (error) {
        setSOSMessage(
          error instanceof Error
            ? error.message
            : "The SOS alert could not be sent."
        );
      } finally {
        setProcessingContact(null);
      }
    },
    () => {
      setSOSMessage(
        "Your current location could not be obtained. Please allow location access."
      );
      setProcessingContact(null);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
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
  if (!navigator.geolocation) {
    setSOSMessage("Location services are not available on this device.");
    return;
  }

  setProcessingContact(2);
  setSOSMessage("Getting your current location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setSOSMessage("Sending SOS alert...");

        await sendSOSAlert({
          contactNumber: 2,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setSOSMessage("SOS alert sent successfully.");
        await refreshSettings();
      } catch (error) {
        setSOSMessage(
          error instanceof Error
            ? error.message
            : "The SOS alert could not be sent."
        );
      } finally {
        setProcessingContact(null);
      }
    },
    () => {
      setSOSMessage(
        "Your current location could not be obtained. Please allow location access."
      );
      setProcessingContact(null);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
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
      <SOSHistory
  history={history.map((item) => ({
    id: item.id,
    status:
      item.sms_status === "Delivered" ||
      item.sms_status === "Failed" ||
      item.sms_status === "Cancelled" ||
      item.sms_status === "Queued"
        ? item.sms_status
        : "Queued",
    contactNumber: item.contact_number === 2 ? 2 : 1,
    contactName: item.recipient_name,
    createdAt: new Date(item.created_at).toLocaleString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    locationUrl:
      item.latitude !== null && item.longitude !== null
        ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
        : null,
  }))}
/>
    </div>
  );
}