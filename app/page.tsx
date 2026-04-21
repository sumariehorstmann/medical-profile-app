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

          <div style={styles.heroTextWrap}>
            <h1 style={styles.h1}>
              Emergency information, instantly accessible via QR code
            </h1>

            <p style={styles.sub}>
              Create your emergency profile for free. In an emergency, your QR
              code provides access to critical information when you cannot
              communicate it yourself.
            </p>
          </div>

          <div style={styles.heroCtaWrap}>
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
          <h2 style={styles.h2}>About RROI</h2>
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
              <div style={styles.stepTitle}>Complete and store your full profile</div>
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
                Upgrade to enable full profile visibility
              </div>
              <div style={styles.stepText}>
                Upgrade to Premium when you want your full medical profile to be
                visible when your QR code is scanned.
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Included features</h2>
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
            <div style={styles.premiumLine}>
              Full emergency profile access when scanned
            </div>

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
            Share RROI and earn commission on Premium signups.
          </p>
          <Link href="/affiliate/terms" style={styles.secondaryBtn}>
            Apply to become an affiliate
          </Link>
        </div>
<div style={styles.card}>
  <h2 style={styles.h2}>Online Store</h2>
  <p style={styles.p}>
    Purchase additional engraved QR code physical items online. Available to
    both free and Premium users.
  </p>
  <Link href="/store" style={styles.secondaryBtn}>
    Visit online store
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
    padding: "28px 16px 22px",
    display: "flex",
    justifyContent: "center",
  },
  brand: {
    width: "100%",
    maxWidth: 700,
    textAlign: "center",
  },
  heroTextWrap: {
    maxWidth: 760,
    margin: "0 auto",
  },
  h1: {
    margin: "10px auto 0",
    maxWidth: 680,
    fontSize: 26,
    lineHeight: 1.18,
    fontWeight: 900,
    letterSpacing: "-0.02em",
    color: TEXT,
  },
  sub: {
    margin: "18px auto 0",
    maxWidth: 700,
    fontSize: 17,
    lineHeight: 1.65,
    color: "#334155",
  },
  heroCtaWrap: {
    marginTop: 26,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 380,
    minHeight: 62,
    padding: "16px 22px",
    borderRadius: 16,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 17,
    letterSpacing: "-0.01em",
    boxShadow: "0 10px 24px rgba(21, 122, 85, 0.16)",
  },
  ctaNote: {
    marginTop: 12,
    maxWidth: 560,
    fontSize: 14,
    lineHeight: 1.55,
    color: MUTED,
    fontWeight: 600,
  },
  already: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.5,
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
    marginTop: 18,
    fontSize: 14,
    fontWeight: 800,
    color: "#334155",
    lineHeight: 1.5,
  },
  helperLine: {
    marginTop: 10,
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.55,
    maxWidth: 760,
    marginLeft: "auto",
    marginRight: "auto",
  },
  blocks: {
    padding: "10px 16px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 780,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 22,
    background: "#FFFFFF",
  },
  h2: {
    margin: "0 0 12px",
    fontSize: 20,
    fontWeight: 900,
    color: TEXT,
  },
  p: {
    margin: 0,
    lineHeight: 1.7,
    color: "#334155",
    fontSize: 16,
  },
  stepFirst: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    padding: "6px 0 14px",
  },
  step: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    padding: "14px 0",
    borderTop: "1px solid #EEF2F7",
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 999,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 16,
    flex: "0 0 auto",
    marginTop: 2,
  },
  stepTitle: {
    fontWeight: 900,
    marginBottom: 4,
    fontSize: 18,
    color: TEXT,
    lineHeight: 1.35,
  },
  stepText: {
    color: "#334155",
    lineHeight: 1.6,
    fontSize: 16,
  },
  compareBlockFirst: {
    paddingTop: 4,
    marginTop: 2,
  },
  compareBlock: {
    borderTop: "1px solid #EEF2F7",
    paddingTop: 16,
    marginTop: 16,
  },
  compareTitle: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 6,
    color: TEXT,
  },
  price: {
    fontSize: 28,
    fontWeight: 900,
    margin: "6px 0 4px",
    color: TEXT,
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
    marginBottom: 10,
  },
  premiumLine: {
    fontSize: 15,
    fontWeight: 800,
    color: BRAND_GREEN,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  ul: {
    margin: "0 0 14px",
    paddingLeft: 22,
    lineHeight: 1.8,
    color: "#334155",
    fontSize: 16,
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 14,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 900,
    marginTop: 14,
    background: "#FFFFFF",
    fontSize: 16,
  },
  notice: {
    width: "100%",
    maxWidth: 780,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 22,
    background: "#F8FAFC",
  },
  noticeP: {
    margin: "10px 0 0",
    lineHeight: 1.7,
    color: "#334155",
    fontSize: 15,
  },
};