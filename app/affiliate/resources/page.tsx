import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const ads = [
  {
    title: "Free Emergency Profile Ad",
    description: "Promote free RROI emergency profile sign-ups.",
    file: "/affiliate-ads/ad-free-profile.png",
    downloadName: "rroi-free-emergency-profile-ad.png",
  },
  {
    title: "Premium Kit Discount Ad",
    description: "Affiliate ad with space for your own discount code.",
    file: "/affiliate-ads/ad-premium-kit-discount.png",
    downloadName: "rroi-premium-kit-discount-ad.png",
  },
  {
    title: "Premium Profile Ad",
    description: "Promote the R129/year Premium Emergency Profile.",
    file: "/affiliate-ads/ad-premium-profile.png",
    downloadName: "rroi-premium-profile-ad.png",
  },
  {
    title: "Basic Profile Ad",
    description: "Explain the free Basic Emergency Profile.",
    file: "/affiliate-ads/ad-basic-profile.png",
    downloadName: "rroi-basic-profile-ad.png",
  },
  {
    title: "Premium Emergency Kit Ad",
    description: "Promote the once-off Premium Emergency Kit.",
    file: "/affiliate-ads/ad-premium-kit.png",
    downloadName: "rroi-premium-emergency-kit-ad.png",
  },
  {
    title: "Scan QR to RROI Ad",
    description: "General RROI awareness ad with QR code and website.",
    file: "/affiliate-ads/6.png",
    downloadName: "rroi-scan-qr-to-rroi-ad.png",
  },
  {
    title: "Example RROI Profile Ad",
    description: "Promote the example RROI profile QR code.",
    file: "/affiliate-ads/7.png",
    downloadName: "rroi-example-profile-ad.png",
  },
];

export default function AffiliateResourcesPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <PageHeader />

        <h1 style={styles.h1}>Marketing Resources</h1>

        <p style={styles.p}>
          Download official RROI advertisements, approved captions, hashtags,
          and marketing wording for promoting your affiliate code.
        </p>

        <div style={styles.notice}>
          Only official RROI-approved marketing material may be used unless
          written permission is granted by RROI.
        </div>

        <section style={styles.section}>
          <h2 style={styles.h2}>Downloads</h2>

          <div style={styles.adGrid}>
            {ads.map((ad) => (
              <div key={ad.title} style={styles.adCard}>
                <img src={ad.file} alt={ad.title} style={styles.adImage} />

                <h3 style={styles.adTitle}>{ad.title}</h3>

                <p style={styles.adDescription}>{ad.description}</p>

                <a
                  href={ad.file}
                  download={ad.downloadName}
                  style={styles.downloadButton}
                >
                  Download Ad
                </a>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Approved Hashtags</h2>
          <p style={styles.tagText}>
            #RROI #MedicalID #EmergencyProfile #QRCode #SouthAfrica
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Approved Caption</h2>
          <p style={styles.p}>
            Use my affiliate code to get R30 off your RROI Premium Kit.
          </p>
        </section>

        <div style={styles.links}>
          <Link href="/affiliate/dashboard" style={styles.link}>
            Back to Affiliate Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const BG = "#F8FAFC";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: BG,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    color: TEXT,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 980,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: 24,
    background: "#FFFFFF",
    boxShadow: "0 14px 42px rgba(15, 23, 42, 0.08)",
  },
  h1: {
    fontSize: 34,
    fontWeight: 900,
    margin: "0 0 10px",
    textAlign: "center",
    color: TEXT,
  },
  h2: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 14px",
    color: TEXT,
  },
  p: {
    margin: "0 0 10px",
    fontSize: 15,
    lineHeight: 1.6,
    color: MUTED,
  },
  notice: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    border: "1px solid #BBF7D0",
    background: "#F0FDF4",
    color: "#166534",
    fontWeight: 800,
    lineHeight: 1.5,
  },
  section: {
    marginTop: 24,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 18,
    background: "#FFFFFF",
  },
  adGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
  },
  adCard: {
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 14,
    background: "#FFFFFF",
    boxShadow: "0 8px 22px rgba(15, 23, 42, 0.06)",
  },
  adImage: {
    width: "100%",
    height: "auto",
    borderRadius: 10,
    border: `1px solid ${BORDER}`,
    display: "block",
    marginBottom: 12,
  },
  adTitle: {
    margin: "0 0 6px",
    fontSize: 16,
    fontWeight: 900,
    color: TEXT,
  },
  adDescription: {
    margin: "0 0 12px",
    fontSize: 13,
    lineHeight: 1.5,
    color: MUTED,
  },
  downloadButton: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 10,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 14,
  },
  tagText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: TEXT,
    fontWeight: 800,
  },
  links: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: BRAND_GREEN,
    fontWeight: 900,
  },
};