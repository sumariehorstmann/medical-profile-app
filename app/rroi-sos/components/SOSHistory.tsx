type HistoryItem = {
  id: string;
  status:
  | "Queued"
  | "Sent"
  | "Sending"
  | "Delivered"
  | "Failed"
  | "Cancelled";
  contactNumber: 1 | 2;
  contactName: string;
  createdAt: string;
  locationUrl?: string | null;
};

type SOSHistoryProps = {
  history: HistoryItem[];
};

export default function SOSHistory({ history }: SOSHistoryProps) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #d9e2dd",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        SOS HISTORY
      </h2>

      {history.length === 0 ? (
        <p style={{ color: "#6b7280" }}>
          No SOS alerts have been sent yet.
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              borderTop: "1px solid #e5e7eb",
              padding: "14px 0",
            }}
          >
            <div
  style={{
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "14px",
    background:
      item.status === "Delivered"
        ? "#DCFCE7"
        : item.status === "Sent"
        ? "#DBEAFE"
        : item.status === "Queued"
        ? "#FEF3C7"
        : "#FEE2E2",
    color:
      item.status === "Delivered"
        ? "#166534"
        : item.status === "Sent"
        ? "#1D4ED8"
        : item.status === "Queued"
        ? "#92400E"
        : "#991B1B",
  }}
>
  {item.status === "Delivered" && "🟢 "}
  {item.status === "Sent" && "🔵 "}
  {item.status === "Queued" && "🟡 "}
  {item.status === "Failed" && "🔴 "}
  {item.status === "Cancelled" && "⚫ "}
  {item.status}
</div>

            <p style={{ margin: "6px 0 0" }}>
              Contact {item.contactNumber}
            </p>

            <p style={{ margin: "4px 0 0" }}>
              {item.contactName}
            </p>

            <p style={{ margin: "4px 0 0" }}>
              {item.createdAt}
            </p>

            {item.locationUrl && (
              <a
                href={item.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Location
              </a>
            )}
          </div>
        ))
      )}
    </section>
  );
}