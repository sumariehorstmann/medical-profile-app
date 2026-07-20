"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import {
  UserRound,
  Star,
  Smartphone,
  PencilLine,
  Globe,
  UsersRound,
  ArrowRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
export default function HomePage() {

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
const [isInstalled, setIsInstalled] = useState(false);
const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    try {
      sessionStorage.setItem("rroi_ref", ref.toUpperCase());
    } catch {}
  }

  function handleBeforeInstallPrompt(e: Event) {
    e.preventDefault();
    setDeferredPrompt(e);
  }

  function handleAppInstalled() {
    setIsInstalled(true);
  }

  window.addEventListener(
    "beforeinstallprompt",
    handleBeforeInstallPrompt
  );

  window.addEventListener(
    "appinstalled",
    handleAppInstalled
  );

  return () => {
    window.removeEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.removeEventListener(
      "appinstalled",
      handleAppInstalled
    );
  };
}, []);

useEffect(() => {
  function checkScreenSize() {
    setIsMobile(window.innerWidth <= 700);
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  return () => {
    window.removeEventListener("resize", checkScreenSize);
  };
}, []);

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.container}>
          <PageHeader />

          <div style={styles.heroContent}>
            <h1 style={styles.h1}>
  Your emergency information, available when it matters most.
</h1>

<div style={styles.badge}>
  Emergency Profiles for South Africans
</div>

<p style={styles.sub}>
  Create your RROI Emergency Profile linked to your own unique QR code. When your QR code is scanned, your emergency information opens instantly in any web browser.
</p>

<div style={styles.ctaRow}>
  <Link href="/login?mode=signup" style={styles.primaryBtn}>
    Get Started
  </Link>
</div>

<div style={styles.heroFeatures}>
  <div style={styles.heroFeature}>
    <CheckCircle2 size={18} color={BRAND_GREEN} />
    <span>Free to create</span>
  </div>

  <div style={styles.heroFeature}>
    <Clock3 size={18} color={BRAND_GREEN} />
    <span>About 3 minutes to set up</span>
  </div>
</div>
                        
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>HOW RROI WORKS</h2>

         
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
  <p style={styles.shortLine}>
    Add your name, profile photo and emergency contact.
  </p>

  <p style={styles.shortLine}>
    You decide what information to include.
  </p>

  <p style={styles.shortLine}>
    Your Basic Emergency Profile becomes available when your QR code is scanned.
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
    <h3 style={styles.cardTitle}>Use your QR code</h3>

<div style={styles.cardText}>
  <p style={styles.shortLine}>
    Download your digital QR code images.
  </p>

  <p style={styles.shortLine}>
    Use them as your phone lock screen wallpaper or smartwatch wallpaper, or share them digitally with family and friends.
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
  <p style={styles.shortLine}>
    Upgrade whenever you are ready.
  </p>

  <p style={styles.shortLine}>
    Make additional emergency and medical information available when your QR code is scanned.
  </p>

  <p style={styles.shortLine}>
    Update the information in your profile at any time.
  </p>
