"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function HomePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

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

          <h1 style={styles.h1}>
            Your emergency profile, instantly accessible with a QR code when it
            matters most
          </h1>

          <p style={styles.sub}>
            Create your emergency profile for free in minutes. In an emergency,
            your QR code can give access to critical information instantly when
            you are unable to communicate it yourself.
          </p>

          <Link href="/login" style={styles.primaryBtn}>
            Sign up free
          </Link>

          <div style={styles.ctaNote}>
            No payment required • Upgrade only if you want full public profile
            visibility
          </div>

          <div style={styles.already}>
            <span style={styles.alreadyText}>Already have an account?</span>{" "}
            <Link href="/login" style={styles.alreadyLink}>
              Log in
            </Link>
          </div>

          <div style={styles.reassure}>
            Secure • POPIA-aligned • You control what is publicly visible
          </div>

          <div style={styles.helperLine}>
            Create your full profile for free • Only essential info is visible
            publicly • Upgrade anytime to unlock full emergency access
          </div>
        </div>
      </section>

      <section style={styles.blocks}>
        <div style={styles.card}>
          <h2 style={styles.h2}>What is RROI?</h2>
          <p style={styles.p}>
            RROI is an online emergency information profile designed to make
            critical personal details accessible when you are unable to
            communicate them yourself. Information is accessed by scanning your
            unique QR code, which links to your public emergency profile.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>How it works</h2>

          <div style={styles.stepFirst}>
            <div style={styles.stepNum}>1</div>
            <div>
              <div style={styles.stepTitle}>Sign up for free</div>
              <div style={styles.stepText}>
                Create your account and complete your full emergency profile at
                no cost.
              </div>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNum}>2</div>
            <div>
              <div style={styles.stepTitle}>Complete and save your full profile</div>
              <div style={styles.stepText}>
                On the free plan, you can complete and save your full profile at
                any time.
              </div>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNum}>3</div>
            <div>
              <div style={styles.stepTitle}>
                Free public QR view shows Section 1 only
              </div>
              <div style={styles.stepText}>
                When your QR code is scanned on the free plan, only your Section
                1 public emergency details are visible.
              </div>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNum}>4</div>
            <div>
              <div style={styles.stepTitle}>
                Upgrade when you want full visibility
              </div>
              <div style={styles.stepText}>
                Upgrade to Premium when you want your full medical profile to be
                visible when your QR code is scanned.
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>What you receive</h2>
          <ul style={styles.ul}>
            <li>A personal QR code linked to your emergency profile</li>
            <li>A downloadable QR code lock screen for your phone</li>
            <li>A secure online profile you can update at any time</li>
            <li>
              Two physical QR code products with free nationwide delivery on
              Premium
            </li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Free vs Premium</h2>

          <div style={styles.compareBlockFirst}>
            <div style={styles.compareTitle}>Free</div>
            <ul style={styles.ul}>
              <li>Create an account for free</li>
              <li>Complete and save your full profile</li>
              <li>Only Section 1 is visible when your QR code is scanned</li>
              <li>Downloadable QR code lock screen for your phone</li>
              <li>Upgrade later at any time</li>
            </ul>
          </div>

          <div style={styles.compareBlock}>
            <div style={styles.compareTitle}>Premium</div>
            <div style={styles.price}>R399 once-off</div>
            <div style={styles.priceSub}>
              Includes your first year subscription
            </div>
            <div style={styles.priceSubStrong}>R99 per year thereafter</div>

            <ul style={styles.ul}>
              <li>Full medical profile visible when your QR code is scanned</li>
              <li>Downloadable QR code lock screen for your phone</li>
              <li>Includes 2 physical QR code products</li>
              <li>Free nationwide delivery included</li>
              <li>Secure online emergency profile</li>
            </ul>
          </div>

          <Link href="/login" style={styles.primaryBtn}>
            Sign up free
          </Link>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Affiliates</h2>
          <p style={styles.p}>
            Earn commission by sharing RROI. Get 8% on every successful Premium
            signup using your referral code.
          </p>
          <Link href="/affiliate/terms" style={styles.secondaryBtn}>
            Apply to become an affiliate
          </Link>
        </div>

        <div style={styles.notice}>
          <strong>Important notice</strong>
          <p style={styles.noticeP}>
            RROI does not provide medical advice, diagnosis, or emergency
            services. RROI is not a replacement for professional medical care or
            emergency response services. In an emergency, always contact local
            emergency services.
          </p>
          <p style={styles.noticeP}>
            RROI is an information-sharing tool only and does not guarantee
            emergency response or medical outcomes.
          </p>
          <p style={styles.noticeP}>
            Information is provided by the user and may not always be complete
            or up to date.
          </p>
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
    marginBottom: 14,
    fontSize: 28,
    lineHeight: 1.15,
    fontWeight: 900,
  },
  sub: {
    margin: "0 0 14px",
    fontSize: 18,
    lineHeight: 1.5,
    color: "#334155",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 340,
    padding: "14px 18px",
    borderRadius: 14,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
    margin: "10px auto 0",
    boxShadow: "0 6px 16px rgba(21, 122, 85, 0.16)",
  },
  ctaNote: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.5,
    color: MUTED,
    fontWeight: 600,
  },
  already: {
    marginTop: 12,
    fontSize: 15,
  },
  alreadyText: {
    color: MUTED,
  },
  alreadyLink: {
    color: BRAND_GREEN,
    fontWeight: 800,
    textDecoration: "none",
  },
  reassure: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: 700,
    color: MUTED,
    lineHeight: 1.5,
  },
  helperLine: {
    marginTop: 10,
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.5,
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
  p: {
    margin: 0,
    lineHeight: 1.6,
    color: "#334155",
  },
  stepFirst: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    padding: "4px 0 12px",
  },
  step: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    padding: "12px 0",
    borderTop: "1px solid #EEF2F7",
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 999,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    flex: "0 0 auto",
    marginTop: 2,
  },
  stepTitle: {
    fontWeight: 900,
    marginBottom: 3,
    fontSize: 16,
  },
  stepText: {
    color: "#334155",
    lineHeight: 1.5,
  },
  compareBlockFirst: {
    paddingTop: 4,
    marginTop: 4,
  },
  compareBlock: {
    borderTop: "1px solid #EEF2F7",
    paddingTop: 14,
    marginTop: 14,
  },
  compareTitle: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 6,
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
    margin: "0 0 14px",
    paddingLeft: 18,
    lineHeight: 1.75,
    color: "#334155",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 16px",
    borderRadius: 14,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 900,
    marginTop: 12,
    background: "#FFFFFF",
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
};