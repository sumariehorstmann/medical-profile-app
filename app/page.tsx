"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function HomePage() {

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    try {
      sessionStorage.setItem("rroi_ref", ref.toUpperCase());
    } catch {}
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  });
  
  window.addEventListener("appinstalled", () => {
  setIsInstalled(true);
});
}, []);

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.container}>
          <PageHeader />

          <div style={styles.heroContent}>
            <div style={styles.badge}>South African emergency QR profile</div>

            <h1 style={styles.h1}>
              Critical medical information, accessible by QR code.
            </h1>

            <p style={styles.sub}>
              RROI allows emergency responders, healthcare personnel, and bystanders to access the information you choose to make available when your QR code is scanned.
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
              No app required. Most modern smartphones can scan QR codes using the device camera.
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
      Add your emergency contacts and any medical information you choose to provide.
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
      When scanned, your public emergency profile can be viewed in a web browser, subject to internet connectivity and device compatibility.
    </p>
  </div>
</div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Choose the profile that fits you</h2>

          <div style={styles.pricingGrid}>

  {/* FREE */}
<div style={styles.planCard}>
  <div style={styles.planLabel}>Free</div>

  <h3 style={styles.planTitle}>Basic Emergency Profile</h3>

  <p style={styles.planPrice}>R0</p>

  <p style={styles.planSub}>
  Essential emergency information
</p>

  <ul style={styles.list}>
  <li>Create and save your emergency profile</li>
  <li>First name and surname visible when scanned</li>
  <li>1 emergency contact visible when scanned</li>
  <li>QR phone wallpaper included</li>
  <li>QR smartwatch wallpaper included</li>
  <li>Access your profile online anytime</li>
</ul>

  <Link href="/login?mode=signup" style={styles.primaryBtnFull}>
    Create Free Profile
  </Link>
</div>

{/* R129 */}
<div style={styles.planCardFeatured}>
  <div style={styles.planLabelFeatured}>
  ⭐ MOST POPULAR
</div>

  <h3 style={styles.planTitle}>Premium Emergency Profile</h3>

  <p style={styles.planPrice}>R129/year</p>

  <p style={styles.planSub}>
  More emergency information available when your QR code is scanned
</p>

  <ul style={styles.list}>
  <li>Expanded emergency information available when scanned</li>
  <li>Multiple emergency contacts</li>
  <li>Allergies visible when scanned</li>
  <li>Medical conditions visible when scanned</li>
  <li>Medications visible when scanned</li>
  <li>QR phone wallpaper included</li>
  <li>QR smartwatch wallpaper included</li>
  <li>Update your profile anytime</li>
</ul>

  <p style={styles.upgradeNote}>
  Create your free profile first, then upgrade from your dashboard.
</p>

  <Link href="/login?mode=signup" style={styles.primaryBtnFull}>
  Create Free Profile
</Link>
</div>

{/* R499 */}
<div style={styles.planCard}>
  <div style={styles.planLabelFeatured}>
    Premium Kit
  </div>

  <h3 style={styles.planTitle}>Premium Emergency Kit</h3>

  <p style={styles.planPrice}>R499 once-off</p>

  <p style={styles.planSub}>
    Includes first year Premium subscription
  </p>

  <p style={styles.planRenewal}>
    R129 per year thereafter
  </p>

  <ul style={styles.list}>
  <li>Everything in Premium Emergency Profile</li>
  <li>Engraved QR emergency card included</li>
  <li>Engraved QR emergency tag included</li>
  <li>First year Premium subscription included</li>
  <li>Nationwide delivery included</li>
  <li>QR phone wallpaper included</li>
  <li>QR smartwatch wallpaper included</li>
  <li>Update your profile anytime</li>
</ul>

  <p style={styles.upgradeNote}>
  Create your free profile first, then order your Premium Kit from your dashboard.
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
          <h2 style={styles.sectionTitle}>
  Designed for everyday emergency readiness
</h2>

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
  Start with a free profile today and upgrade to Premium anytime for expanded public profile visibility. You choose what information is made available when your QR code is scanned.
</p>

            <Link href="/login?mode=signup" style={styles.primaryBtn}>
              Create Free Profile
</Link>

</div>

</div>

{!isInstalled && (
<div style={styles.installWrap}>
  <p style={styles.installText}>
    Install RROI for fast access to your emergency profile on any compatible device.
  </p>
  <button
    type="button"
    onClick={async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("RROI app installed");
    }

    setDeferredPrompt(null);
  } else {
    alert(
      "Install RROI App\n\nAndroid: Tap the menu button in your browser, then select Add to Home screen or Install app.\n\niPhone: Open this website in Safari, tap Share, then select Add to Home Screen.\n\nLaptop/Desktop: Use the install icon in your browser address bar if available."
    );
  }
}}
    style={styles.installBtn}
  >
    Install RROI App
  </button>
</div>
)}

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
  padding: "0",
  borderRadius: 0,
  border: "none",
  background: "transparent",
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
  padding: "36px 0",
  background: "#FFFFFF",
},
  sectionMuted: {
    padding: "46px 0",
    background: SOFT,
  },
  sectionTitle: {
  margin: "0 auto 20px",
  maxWidth: 720,
  textAlign: "center",
  fontSize: "clamp(24px, 3.5vw, 34px)",
  lineHeight: 1.15,
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 34,
  flexWrap: "wrap",
  maxWidth: 980,
  margin: "0 auto",
},
  useCard: {
  background: "transparent",
  padding: 0,
  fontSize: 16,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "#0F172A",
  textAlign: "center",
  maxWidth: 210,
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
  marginTop: 12,
  marginBottom: -20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},
installText: {
  margin: "0 0 12px",
  textAlign: "center",
  fontSize: 15,
  fontWeight: 700,
  color: "#475569",
},
installBtn: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 58,
  padding: "16px 28px",
  borderRadius: 15,
  border: "none",
  background: BRAND_GREEN,
  color: "#FFFFFF",
  fontWeight: 900,
  fontSize: 18,
  cursor: "pointer",
  marginTop: 18,
  boxShadow: "0 12px 24px rgba(21,122,85,0.25)",
},
};