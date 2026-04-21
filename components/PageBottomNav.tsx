"use client";

import { useRouter } from "next/navigation";

export default function PageBottomNav() {
  const router = useRouter();

  return (
    <div style={styles.wrap}>
      <button
        onClick={() => router.back()}
        style={styles.secondaryBtn}
      >
        ← Back
      </button>

      <button
        onClick={() => router.push("/")}
        style={styles.primaryBtn}
      >
        Home
      </button>
    </div>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "12px 18px",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
    minWidth: 140,
  },
  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: 12,
    background: "#F1F5F9",
    color: "#0F172A",
    border: "1px solid #E5E7EB",
    fontWeight: 800,
    cursor: "pointer",
    minWidth: 140,
  },
};