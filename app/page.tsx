"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  UserRound,
  PencilLine,
  Smartphone,
  Star,
  Ambulance,
  Pill,
  UsersRound,
  Dumbbell,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
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
            <h1 style={styles.h1}>
  Critical medical information, accessible by QR code.
</h1>

<div style={styles.badge}>
  South African Emergency QR Profile
</div>

<p style={styles.sub}>
  When your unique RROI QR code is scanned, emergency responders,
  healthcare personnel, and bystanders can access the emergency
  information you choose to share.
</p>
                        
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>HOW RROI WORKS</h2>

         <p style={styles.sectionIntro}>
  When someone scans your QR code, your RROI emergency profile opens instantly in their web browser.
</p> 

<div style={styles.stepsGrid}>
  <div style={styles.stepCard}>
    <div style={styles.stepWrap}>
  <div style={styles.stepBadge}>1</div>

  <div style={styles.stepNum}>
    <UserRound size={28} />
  </div>
</div>
    <h3 style={styles.cardTitle}>Create your free profile</h3>
    <p style={styles.cardText}>
      Sign up for a free RROI account and verify your email address to get started.
    </p>
  </div>

  <div style={styles.stepCard}>
    <div style={styles.stepWrap}>
  <div style={styles.stepBadge}>2</div>

  <div style={styles.stepNum}>
    <PencilLine size={28} />
  </div>
</div>
    <h3 style={styles.cardTitle}>Complete your profile</h3>
    <div style={styles.cardText}>
  <p style={styles.shortLine}>Add your name, surname and profile photo.</p>
  <p style={styles.shortLine}>Add one emergency contact.</p>
  <p style={styles.shortLine}>
    Visible on your free profile when your QR code is scanned.
  </p>
</div>
  </div>

  <div style={styles.stepCard}>
    <div style={styles.stepWrap}>
  <div style={styles.stepBadge}>3</div>

  <div style={styles.stepNum}>
    <Smartphone size={28} />
  </div>
</div>
    <h3 style={styles.cardTitle}>Download your QR wallpapers</h3>
    <div style={styles.cardText}>
  <p style={styles.shortLine}>Download your QR code wallpapers.</p>
  <p style={styles.shortLine}>Save them to your phone.</p>
  <p style={styles.shortLine}>
    Set them as your phone lock screen and your smartwatch wallpaper.
  </p>
</div>
  </div>

  <div style={styles.stepCard}>
  <div style={styles.stepWrap}>
  <div style={styles.stepBadge}>4</div>

  <div style={styles.stepNum}>
    <Star size={28} />
  </div>
</div>

  <h3 style={styles.cardTitle}>
    Upgrade to Premium
  </h3>

  <div style={styles.cardText}>
    <p style={styles.shortLine}>Upgrade anytime.</p>
    <p style={styles.shortLine}>
      Make your complete emergency profile visible.
    </p>
    <p style={styles.shortLine}>
      Includes your medical information when your QR code is scanned.
    </p>
  </div>
</div>
</div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>CHOOSE YOUR PROFILE</h2>

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
  <li>Create your emergency profile</li>
  <li>First name and surname visible when scanned</li>
  <li>One emergency contact visible when scanned</li>
  <li>QR phone wallpaper included</li>
  <li>QR smartwatch wallpaper included</li>
  <li>Update your profile anytime</li>
</ul>

  <Link href="/login?mode=signup" style={styles.primaryBtnFull}>
  Create Free Profile
</Link>

<Link
  href="/e/9bde720b-fd11-4206-833b-9b8978d2a339"
  style={styles.outlineBtnFull}
>
  View Example Free Public Profile
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
  More emergency information is available when your QR code is scanned
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

<Link
  href="/e/891729a6-9f88-49b8-b14d-9d702bde2c6b"
  style={styles.outlineBtnFull}
>
  View Example Premium Profile
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
    Includes first-year Premium subscription
  </p>

  <p style={styles.planRenewal}>
    R129 per year thereafter
  </p>

  <ul style={styles.list}>
  <li>Everything in Premium Emergency Profile</li>
  <li>Engraved QR emergency card included</li>
  <li>Engraved QR emergency tag included</li>
  <li>First-year Premium subscription included</li>
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
  <Link
  href="/premium-kit"
  style={styles.outlineBtnFull}
>
  View Premium Kit
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
  <div style={styles.useCard}>
    <div style={styles.useIcon}>
      <Ambulance size={30} />
    </div>
    <div style={styles.useLabel}>
  Medical emergencies
</div>
  </div>

  <div style={styles.useCard}>
  <div style={styles.useIcon}>
    <Pill size={30} />
  </div>

  <div style={styles.useLabel}>
    Allergies & medication
  </div>