</div>
</div>
</div>
        </div>
      </section>

      <section style={styles.sectionMuted}>
  <div style={styles.container}>
    <h2 style={styles.sectionTitle}>CHOOSE YOUR RROI EMERGENCY PROFILE</h2>

    <p style={styles.sectionIntro}>
      Compare our Free and Premium Emergency Profiles below.
    </p>

    <div style={styles.profileOptionsGrid}>
      {/* FREE BASIC PROFILE */}
      <div style={styles.planCard}>
        <div style={styles.planLabel}>FREE PROFILE</div>

        <h3 style={styles.planTitle}>
          RROI Basic Emergency Profile
        </h3>

        <p style={styles.planPrice}>R0</p>

        <p style={styles.planSub}>
          Essential emergency information available when your QR code is
          scanned.
        </p>

        <ul style={styles.list}>
          <li>Profile photo</li>
          <li>First name and surname</li>
          <li>One emergency contact</li>
          <li>One emergency contact call button</li>
          <li>QR phone lock screen wallpaper</li>
          <li>QR smartwatch wallpaper</li>
          <li>Update your profile anytime</li>
        </ul>

        <Link
          href="/login?mode=signup"
          style={styles.primaryBtnFull}
        >
          Create Free Profile
        </Link>

        <Link
          href="/e/9bde720b-fd11-4206-833b-9b8978d2a339"
          style={styles.outlineBtnFull}
        >
          View Example Free Public Profile
        </Link>
      </div>

      {/* PREMIUM PROFILE */}
      <div style={styles.planCardFeatured}>
        <div style={styles.planLabelFeatured}>
          ⭐ PREMIUM PROFILE
        </div>

        <h3 style={styles.planTitle}>
          RROI Premium Emergency Profile
        </h3>

        <p style={styles.planPrice}>R129/year</p>

        <p style={styles.planSub}>
          Full access to your Premium Emergency Profile while your annual subscription is active.
        </p>

        <ul style={styles.list}>
          <li>Profile photo</li>
          <li>First name and surname</li>
          <li>Multiple emergency contacts</li>
          <li>Multiple emergency contact call buttons</li>
          <li>QR phone lock screen wallpaper</li>
          <li>QR smartwatch wallpaper</li>
          <li>Blood Type, allergies, medications and medical conditions</li>
          <li>Medical aid, doctor and specialist information</li>
          <li>Additional identification and support information</li>
          <li>Update your profile anytime</li>
          
        </ul>

        <div style={styles.upgradeSteps}>
  <div style={styles.upgradeArrow}>
  <ArrowRight
  size={18}
  color={BRAND_GREEN}
  style={{
    flexShrink: 0,
    marginTop: 2,
  }}
/>
  <span>
    Sign up and create your <strong>FREE Profile</strong>
  </span>
</div>

<div style={styles.upgradeArrow}>
  <ArrowRight
  size={18}
  color={BRAND_GREEN}
  style={{
    flexShrink: 0,
    marginTop: 2,
  }}
/>
  <span>
    Upgrade to <strong>Premium</strong> from your Profile page
  </span>
</div>

<div style={styles.upgradeArrow}>
  <ArrowRight
  size={18}
  color={BRAND_GREEN}
  style={{
    flexShrink: 0,
    marginTop: 2,
  }}
/>
  <span>
    Renew annually <strong>(R129/year)</strong>
  </span>
</div>
</div>

        <Link
          href="/login?mode=signup"
          style={styles.primaryBtnFull}
        >
          Create Free Profile
        </Link>

        <Link
          href="/e/891729a6-9f88-49b8-b14d-9d702bde2c6b"
          style={styles.outlineBtnFull}
        >
          View Example Premium Public Profile
        </Link>
      </div>
    </div>

    {/* SEPARATE PREMIUM KIT BUNDLE */}
    <h2
  style={{
    ...styles.sectionTitle,
    marginTop: 24,
    marginBottom: 14,
    fontSize: "clamp(22px, 3vw, 30px)",
  }}
>
  GET YOUR RROI PREMIUM KIT BUNDLE
</h2>

<p style={styles.sectionIntro}>
  Includes one year of Premium access, three physical QR products, free nationwide delivery, saving you R200 compared to buying everything separately.
</p>
    <div style={styles.bundleCard}>
      <div style={styles.bundleTopRow}>
  <div style={styles.bundlePriceBox}>
  <div style={styles.bundleTop}>
    <div style={styles.bestValueBadge}>
  BEST VALUE
</div>

<h3 style={styles.bundleProductTitle}>
  RROI Premium Kit Bundle
</h3>

<div style={styles.bundlePrice}>
  R499
</div>
    
  </div>

  <div style={styles.bundleBottom}>
   
  </div>
</div>
</div>
<div
  style={{
    ...styles.bundleImages,
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(5, minmax(0, 1fr))",
  }}
