type PremiumBannerProps = {
  isPremiumActive: boolean;
  premiumExpiryDate?: string | null;
};

export default function PremiumBanner({
  isPremiumActive,
  premiumExpiryDate,
}: PremiumBannerProps) {
  if (!isPremiumActive) {
    return (
      <section
        style={{
          background: "#fff4f4",
          border: "1px solid #dc2626",
          borderRadius: "16px",
          padding: "18px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 800,
            color: "#991b1b",
          }}
        >
          Your RROI Premium subscription has expired.
        </p>

        <p
          style={{
            margin: "8px 0 0",
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#7f1d1d",
          }}
        >
          Please visit www.rroi.co.za, go to your RROI user profile, and renew
          your Premium subscription to make this feature available again.
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #d9e2dd",
        borderRadius: "16px",
        padding: "18px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 600,
          color: "#4b5563",
        }}
      >
        PREMIUM EXPIRES
      </p>

      <p
        style={{
          margin: "8px 0 0",
          fontSize: "18px",
          fontWeight: 800,
          color: "#157a55",
        }}
      >
        {premiumExpiryDate || "Expiry date unavailable"}
      </p>
    </section>
  );
}