type HistoryItem = {
  id: string;
  status: "Queued" | "Sending" | "Delivered" | "Failed" | "Cancelled";
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
            <p
              style={{
                margin: 0,
                fontWeight: 700,
              }}
            >
              {item.status}
            </p>

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