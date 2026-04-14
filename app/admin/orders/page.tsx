import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function OrdersPage() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading orders</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
        Orders
      </h1>

      {orders?.length === 0 && <div>No orders yet</div>}

      {orders?.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            background: "#fff",
          }}
        >
          <div><b>Status:</b> {order.status}</div>
          <div><b>Order Date:</b> {new Date(order.created_at).toLocaleString()}</div>

          <hr style={{ margin: "10px 0" }} />

          <div><b>Customer:</b> {order.customer_name}</div>
          <div><b>Email:</b> {order.email}</div>
          <div><b>Phone:</b> {order.shipping_phone}</div>

          <hr style={{ margin: "10px 0" }} />

          <div><b>Address:</b></div>
          <div>{order.shipping_unit}</div>
          <div>{order.shipping_street}</div>
          <div>{order.shipping_city}</div>
          <div>{order.shipping_province}</div>
          <div>{order.shipping_postal_code}</div>

          <hr style={{ margin: "10px 0" }} />

          <div><b>QR Link:</b> <a href={order.qr_url} target="_blank">{order.qr_url}</a></div>
          <div><b>Blood Type:</b> {order.blood_type}</div>
          <div><b>Allergies:</b> {order.allergies}</div>

          <hr style={{ margin: "10px 0" }} />

          <div><b>Emergency Contact:</b></div>
          <div>
            {order.emergency_contact_name} {order.emergency_contact_surname}
          </div>
          <div>{order.emergency_contact_phone}</div>
        </div>
      ))}
    </div>
  );
}