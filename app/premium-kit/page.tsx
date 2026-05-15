"use client";

import Image from "next/image";
import Link from "next/link";

export default function PremiumKitPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>RROI Premium</div>

        <h1 style={styles.h1}>Premium Kit</h1>

        <p style={styles.subtitle}>
          Everything included when upgrading to RROI Premium.
        </p>

        {/* Product Photos */}
        <div style={styles.productGrid}>
          <ProductPhoto
            src="/images/premium-kit/qr-card.png"
            alt="Black Anodised Aluminium QR Card"
            title="Black Anodised Aluminium QR Card"
          />

          <ProductPhoto
            src="/images/premium-kit/qr-tag-front.png"
            alt="Black Anodised Aluminium QR Tag Front"
            title="Black Anodised Aluminium QR Tag Front"
          />

          <ProductPhoto
            src="/images/premium-kit/qr-tag-back.png"
            alt="Black Anodised Aluminium QR Tag Back"
            title="Black Anodised Aluminium QR Tag Back"
          />
        </div>

        {/* Included */}
        <div style={styles.card}>
          <h2 style={styles.h2}>What is included</h2>

          <ul style={styles.list}>
            <li>1-year RROI Premium subscription</li>
            <li>2 physical QR code items</li>
            <li>Full emergency profile visibility</li>
            <li>Free nationwide delivery</li>
          </ul>
        </div>

        {/* Example Profile */}
        <div style={styles.exampleCard}>
          <h2 style={styles.h2}>Example Premium public profile</h2>

          <p style={styles.exampleText}>
            View an example of how a Premium emergency profile appears when a
            QR code is scanned.
          </p>

          <Link
            href="/e/891729a6-9f88-49b8-b14d-9d702bde2c6b"
            target="_blank"
            style={styles.secondaryButton}
          >
            View Example Profile
          </Link>
        </div>

        {/* Signup Flow Info */}
        <div style={styles.flowCard}>
          <h2 style={styles.h2}>How to get Premium</h2>

          <p style={styles.flowText}>First create your free RROI profile.</p>

          <p style={styles.flowText}>
            After signing up and completing your profile, you can upgrade to
            Premium directly from your profile dashboard.
          </p>
        </div>

        <div style={styles.bottomActions}>
          <button onClick={() => window.history.back()} style={styles.backButton}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductPhoto({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <div style={styles.productCard}>
      <div style={styles.imageWrap}>
        <Image src={src} alt={alt} fill style={styles.productImage} />
      </div>

      <div style={styles.productTitle}>{title}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "48px 20px",
    background: "#FFFFFF",
    minHeight: "100vh",
  },

  container: {
    maxWidth: 760,
    margin: "0 auto",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#ECFDF5",
    color: "#065F46",
    border: "1px solid #A7F3D0",
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 16,
  },

  h1: {
    fontSize: 42,
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: 14,
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: 30,
    maxWidth: 620,
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 18,
    marginBottom: 28,
  },

  productCard: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 14,
    overflow: "hidden",
  },

  imageWrap: {
  position: "relative",
  width: "100%",
  height: 220,
  background: "#FFFFFF",
  borderRadius: 14,
  overflow: "hidden",
  marginBottom: 12,
},

  productImage: {
  objectFit: "contain",
},

  productTitle: {
    fontSize: 14,
    fontWeight: 800,
    lineHeight: 1.35,
    color: "#0F172A",
    textAlign: "center",
  },

  card: {
    background: "#F8FAFC",
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 24,
    marginBottom: 22,
  },

  exampleCard: {
    background: "#FFFFFF",
    border: "1px solid #D1D5DB",
    borderRadius: 18,
    padding: 24,
    marginBottom: 22,
  },

  flowCard: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
  },

  h2: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 14,
    color: "#0F172A",
  },

  list: {
    paddingLeft: 22,
    lineHeight: 1.9,
    color: "#1F2937",
    fontSize: 16,
  },

  exampleText: {
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: 18,
    fontSize: 15,
  },

  flowText: {
    color: "#475569",
    lineHeight: 1.7,
    fontSize: 15,
    marginBottom: 12,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    background: "#157A55",
    border: "1px solid #157A55",
    color: "#FFFFFF",
  },

  bottomActions: {
    marginTop: 42,
    display: "flex",
    justifyContent: "center",
  },

  backButton: {
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    borderRadius: 12,
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
  },
};