import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const ads = [
  {
    title: "Create Your Free Emergency Profile",
    description: "Promote free RROI emergency profile sign-ups.",
    file: "/affiliate-ads/1.png",
    downloadName: "rroi-create-free-emergency-profile.png",
  },
  {
    title: "Premium Kit Discount",
    description: "Affiliate ad with space for your own discount code.",
    file: "/affiliate-ads/2.png",
    downloadName: "rroi-premium-kit-discount.png",
  },
  {
    title: "Premium Emergency Profile",
    description: "Promote the Premium Emergency Profile.",
    file: "/affiliate-ads/3.png",
    downloadName: "rroi-premium-emergency-profile.png",
  },
  {
    title: "Basic Emergency Profile",
    description: "Promote the free Basic Emergency Profile.",
    file: "/affiliate-ads/4.png",
    downloadName: "rroi-basic-emergency-profile.png",
  },
  {
    title: "Premium Emergency Kit",
    description: "Promote the Premium Emergency Kit.",
    file: "/affiliate-ads/5.png",
    downloadName: "rroi-premium-emergency-kit.png",
  },
  {
    title: "Scan QR Code",
    description: "General RROI awareness advertisement.",
    file: "/affiliate-ads/6.png",
    downloadName: "rroi-scan-qr-code.png",
  },
  {
    title: "How to Scan QR Code",
    description: "Show Android users how to scan QR codes.",
    file: "/affiliate-ads/7.png",
    downloadName: "rroi-how-to-scan-qr-code.png",
  },
  {
    title: "Example Premium Profile",
    description: "Example of a Premium public profile.",
    file: "/affiliate-ads/8.png",
    downloadName: "rroi-example-premium-profile.png",
  },
  {
    title: "Example Free Profile",
    description: "Example of a Free public profile.",
    file: "/affiliate-ads/9.png",
    downloadName: "rroi-example-free-profile.png",
  },
  {
    title: "What is RROI?",
    description: "Explain what RROI is.",
    file: "/affiliate-ads/10.png",
    downloadName: "rroi-what-is-rroi.png",
  },
  {
    title: "Who is RROI For?",
    description: "Explain who can benefit from RROI.",
    file: "/affiliate-ads/11.png",
    downloadName: "rroi-who-is-rroi-for.png",
  },
  {
    title: "Who Can Scan RROI QR Codes?",
    description: "Explain who can scan an RROI QR code.",
    file: "/affiliate-ads/12.png",
    downloadName: "rroi-who-can-scan-rroi.png",
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
    #RROI #EmergencyProfile #SouthAfrica #QRCode #EDC
    <br />
    #RapidResponseOnlineInformation #EmergencyPreparedness
    <br />
    #EmergencyContacts
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
  display: "flex",
  flexDirection: "column",
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
  marginTop: "auto",
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