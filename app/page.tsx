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
        <div style={styles.container}>
          <PageHeader />

          <div style={styles.heroContent}>
            <div style={styles.badge}>Emergency QR medical profile</div>

            <h1 style={styles.h1}>
              Critical medical information, accessible by QR code.
            </h1>

            <p style={styles.sub}>
              RROI helps emergency responders and trusted bystanders access your
              emergency contact and medical details when you cannot communicate.
            </p>

            <div style={styles.ctaRow}>
              <Link href="/login?mode=signup" style={styles.primaryBtn}>
                Create Free Profile
              </Link>

              <Link href="/premium-kit" style={styles.secondaryBtn}>
                View Premium Kit
              </Link>
            </div>

            <p style={styles.microText}>
              No app required to scan. Works from any smartphone camera.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>How RROI works</h2>

          <div style={styles.stepsGrid}>
  <div style={styles.stepCard}>
    <div style={styles.stepNum}>1</div>

    <h3 style={styles.cardTitle}>
      Create your free profile
    </h3>

    <p style={styles.cardText}>
      Sign up and create your emergency profile for free. Upgrade to Premium anytime.
    </p>
  </div>

  <div style={styles.stepCard}>
    <div style={styles.stepNum}>2</div>

    <h3 style={styles.cardTitle}>
      Complete your profile
    </h3>

    <p style={styles.cardText}>
      Add your emergency contact and important medical information.
    </p>
  </div>

  <div style={styles.stepCard}>
    <div style={styles.stepNum}>3</div>

    <h3 style={styles.cardTitle}>
      Use your QR code
    </h3>

    <p style={styles.cardText}>
      Download your phone QR lock screen or use physical QR products included with Premium.
    </p>
  </div>

  <div style={styles.stepCard}>
    <div style={styles.stepNum}>4</div>

    <h3 style={styles.cardTitle}>
      Scan in an emergency
    </h3>

    <p style={styles.cardText}>
      When scanned, your public emergency profile opens instantly in a browser.
    </p>
  </div>
</div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Choose the profile that fits you</h2>

          <div style={styles.pricingGrid}>
            <div style={styles.planCard}>
              <div style={styles.planLabel}>Free</div>
              <h3 style={styles.planTitle}>Basic Emergency Profile</h3>
              <p style={styles.planPrice}>R0</p>

              <ul style={styles.list}>
                <li>Create and save your full profile</li>
                <li>Emergency Contact 1 visible when scanned</li>
                <li>First name and last name visible</li>
                <li>Downloadable phone QR lock screen</li>
                <li>Upgrade anytime</li>
              </ul>

              <Link href="/login?mode=signup" style={styles.primaryBtnFull}>
                Create Free Profile
              </Link>
            </div>

            <div style={styles.planCardFeatured}>
  <div style={styles.planLabelFeatured}>Premium Upgrade</div>

  <h3 style={styles.planTitle}>Full Emergency Profile</h3>

  <p style={styles.planPrice}>R399 once-off</p>

  <p style={styles.planSub}>
    Includes first year Premium subscription
  </p>

  <p style={styles.planRenewal}>
    R99 per year thereafter
  </p>

  <ul style={styles.list}>
    <li>Full medical profile visible when scanned</li>
    <li>2 physical engraved QR products included</li>
    <li>Free nationwide delivery in South Africa</li>
    <li>Downloadable phone QR lock screen</li>
    <li>Secure profile you can update anytime</li>
  </ul>

  <p style={styles.upgradeNote}>
    Create your free profile first, then upgrade to Premium from your dashboard.
  </p>

  <Link href="/login?mode=signup" style={styles.primaryBtnFull}>
    Create Free Profile
  </Link>
</div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Useful during everyday emergencies</h2>

          <div style={styles.useGrid}>
            <div style={styles.useCard}>Medical emergencies</div>
            <div style={styles.useCard}>Allergies and medication</div>
            <div style={styles.useCard}>Children and elderly family members</div>
            <div style={styles.useCard}>Travel, sport and outdoor activities</div>
          </div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
        <div style={styles.container}>
          <div style={styles.splitCard}>
            <div>
              <h2 style={styles.sectionTitleLeft}>Physical QR products</h2>
              <p style={styles.cardTextLarge}>
                Premium includes 2 physical engraved QR products. Additional QR
                items will be available through the RROI online store.
              </p>
            </div>

            <Link href="/store" style={styles.secondaryBtnLarge}>
              Online Store
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.finalCta}>
            <h2 style={styles.finalTitle}>
  Emergency information when it matters most.
</h2>

<p style={styles.finalText}>
  Be prepared for any emergency situation. Start with a free profile
  today and upgrade to Premium anytime for full public medical profile
  visibility. You choose what information you want visible when your QR
  code is scanned.
</p>

            <Link href="/login?mode=signup" style={styles.primaryBtn}>
              Create Free Profile
</Link>

</div>

</div>

<div style={styles.installWrap}>
  <button
    type="button"
    onClick={() => {
      alert(
        "To add RROI to your home screen:\n\nAndroid: Tap the 3 dots in your browser, then tap Add to Home screen.\n\niPhone: Open in Safari, tap Share, then tap Add to Home Screen.\n\nLaptop: Use the install icon in your browser address bar if available."
      );
    }}
    style={styles.installBtn}
  >
    Install RROI App
  </button>
</div>

