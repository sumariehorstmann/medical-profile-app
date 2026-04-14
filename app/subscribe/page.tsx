"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function SubscribePage() {
  
useEffect(() => {
  const ref = new URLSearchParams(window.location.search).get("ref");

  if (ref) {
    try {
      sessionStorage.setItem("rroi_ref", ref.toUpperCase());
    } catch {}
  }
}, []);
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.brand}>
          <PageHeader />

          <h1 style={styles.h1}>RROI Premium Upgrade</h1>

          <p style={styles.sub}>
            Upgrade to Premium to unlock full public profile visibility when
            your QR code is scanned.
          </p>
        </div>
      </section>

      <section style={styles.blocks}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Free tier</h2>
          <ul style={styles.ul}>
            <li>Create your account for free</li>
            <li>Complete and save your full profile</li>
            <li>QR public view shows Section 1 only</li>
            <li>Upgrade later at any time</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Premium tier</h2>

          <div style={styles.price}>R399 first year</div>
          <div style={styles.priceSub}>Includes your Premium setup</div>
          <div style={styles.priceSubStrong}>
            Annual renewal thereafter of R99
          </div>

          <ul style={styles.ul}>
            <li>Full medical profile visible when QR is scanned</li>
            <li>Two physical QR items included</li>
            <li>Free nationwide delivery</li>
            <li>Secure online emergency profile</li>
          </ul>
        </div>

        <div style={styles.notice}>
          <strong>Important notice</strong>
          <p style={styles.noticeP}>
            RROI does not provide medical advice, diagnosis, or emergency
            services.
          </p>
          <p style={styles.noticeP}>
            RROI is not a replacement for professional medical care or emergency
            response services. In an emergency, always contact local emergency
            services.
          </p>
        </div>

        <div style={styles.actions}>
          <Link href="/subscribe/pay" style={styles.primaryBtn}>
            Upgrade to Premium
          </Link>

          <Link href="/profile" style={styles.secondaryBtn}>
            Back to profile
          </Link>

          <Link href="/" style={styles.backHome}>
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const BORDER = "#E5E7EB";
const MUTED = "#475569";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    color: TEXT,
  },
  hero: {
    padding: "34px 16px 18px",
    display: "flex",
    justifyContent: "center",
  },
  brand: {
    width: "100%",
    maxWidth: 620,
    textAlign: "center",
  },
  h1: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 28,
    lineHeight: 1.15,
    fontWeight: 900,
  },
  sub: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#334155",
  },
  blocks: {
    padding: "10px 16px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 620,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: 18,
    background: "#FFFFFF",
  },
  h2: {
    margin: "0 0 10px",
    fontSize: 18,
    fontWeight: 900,
  },
  price: {
    fontSize: 28,
    fontWeight: 900,
    margin: "6px 0 4px",
  },
  priceSub: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 4,
  },
  priceSubStrong: {
    fontSize: 15,
    fontWeight: 800,
    color: TEXT,
    marginBottom: 12,
  },
  ul: {
    margin: 0,
    paddingLeft: 18,
    lineHeight: 1.75,
    color: "#334155",
  },
  notice: {
    width: "100%",
    maxWidth: 620,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: 18,
    background: "#F8FAFC",
  },
  noticeP: {
    margin: "8px 0 0",
    lineHeight: 1.6,
    color: "#334155",
    fontSize: 14,
  },
  actions: {
    width: "100%",
    maxWidth: 620,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px 18px",
    borderRadius: 14,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
    boxShadow: "0 6px 16px rgba(21, 122, 85, 0.16)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px 18px",
    borderRadius: 14,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    background: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
  },
  backHome: {
    textAlign: "center",
    color: MUTED,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
  },
};