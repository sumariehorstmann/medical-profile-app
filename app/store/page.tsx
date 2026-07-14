"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

const DOG_TAG_PRICE = 150;
const QR_CARD_PRICE = 150;
const STICKER_PACK_PRICE = 150;
const DELIVERY_FEE = 120;

export default function StorePage() {
  const [dogTags, setDogTags] = useState(0);
  const [cards, setCards] = useState(0);
  const [stickerPacks, setStickerPacks] = useState(0);

  const subtotal = useMemo(
  () =>
    dogTags * DOG_TAG_PRICE +
    cards * QR_CARD_PRICE +
    stickerPacks * STICKER_PACK_PRICE,
  [dogTags, cards, stickerPacks]
);

  const hasItems = subtotal > 0;
  const total = hasItems ? subtotal + DELIVERY_FEE : 0;

  function handleCheckout() {
    if (!hasItems) return;

    const params = new URLSearchParams({
  dogTags: String(dogTags),
  cards: String(cards),
  stickerPacks: String(stickerPacks),
});

    window.location.href = `/store/checkout?${params.toString()}`;
  }

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Online Store</h1>

            <p style={styles.subtitle}>
              Order additional QR products linked to your existing RROI public profile.
            </p>
          </div>

          <div style={styles.notice}>
  <div style={styles.noticeTitle}>
    How your QR products work
  </div>

  <div style={styles.noticeText}>
  Your RROI QR products link to your permanent RROI public profile.
  Free profiles show basic emergency details. Premium profiles show
  additional emergency and medical information.
</div>
</div>

          <div style={styles.shippingNotice}>
            Every RROI product is custom made to order and delivered to your door within 7–14 working days.
          </div>

          <div style={styles.productGrid}>
            <ProductCard
              title="Engraved Metal QR Tag"
              price={DOG_TAG_PRICE}
              description="Made from black anodised aluminium and engraved with your permanent RROI QR code."
              images={[
                {
                  src: "/images/premium-kit/qr-tag-front.png",
                  alt: "Black Anodised Aluminium QR Tag Front",
                },
                {
                  src: "/images/premium-kit/qr-tag-back.png",
                  alt: "Black Anodised Aluminium QR Tag Back",
                },
              ]}
              quantity={dogTags}
              onDecrease={() => setDogTags((value) => Math.max(0, value - 1))}
              onIncrease={() => setDogTags((value) => value + 1)}
            />
<ProductCard
  title="Engraved Metal QR Card"
  price={QR_CARD_PRICE}
  description="Wallet-sized engraved metal QR card made from black anodised aluminium and linked to your permanent RROI QR code."
  images={[
    {
      src: "/images/premium-kit/qr-card.png",
      alt: "Black Anodised Aluminium QR Card",
    },
  ]}
  quantity={cards}
  onDecrease={() => setCards((value) => Math.max(0, value - 1))}
  onIncrease={() => setCards((value) => value + 1)}
/>
<ProductCard
  title="Pack of 5 Splash-Proof QR Stickers"
  price={STICKER_PACK_PRICE}
  description="Pack of 5 splash-proof stickers printed with your permanent RROI QR code."
  images={[
    {
      src: "/images/premium-kit/qr-sticker-pack.png",
      alt: "Pack of 5 Splash-Proof QR Stickers",
    },
  ]}
  quantity={stickerPacks}
  onDecrease={() => setStickerPacks((value) => Math.max(0, value - 1))}
  onIncrease={() => setStickerPacks((value) => value + 1)}
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
              onClick={handleCheckout}
              style={{
                ...styles.checkoutBtn,
                ...(!hasItems ? styles.checkoutBtnDisabled : {}),
              }}
            >
              Continue to Checkout
            </button>

            {!hasItems ? (
              <p style={styles.helperText}>Add at least one item to continue.</p>
            ) : null}
          </div>

<div style={styles.storeTrustBox}>
  <div>✓ Secure PayFast payments</div>
  <div>✓ Custom-made QR products</div>
  <div>✓ Nationwide South African delivery</div>
  <div>✓ Linked to your permanent RROI QR profile</div>
</div>
<div style={styles.storeDisclaimer}>
  <p>
    Product images are for illustrative purposes only. As each product is
    custom made to order, slight variations in engraving position, print
    position, finish, shape and colour tone may occur.
  </p>

  <p>
    Actual product appearance may vary slightly from the images shown due
    to lighting, screen settings and manufacturing processes.
  </p>
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
  images,
  quantity,
  onDecrease,
  onIncrease,
}: {
  title: string;
  price: number;
  description: string;
  images: { src: string; alt: string }[];
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div style={styles.productCard}>
      <div
        style={{
          ...styles.productImageGrid,
          gridTemplateColumns: images.length > 1 ? "1fr 1fr" : "1fr",
        }}
      >
        {images.map((image, index) => (
  <div key={image.src}>
    <div style={styles.productImageWrap}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        style={styles.productImage}
      />
    </div>

    {images.length > 1 ? (
      <div style={styles.imageLabel}>
        {index === 0 ? "Front" : "Back"}
      </div>
    ) : null}
  </div>
))}
      </div>

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
    fontSize: 42,
    lineHeight: 1.05,
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
    marginBottom: 26,
    padding: "22px 20px",
    borderRadius: 18,
    border: "1px solid #A7F3D0",
    background: "#ECFDF5",
  },

  noticeTitle: {
  marginBottom: 8,
  fontSize: 15,
  fontWeight: 900,
  color: "#065F46",
},

noticeText: {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.7,
  color: "#065F46",
  fontWeight: 700,
},

  shippingNotice: {
    marginBottom: 26,
    padding: "14px 16px",
    borderRadius: 14,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.5,
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

  productImageGrid: {
    display: "grid",
    gap: 10,
    marginBottom: 16,
  },

  productImageWrap: {
  position: "relative",
  height: 180,
  borderRadius: 14,
  background: "#FFFFFF",
  overflow: "hidden",
},

  productImage: {
  objectFit: "contain",
  pointerEvents: "none",
  userSelect: "none",
},

imageLabel: {
  marginTop: 6,
  textAlign: "center",
  fontSize: 12,
  fontWeight: 700,
  color: "#64748B",
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
  storeTrustBox: {
  marginTop: 24,
  marginBottom: 24,
  padding: 16,
  borderRadius: 14,
  background: "#F0FDF4",
  border: "1px solid #BBF7D0",
  color: "#166534",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.8,
},
storeDisclaimer: {
  marginTop: 12,
  textAlign: "center",
  fontSize: 12,
  lineHeight: 1.7,
  color: "#64748B",
  padding: "0 12px",
},
};