>
  {/* Engraved Metal QR Card */}
  <div
    style={{
      ...styles.bundleImageCard,
      display: isMobile ? "grid" : "block",
      gridTemplateColumns: isMobile ? "130px 1fr" : undefined,
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? 16 : undefined,
    }}
  >
    <div
      style={{
        ...styles.bundleImageWrap,
        height: isMobile ? 110 : 190,
      }}
    >
      <Image
        src="/images/premium-kit/qr-card.png"
        alt="Engraved Metal QR Card"
        fill
        sizes={isMobile ? "130px" : "180px"}
        style={styles.bundleImage}
      />
    </div>

    <div
      style={{
        ...styles.bundleImageLabel,
        marginTop: isMobile ? 0 : 12,
        textAlign: isMobile ? "left" : "center",
      }}
    >
      Engraved Metal QR Card
    </div>
  </div>

  {/* Engraved Metal QR Tag */}
  <div
    style={{
      ...styles.bundleImageCard,
      display: isMobile ? "grid" : "block",
      gridTemplateColumns: isMobile ? "130px 1fr" : undefined,
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? 16 : undefined,
    }}
  >
    <div
      style={{
        ...styles.bundleImageWrap,
        height: isMobile ? 110 : 190,
      }}
    >
      <Image
        src="/images/premium-kit/qr-tag-front-back.png"
        alt="Engraved Metal QR Tag"
        fill
        sizes={isMobile ? "130px" : "180px"}
        style={styles.bundleImage}
      />
    </div>

    <div
      style={{
        ...styles.bundleImageLabel,
        marginTop: isMobile ? 0 : 12,
        textAlign: isMobile ? "left" : "center",
      }}
    >
      Engraved Metal QR Tag
    </div>
  </div>

  {/* QR Stickers */}
  <div
    style={{
      ...styles.bundleImageCard,
      display: isMobile ? "grid" : "block",
      gridTemplateColumns: isMobile ? "130px 1fr" : undefined,
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? 16 : undefined,
    }}
  >
    <div
      style={{
        ...styles.bundleImageWrap,
        height: isMobile ? 110 : 190,
      }}
    >
      <Image
        src="/images/premium-kit/qr-sticker-pack.png"
        alt="Pack of 5 Splash-Proof QR Stickers"
        fill
        sizes={isMobile ? "130px" : "180px"}
        style={styles.bundleImage}
      />
    </div>

    <div
      style={{
        ...styles.bundleImageLabel,
        marginTop: isMobile ? 0 : 12,
        textAlign: isMobile ? "left" : "center",
      }}
    >
      Pack of 5 Splash-Proof QR Stickers
    </div>
  </div>

  {/* Phone Wallpaper */}
  <div
    style={{
      ...styles.bundleImageCard,
      display: isMobile ? "grid" : "block",
      gridTemplateColumns: isMobile ? "130px 1fr" : undefined,
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? 16 : undefined,
    }}
  >
    <div
      style={{
        ...styles.bundleImageWrap,
        height: isMobile ? 110 : 190,
      }}
    >
      <Image
        src="/images/premium-kit/phone-lock-screen.png"
        alt="Phone Lock Screen Wallpaper"
        fill
        sizes={isMobile ? "130px" : "180px"}
        style={styles.bundleImage}
      />
    </div>

    <div
      style={{
        ...styles.bundleImageLabel,
        marginTop: isMobile ? 0 : 12,
        textAlign: isMobile ? "left" : "center",
      }}
    >
      Phone Lock Screen Wallpaper
    </div>
  </div>

  {/* Smartwatch Wallpaper */}
  <div
    style={{
      ...styles.bundleImageCard,
      display: isMobile ? "grid" : "block",
      gridTemplateColumns: isMobile ? "130px 1fr" : undefined,
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? 16 : undefined,
    }}
  >
    <div
      style={{
        ...styles.bundleImageWrap,
        height: isMobile ? 110 : 190,
      }}
    >
      <Image
        src="/images/premium-kit/smartwatch-wallpaper.png"
        alt="Smartwatch Wallpaper"
        fill
        sizes={isMobile ? "130px" : "180px"}
        style={styles.bundleImage}
      />
    </div>

    <div
      style={{
        ...styles.bundleImageLabel,
        marginTop: isMobile ? 0 : 12,
        textAlign: isMobile ? "left" : "center",
      }}
    >
      Smartwatch Wallpaper
    </div>
  </div>