</div>

  <div style={styles.useCard}>
  <div style={styles.useIcon}>
    <UsersRound size={30} />
  </div>

  <div style={styles.useLabel}>
    Children & elderly
  </div>
</div>

  <div style={styles.useCard}>
  <div style={styles.useIcon}>
    <Dumbbell
      size={30}
      style={{ transform: "translateY(2px)" }}
    />
  </div>

  <div style={styles.useLabel}>
    Travel, sport & outdoor
  </div>
</div>
</div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
        <div style={styles.container}>
          <div style={styles.splitCard}>
            <div>
              <h2 style={styles.sectionTitleLeft}>
  RROI Online Store
</h2>

<p style={styles.cardTextLarge}>
  Order additional engraved QR products, replacement items, and
  accessories from the RROI Online Store.
</p>
            </div>

            <Link href="/store" style={styles.secondaryBtnLarge}>
              Online Store
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.finalSection}>
        <div style={styles.container}>
          <div style={styles.finalCta}>
  <h2 style={styles.finalTitle}>
    Your emergency information when it matters most.
  </h2>
</div>

</div>

{!isInstalled && (
<div style={styles.installWrap}>
  <p style={styles.installText}>
    Install RROI for quick access to your emergency profile.
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
<div style={styles.socialSection}>
  <p style={styles.socialTitle}>Follow RROI</p>

  <div style={styles.socialLinks}>
    <a
      href="https://www.facebook.com/profile.php?id=61591175673812"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.socialLink}
    >
      <FaFacebook size={18} />
      <span>Facebook</span>
    </a>

    <a
      href="https://www.instagram.com/rroi_sa/"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.socialLink}
    >
      <FaInstagram size={18} />
      <span>Instagram</span>
    </a>
  </div>
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
  display: "flex",
  width: "fit-content",
  margin: "0 auto 28px",
  padding: "0",
  borderRadius: 0,
  border: "none",
  background: "transparent",
  color: BRAND_GREEN,
  fontSize: 13,
  fontWeight: 900,
},
  h1: {
  margin: "0 0 16px",
    fontSize: "clamp(34px, 6vw, 58px)",
    lineHeight: 1.04,
    letterSpacing: "-0.045em",
    fontWeight: 950,
    color: TEXT,
  },
  sub: {
  margin: "0 auto",
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
  padding: "50px 0",
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
  stepWrap: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 14,
},

stepBadge: {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: BRAND_GREEN,
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 900,
  marginBottom: 10,
},
  stepNum: {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "#E8F5EE",
  color: BRAND_GREEN,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 14px",
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
  shortLine: {
  margin: "0 0 8px",
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
  flexDirection: "column"
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
  gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
  gap: 28,
  maxWidth: 980,
  margin: "0 auto",
  alignItems: "start",
},
useIcon: {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "#E8F5EE",
  color: BRAND_GREEN,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
  boxSizing: "border-box",
},
useLabel: {
  fontSize: 16,
  fontWeight: 900,
  color: "#0F172A",
  lineHeight: 1.3,
  minHeight: 44,
  textAlign: "center",
},
  useCard: {
  background: "transparent",
  padding: 0,
  fontSize: 16,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "#0F172A",
  textAlign: "center",
  minHeight: 118,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
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
  finalSection: {
  padding: "36px 0 34px",
  background: "#FFFFFF",
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
  marginTop: 28,
  marginBottom: 28,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 14,
},
installText: {
  margin: 0,
  textAlign: "center",
  fontSize: 15,
  fontWeight: 800,
  color: "#334155",
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
  marginTop: 0,
  boxShadow: "0 12px 24px rgba(21,122,85,0.25)",
},
sectionIntro: {
  margin: "-6px auto 26px",
  maxWidth: 680,
  textAlign: "center",
  fontSize: 17,
  lineHeight: 1.6,
  color: "#334155",
},
outlineBtnFull: {
  display: "inline-flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 64,
  marginTop: 12,
  padding: "12px 18px",
  borderRadius: 14,
  border: `1px solid ${BRAND_GREEN}`,
  background: "#FFFFFF",
  color: BRAND_GREEN,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
  textAlign: "center",
  lineHeight: 1.25,
  boxSizing: "border-box",
},
socialSection: {
  textAlign: "center",
  marginTop: 40,
  marginBottom: 10,
},

socialTitle: {
  fontSize: 20,
  fontWeight: 700,
  color: TEXT,
  marginBottom: 18,
},

socialLinks: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap",
},

socialLink: {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: BRAND_GREEN,
  fontSize: 17,
  fontWeight: 600,
  textDecoration: "none",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
},
};
