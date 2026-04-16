"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import PageHeader from "@/components/PageHeader";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type Order = {
  id: string;
  status: string;
  created_at: string;
  customer_name: string | null;
  email: string | null;
  shipping_phone: string | null;
  shipping_unit: string | null;
  shipping_street: string | null;
  shipping_city: string | null;
  shipping_province: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  qr_url: string | null;
  first_name: string | null;
  last_name: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency_contact_name: string | null;
  emergency_contact_surname: string | null;
  emergency_contact_phone: string | null;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "sent_to_manufacturing", label: "Sent to Rooi Veer" },
  { value: "in_production", label: "In Production" },
  { value: "shipped", label: "Shipped" },
  { value: "completed", label: "Completed" },
];

export default function OrdersPage() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          status,
          created_at,
          customer_name,
          email,
          shipping_phone,
          shipping_unit,
          shipping_street,
          shipping_city,
          shipping_province,
          shipping_postal_code,
          shipping_country,
          qr_url,
          first_name,
          last_name,
          blood_type,
          allergies,
          emergency_contact_name,
          emergency_contact_surname,
          emergency_contact_phone
        `)
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error("LOAD ORDERS ERROR:", error);
        setOrders([]);
      } else {
        setOrders((data || []) as Order[]);
      }

      setLoading(false);
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function updateStatus(orderId: string, status: string) {
    try {
      setUpdatingId(orderId);

      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update order status.");
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  }

  function handlePrint(orderId: string) {
    const printElement = document.getElementById(`print-order-${orderId}`);
    if (!printElement) return;

    const printWindow = window.open("", "_blank", "width=900,height=1200");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>RROI Order</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
              padding: 0;
              margin: 0;
              color: #111827;
              font-size: 11px;
              line-height: 1.3;
            }

            h1, h2, h3 {
              margin: 0 0 6px;
            }

            .print-header {
              margin-bottom: 10px;
            }

            .print-title {
              font-size: 22px;
              font-weight: 800;
              margin-bottom: 4px;
            }

            .print-subtle {
              font-size: 11px;
              color: #475569;
              margin-bottom: 2px;
            }

            .print-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              align-items: start;
            }

            .section {
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #d1d5db;
              border-radius: 10px;
              background: #ffffff;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .section-title {
              font-size: 13px;
              font-weight: 800;
              margin-bottom: 6px;
            }

            .row {
              margin-bottom: 3px;
            }

            .label {
              font-weight: 700;
            }

            .qr-wrap {
              margin-top: 8px;
            }

            .qr-wrap svg {
              display: block;
            }
          </style>
        </head>
        <body>
          ${printElement.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerWrap}>
        <PageHeader />
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>Orders</h1>

        {loading ? <div>Loading orders...</div> : null}
        {!loading && orders.length === 0 ? <div>No orders yet</div> : null}

        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div style={styles.topRow}>
              <div>
                <div style={styles.statusRow}>
                  <span style={styles.statusLabel}>Status:</span>
                  <span>{formatStatus(order.status)}</span>
                </div>
                <div style={styles.orderDate}>
                  Order Date: {formatDate(order.created_at)}
                </div>
              </div>

              <div style={styles.topActions}>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  style={styles.select}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handlePrint(order.id)}
                  style={styles.printButton}
                >
                  Print Order to PDF
                </button>
              </div>
            </div>

            <div id={`print-order-${order.id}`}>
              <div className="print-header" style={styles.printHeader}>
                <h2 className="print-title" style={styles.printTitle}>
                  RROI Premium Order
                </h2>
                <div className="print-subtle" style={styles.printSubtle}>
                  Order Date: {formatDate(order.created_at)}
                </div>
                <div className="print-subtle" style={styles.printSubtle}>
                  Status: {formatStatus(order.status)}
                </div>
              </div>

              <div className="print-grid" style={styles.printGrid}>
                <div className="section" style={styles.section}>
                  <h3 className="section-title" style={styles.sectionTitle}>
                    Customer Details
                  </h3>
                  <div className="row" style={styles.row}>
                    <strong>Customer:</strong> {order.customer_name || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    <strong>Email:</strong> {order.email || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    <strong>Phone:</strong> {order.shipping_phone || "-"}
                  </div>
                </div>

                <div className="section" style={styles.section}>
                  <h3 className="section-title" style={styles.sectionTitle}>
                    Delivery Address
                  </h3>
                  <div className="row" style={styles.row}>
                    {order.shipping_unit || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.shipping_street || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.shipping_city || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.shipping_province || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.shipping_postal_code || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.shipping_country || "-"}
                  </div>
                </div>

                <div className="section" style={styles.section}>
                  <h3 className="section-title" style={styles.sectionTitle}>
                    QR &amp; Medical Details
                  </h3>
                  <div className="row" style={styles.row}>
                    <strong>QR Link:</strong> {order.qr_url || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    <strong>Blood Type:</strong> {order.blood_type || "-"}
                  </div>
                  <div className="row" style={styles.row}>
                    <strong>Allergies:</strong> {order.allergies || "-"}
                  </div>

                  {order.qr_url ? (
                    <div className="qr-wrap" style={styles.qrWrap}>
                      <QRCodeSVG value={order.qr_url} size={170} />
                    </div>
                  ) : null}
                </div>

                <div className="section" style={styles.section}>
                  <h3 className="section-title" style={styles.sectionTitle}>
                    Emergency Contact
                  </h3>
                  <div className="row" style={styles.row}>
                    {order.emergency_contact_name || "-"}{" "}
                    {order.emergency_contact_surname || ""}
                  </div>
                  <div className="row" style={styles.row}>
                    {order.emergency_contact_phone || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function formatStatus(status: string) {
  switch (status) {
    case "sent_to_manufacturing":
      return "Sent to Rooi Veer";
    case "in_production":
      return "In Production";
    case "shipped":
      return "Shipped";
    case "completed":
      return "Completed";
    default:
      return "Pending";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f6f7f8",
  },
  headerWrap: {
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "32px 16px 48px",
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    margin: "0 0 24px",
    color: "#0f172a",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  topActions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  statusRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 6,
    fontSize: 18,
  },
  statusLabel: {
    fontWeight: 800,
  },
  orderDate: {
    color: "#475569",
    fontSize: 14,
    fontWeight: 600,
  },
  select: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    background: "#ffffff",
  },
  printButton: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#111827",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  printHeader: {
    marginBottom: 10,
  },
  printTitle: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 4px",
    color: "#0f172a",
  },
  printSubtle: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 2,
  },
  printGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    alignItems: "start",
  },
  section: {
    marginBottom: 0,
    padding: 14,
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    background: "#ffffff",
    lineHeight: 1.55,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 17,
    fontWeight: 800,
    color: "#0f172a",
  },
  row: {
    marginBottom: 3,
    fontSize: 15,
  },
  qrWrap: {
    marginTop: 10,
  },
};