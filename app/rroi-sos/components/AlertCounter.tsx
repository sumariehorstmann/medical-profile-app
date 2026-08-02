type AlertCounterProps = {
  alertsUsed: number;
  alertsLimit: number;
};

export default function AlertCounter({
  alertsUsed,
  alertsLimit,
}: AlertCounterProps) {
  const remaining = Math.max(alertsLimit - alertsUsed, 0);

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #d9e2dd",
        borderRadius: "16px",
        padding: "20px",
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
        RROI SOS ALERTS REMAINING
      </p>

      <p
        style={{
          margin: "8px 0 0",
          fontSize: "34px",
          fontWeight: 800,
          color: "#157a55",
        }}
      >
        {remaining} / {alertsLimit}
      </p>
    </section>
  );
}