</div>
      <div style={styles.bundleContentGrid}>
        <div>
          <h4 style={styles.bundleListTitle}>
            Your Premium Kit Bundle includes:
          </h4>

          <ul style={styles.bundleList}>
            <li>1-year RROI Premium Emergency Profile Subscription</li>
            <li>Engraved Metal QR Card</li>
            <li>Engraved Metal QR Tag</li>
            <li>Pack of 5 Splash-Proof QR Stickers</li>
            <li>QR phone lock screen wallpaper</li>
            <li>QR smartwatch wallpaper</li>
            <li>Free nationwide delivery</li>
          </ul>
          
        </div>

        <div style={styles.bundleActionPanel}>
          
          <div style={styles.upgradeSteps}>
  <div style={styles.upgradeArrow}>
    <ArrowRight
      size={18}
      color={BRAND_GREEN}
      style={{
        flexShrink: 0,
        marginTop: 2,
      }}
    />
    <span>
      Sign up and create your <strong>FREE Profile</strong>
    </span>
  </div>

  <div style={styles.upgradeArrow}>
    <ArrowRight
      size={18}
      color={BRAND_GREEN}
      style={{
        flexShrink: 0,
        marginTop: 2,
      }}
    />
    <span>
      Purchase <strong>RROI Premium Kit Bundle</strong> from your Profile page
    </span>
  </div>

  <div style={styles.upgradeArrow}>
    <ArrowRight
      size={18}
      color={BRAND_GREEN}
      style={{
        flexShrink: 0,
        marginTop: 2,
      }}
    />
    <span>
  Renew your Premium Emergency Profile annually <strong>(R129/year)</strong>
</span>
  </div>
</div>

          <Link
            href="/login?mode=signup"
            style={styles.primaryBtnFull}
          >
            Create Free Profile
          </Link>

          <Link
            href="/premium-kit"
            style={styles.outlineBtnFull}
          >
            View RROI Premium Kit Bundle
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      <section style={styles.section}>
  <div style={styles.container}>

    <h2 style={styles.sectionTitle}>
      Why carry an RROI QR code?
    </h2>

    <p style={styles.sectionIntro}>
      Carry your RROI QR code every day so the emergency information you
      choose to share can be accessed if it is ever needed.
    </p>

    <div style={styles.grid4}>

      <div style={styles.card}>
        <div style={styles.cardIcon}>
          <UsersRound size={34} />
        </div>

        <h3 style={styles.cardTitle}>
          Designed for everyone
        </h3>

        <div style={styles.cardText}>
          <p>
            Children, adults and older people can all create an RROI
            Emergency Profile.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardIcon}>
          <Smartphone size={34} />
        </div>

        <h3 style={styles.cardTitle}>
          Carry it every day
        </h3>

        <div style={styles.cardText}>
          <p>
            Use your QR phone wallpaper, smartwatch wallpaper, metal QR
            card, metal QR tag or splash-proof QR stickers at work,
            while travelling, during sport, outdoor activities and
            everyday life.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardIcon}>
          <PencilLine size={34} />
        </div>

        <h3 style={styles.cardTitle}>
          Update anytime
        </h3>

        <div style={styles.cardText}>
          <p>
            Keep your emergency information up to date whenever your
            circumstances change.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardIcon}>
          <Globe size={34} />
        </div>

        <h3 style={styles.cardTitle}>
          No app required
        </h3>

        <div style={styles.cardText}>
          <p>
            Your Emergency Profile opens instantly in a web browser when
            your QR code is scanned. No app is required to scan your QR
            code.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>

      <section style={styles.sectionMuted}>
  <div style={styles.container}>

    <h2 style={styles.sectionTitle}>
      RROI ONLINE STORE
    </h2>
   

    <div style={styles.splitCard}>
      <div>

        <p style={styles.cardTextLarge}>
          Order additional RROI QR Cards, QR Tags and QR Stickers linked to your
          RROI Emergency Profile from our Online Store.
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
    When every second counts, be prepared.
Ready to create your RROI Emergency Profile?
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
  heroFeatures: {
  marginTop: 18,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap",
},

heroFeature: {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 15,
  fontWeight: 700,
  color: "#334155",
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
  
  grid4: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: 16,
},

card: {
  border: `1px solid ${BORDER}`,
  borderRadius: 20,
  padding: 22,
  background: "#FFFFFF",
},

