type SOSButtonProps = {
  contactNumber: 1 | 2;
  firstName?: string | null;
  surname?: string | null;
  relationship?: string | null;
  isConfigured: boolean;
  isPremiumActive: boolean;
  isProcessing?: boolean;
  onPress: () => void;
};

export default function SOSButton({
  contactNumber,
  firstName,
  surname,
  relationship,
  isConfigured,
  isPremiumActive,
  isProcessing = false,
  onPress,
}: SOSButtonProps) {
  const isEnabled = isConfigured && isPremiumActive && !isProcessing;
  const fullName = [firstName, surname].filter(Boolean).join(" ");

  return (
    <section style={{ textAlign: "center" }}>
      <button
        type="button"
        onClick={onPress}
        disabled={!isEnabled}
        style={{
          width: "100%",
          minHeight: "92px",
          border: "none",
          borderRadius: "18px",
          padding: "20px",
          background: isEnabled ? "#b00000" : "#b8b8b8",
          color: "#ffffff",
          fontSize: "22px",
          fontWeight: 800,
          cursor: isEnabled ? "pointer" : "not-allowed",
          opacity: isProcessing ? 0.75 : 1,
        }}
      >
        {isProcessing
          ? "PREPARING SOS..."
          : `SOS CONTACT ${contactNumber}`}
      </button>

      <div style={{ marginTop: "10px", color: "#111827" }}>
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 800,
          }}
        >
          {isConfigured ? fullName : "No contact configured"}
        </p>

        {isConfigured && relationship ? (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "14px",
              color: "#4b5563",
            }}
          >
            {relationship}
          </p>
        ) : null}
      </div>
    </section>
  );
}