</section>
    </main>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const SOFT = "#F8FAFC";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: TEXT,
  },
  container: {
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 18px",
  },
  hero: {
    padding: "30px 0 42px",
    background:
      "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
  },
  heroContent: {
    maxWidth: 760,
    margin: "34px auto 0",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    padding: "8px 13px",
    borderRadius: 999,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: BRAND_GREEN,
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 16,
  },
  h1: {
    margin: 0,
    fontSize: "clamp(34px, 6vw, 58px)",
    lineHeight: 1.04,
    letterSpacing: "-0.045em",
    fontWeight: 950,
    color: TEXT,
  },
  sub: {
    margin: "18px auto 0",
    maxWidth: 680,
    fontSize: 18,
    lineHeight: 1.65,
    color: "#334155",
  },
  ctaRow: {
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    padding: "15px 24px",
    borderRadius: 15,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
    boxShadow: "0 12px 24px rgba(21, 122, 85, 0.18)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    padding: "15px 24px",
    borderRadius: 15,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
  },
  microText: {
    margin: "16px 0 0",
    fontSize: 14,
    lineHeight: 1.5,
    color: MUTED,
    fontWeight: 700,
  },
  section: {
    padding: "46px 0",
    background: "#FFFFFF",
  },
  sectionMuted: {
    padding: "46px 0",
    background: SOFT,
  },
  sectionTitle: {
    margin: "0 auto 24px",
    maxWidth: 760,
    textAlign: "center",
    fontSize: "clamp(26px, 4vw, 36px)",
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
    fontWeight: 950,
    color: TEXT,
  },
  sectionTitleLeft: {
    margin: "0 0 10px",
    fontSize: "clamp(24px, 4vw, 34px)",
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
    fontWeight: 950,
    color: TEXT,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 16,
  },
  stepCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 20,
    padding: 22,
    background: "#FFFFFF",
  },
  stepNum: {
    width: 38,
    height: 38,
    borderRadius: 999,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 950,
    fontSize: 16,
    marginBottom: 16,
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: 19,
    lineHeight: 1.25,
    fontWeight: 950,
    color: TEXT,
  },
  cardText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.65,
    color: "#334155",
  },
  cardTextLarge: {
    margin: 0,
    maxWidth: 660,
    fontSize: 17,
    lineHeight: 1.65,
    color: "#334155",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
  },
  planCard: {
  border: `1px solid ${BORDER}`,
  borderRadius: 22,
  padding: 24,
  background: "#FFFFFF",

  display: "flex",
  flexDirection: "column",
},

planCardFeatured: {
  border: `2px solid ${BRAND_GREEN}`,
  borderRadius: 22,
  padding: 24,
  background: "#FFFFFF",
  boxShadow: "0 16px 34px rgba(21, 122, 85, 0.12)",

  display: "flex",
  flexDirection: "column",
},
  planLabel: {
    display: "inline-flex",
    padding: "7px 11px",
    borderRadius: 999,
    background: "#F1F5F9",
    color: TEXT,
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 14,
  },
  planLabelFeatured: {
    display: "inline-flex",
    padding: "7px 11px",
    borderRadius: 999,
    background: "#EAF7F1",
    color: BRAND_GREEN,
    fontSize: 13,
    fontWeight: 950,
    marginBottom: 14,
  },
  planTitle: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.2,
    fontWeight: 950,
    color: TEXT,
  },
  planPrice: {
    margin: "14px 0 2px",
    fontSize: 30,
    lineHeight: 1,
    fontWeight: 950,
    color: TEXT,
  },
  planSub: {
    margin: "6px 0 0",
    fontSize: 14,
    color: MUTED,
    fontWeight: 700,
  },
  planRenewal: {
    margin: "6px 0 0",
    fontSize: 14,
    color: BRAND_GREEN,
    fontWeight: 900,
  },
  upgradeNote: {
  margin: "0 0 18px",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#475569",
  fontWeight: 700,
},
  list: {
    margin: "20px 0 22px",
    paddingLeft: 22,
    fontSize: 15,
    lineHeight: 1.85,
    color: "#334155",
  },
  primaryBtnFull: {
  display: "inline-flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 54,
  padding: "15px 20px",
  borderRadius: 15,
  background: BRAND_GREEN,
  color: "#FFFFFF",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 16,

  marginTop: "auto",
},
  useGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  useCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "18px 16px",
    background: "#FFFFFF",
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 900,
    color: TEXT,
    textAlign: "center",
  },
  splitCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: 26,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 22,
    flexWrap: "wrap",
  },
  secondaryBtnLarge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    padding: "15px 22px",
    borderRadius: 15,
    border: `1px solid ${BRAND_GREEN}`,
    background: "#FFFFFF",
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 950,
    fontSize: 16,
  },
  finalCta: {
    borderRadius: 26,
    padding: "34px 22px",
    background: TEXT,
    color: "#FFFFFF",
    textAlign: "center",
  },
  finalTitle: {
    margin: 0,
    fontSize: "clamp(26px, 5vw, 42px)",
    lineHeight: 1.1,
    letterSpacing: "-0.035em",
    fontWeight: 950,
  },
  finalText: {
    margin: "14px auto 24px",
    maxWidth: 660,
    fontSize: 17,
    lineHeight: 1.6,
    color: "#CBD5E1",
  },

  dot: {
    color: "#CBD5E1",
  },
  installWrap: {
  marginTop: 18,
  display: "flex",
  justifyContent: "center",
},

installBtn: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  background: "#FFFFFF",
  color: "#0F172A",
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  marginTop: 18,
},
};