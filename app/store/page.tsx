"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

const DOG_TAG_PRICE = 99;
const QR_CARD_PRICE = 99;
const DELIVERY_FEE = 99;

export default function StorePage() {
  const [dogTags, setDogTags] = useState(0);
  const [cards, setCards] = useState(0);

  const subtotal = useMemo(
    () => dogTags * DOG_TAG_PRICE + cards * QR_CARD_PRICE,
    [dogTags, cards]
  );

  const hasItems = subtotal > 0;
  const total = hasItems ? subtotal + DELIVERY_FEE : 0;

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Online Store</h1>
            <p style={styles.subtitle}>
              Order additional engraved QR code items linked to your existing
              RROI public profile.
            </p>
          </div>

          <div style={styles.notice}>
            Your QR code always opens your RROI public profile. Free profiles
            show free-tier public details. Premium profiles show full Premium
            public visibility.
          </div>

          <div style={styles.productGrid}>
            <ProductCard
              title="Black Anodised Aluminium Dog Tag"
              price={DOG_TAG_PRICE}
              description="Engraved with your permanent RROI QR code."
              quantity={dogTags}
              onDecrease={() => setDogTags((value) => Math.max(0, value - 1))}
              onIncrease={() => setDogTags((value) => value + 1)}
            />

            <ProductCard
              title="Anodised Aluminium QR Card"
              price={QR_CARD_PRICE}
              description="Wallet-style QR card engraved with your RROI QR code."
              quantity={cards}
              onDecrease={() => setCards((value) => Math.max(0, value - 1))}
              onIncrease={() => setCards((value) => value + 1)}
            />
          </div>

          <div style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Order summary</h2>

            <div style={styles.summaryLine}>
              <span>Items subtotal</span>
              <strong>R{subtotal}</strong>
            </div>

            <div style={styles.summaryLine}>
              <span>Delivery</span>
              <strong>{hasItems ? `R${DELIVERY_FEE}` : "R0"}</strong>
            </div>

            <div style={styles.totalLine}>
              <span>Total</span>
              <strong>R{total}</strong>
            </div>

            <button
              type="button"
              disabled={!hasItems}
              style={{
                ...styles.checkoutBtn,
                ...(!hasItems ? styles.checkoutBtnDisabled : {}),
              }}
            >
              Continue to Checkout
            </button>

            {!hasItems ? (
              <p style={styles.helperText}>
                Add at least one item to continue.
              </p>
            ) : null}
          </div>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  title,
  price,
  description,
  quantity,
  onDecrease,
  onIncrease,
}: {
  title: string;
  price: number;
  description: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div style={styles.productCard}>
      <div style={styles.imagePlaceholder}>Product image coming soon</div>

      <h2 style={styles.productTitle}>{title}</h2>
      <div style={styles.price}>R{price}</div>
      <p style={styles.productText}>{description}</p>

      <div style={styles.qtyRow}>
        <button type="button" onClick={onDecrease} style={styles.qtyBtn}>
          -
        </button>

        <span style={styles.qtyValue}>{quantity}</span>

        <button type="button" onClick={onIncrease} style={styles.qtyBtn}>
          +
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: PAGE_BG,
    minHeight: "100%",
    padding: "40px 16px 56px",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  topBlock: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 900,
    color: TEXT,
  },
  subtitle: {
    margin: "12px auto 0",
    fontSize: 16,
    lineHeight: 1.6,
    color: MUTED,
    maxWidth: 680,
  },
  notice: {
    border: "1px solid #A7F3D0",
    borderRadius: 16,
    padding: 16,
    background: "#ECFDF5",
    color: "#065F46",
    fontWeight: 700,
    lineHeight: 1.6,
    marginBottom: 22,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
    marginBottom: 22,
  },
  productCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#FFFFFF",
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 14,
    background: "#F3F4F6",
    border: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 16,
  },
  productTitle: {
    margin: "0 0 8px",
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 900,
    color: TEXT,
  },
  price: {
    fontSize: 28,
    fontWeight: 900,
    color: BRAND_GREEN,
    marginBottom: 10,
  },
  productText: {
    margin: "0 0 16px",
    fontSize: 14,
    lineHeight: 1.6,
    color: MUTED,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    fontSize: 22,
    fontWeight: 900,
    cursor: "pointer",
  },
  qtyValue: {
    minWidth: 30,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 900,
    color: TEXT,
  },
  summaryCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 20,
    background: "#F8FAFC",
    marginBottom: 24,
  },
  summaryTitle: {
    margin: "0 0 16px",
    fontSize: 22,
    fontWeight: 900,
    color: TEXT,
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    padding: "8px 0",
    fontSize: 15,
    color: MUTED,
  },
  totalLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 14,
    marginTop: 8,
    borderTop: `1px solid ${BORDER}`,
    fontSize: 20,
    fontWeight: 900,
    color: TEXT,
  },
  checkoutBtn: {
    width: "100%",
    marginTop: 18,
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    background: BRAND_GREEN,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
  },
  checkoutBtnDisabled: {
    background: "#94A3B8",
    cursor: "not-allowed",
  },
  helperText: {
    margin: "10px 0 0",
    textAlign: "center",
    fontSize: 13,
    color: MUTED,
  },
};