cardIcon: {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "#E8F5EE",
  color: BRAND_GREEN,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 18px",
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
 
profileOptionsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 20,
  maxWidth: 900,
  margin: "0 auto",
  alignItems: "stretch",
},

bundleCard: {
  marginTop: 32,
  border: `2px solid ${BRAND_GREEN}`,
  borderRadius: 24,
  padding: 28,
  background: "#FFFFFF",
  boxShadow: "0 18px 38px rgba(21, 122, 85, 0.12)",
},

bundleTopRow: {
  display: "flex",
  justifyContent: "center",
  paddingBottom: 24,
  borderBottom: `1px solid ${BORDER}`,
},

bundleTitle: {
  margin: "0 0 10px",
  fontSize: "clamp(26px, 4vw, 38px)",
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  fontWeight: 950,
  color: TEXT,
},

bundleText: {
  margin: 0,
  maxWidth: 650,
  fontSize: 16,
  lineHeight: 1.65,
  color: "#334155",
},

bundlePriceBox: {
  width: "100%",
  maxWidth: 680,
  padding: 24,
  borderRadius: 18,
  background: "#F0FDF4",
  border: "1px solid #BBF7D0",
  textAlign: "center",
},

bestValueBadge: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 14px",
  borderRadius: 999,
  background: "#DCFCE7",
  color: BRAND_GREEN,
  fontSize: 13,
  fontWeight: 950,
  marginBottom: 14,   // was 16
},

bundleProductTitle: {
  margin: "0 0 14px",
  fontSize: 24,
  lineHeight: 1.2,
  fontWeight: 950,
  color: TEXT,
},

bundleSavingText: {
  marginTop: 14,
  fontSize: 14,
  lineHeight: 1.6,
  color: "#475569",
  fontWeight: 700,
},

bundlePrice: {
  fontSize: 42,
  lineHeight: 1,
  fontWeight: 950,
  color: TEXT,
},

bundlePriceNote: {
  marginTop: 8,
  fontSize: 14,
  fontWeight: 800,
  color: "#334155",
},

bundleRenewal: {
  marginTop: 10,
  fontSize: 13,
  lineHeight: 1.5,
  fontWeight: 900,
  color: BRAND_GREEN,
},

bundleContentGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 28,
  paddingTop: 24,
  alignItems: "start",
},

bundleListTitle: {
  margin: "0 0 12px",
  fontSize: 18,
  lineHeight: 1.3,
  fontWeight: 950,
  color: TEXT,
},

bundleList: {
  margin: 0,
  paddingLeft: 22,
  fontSize: 15,
  lineHeight: 1.9,
  color: "#334155",
},

bundleActionPanel: {
  padding: 22,
  borderRadius: 18,
  background: SOFT,
  border: `1px solid ${BORDER}`,
},

bundleActionText: {
  margin: "0 0 14px",
  fontSize: 14,
  lineHeight: 1.65,
  color: "#475569",
  fontWeight: 700,
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

bundleImages: {
  display: "grid",
  gap: 16,
  marginTop: 20,
  width: "100%",
},

bundleImageCard: {
  minWidth: 0,
  border: `1px solid ${BORDER}`,
  borderRadius: 18,
  background: "#FFFFFF",
  padding: 14,
  textAlign: "center",
},

bundleImageWrap: {
  position: "relative",
  width: "100%",
  height: 190,
  overflow: "hidden",
},

bundleImage: {
  objectFit: "contain",
},

bundleImageLabel: {
  marginTop: 12,
  fontSize: 16,
  fontWeight: 900,
  color: TEXT,
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
upgradeSteps: {
  margin: "0 0 20px",
  padding: 16,
  borderRadius: 14,
  background: "#F8FAFC",
  border: `1px solid ${BORDER}`,
  display: "flex",
  flexDirection: "column",
  gap: 12,
},

upgradeArrow: {
  display: "flex",
  alignItems: "flex-start",   // instead of center
  gap: 10,
  fontSize: 15,
  fontWeight: 700,
  color: "#334155",
  lineHeight: 1.5,
},
bundleTop: {
  paddingBottom: 0,
  marginBottom: 0,
},

bundleBottom: {
  paddingTop: 2,
},
};
