import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

export default function FAQPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <PageHeader />

        <h1 style={styles.title}>Frequently Asked Questions</h1>

        <FAQ
          q="What is RROI?"
          a="RROI is an information-sharing platform that lets you create an emergency profile linked to a QR code."
        />

        <FAQ
          q="Is RROI a medical device or emergency service?"
          a="No. RROI is not a medical device, healthcare provider, emergency response service, or substitute for professional medical advice or emergency assistance."
        />

        <FAQ
          q="What information is shown when my QR code is scanned?"
          a="You choose what information is added to your profile. Free profiles show limited information. Premium profiles allow expanded public emergency profile visibility."
        />

        <FAQ
          q="Do I need the app to scan a QR code?"
          a="No. Most modern smartphones can scan QR codes using the device camera."
        />

        <FAQ
          q="What is included in Premium?"
          a="Premium allows expanded public emergency profile visibility and includes downloadable QR phone and smartwatch wallpapers."
        />

        <FAQ
          q="What is included in the Premium Kit?"
          a="The Premium Kit includes the first year Premium subscription, two engraved physical QR products, downloadable QR wallpapers, and nationwide delivery."
        />

        <FAQ
          q="Can I update my information?"
          a="Yes. You can log in and update your profile information anytime."
        />

        <FAQ
          q="Does RROI guarantee that my QR code will be scanned in an emergency?"
          a="No. RROI cannot guarantee that any person will scan, access, use, or rely on a QR profile in an emergency."
        />

        <FAQ
          q="What should I do in a real emergency?"
          a="Contact local emergency services immediately."
        />

        <PageBottomNav />
      </section>
    </main>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div style={styles.faqItem}>
      <h2 style={styles.question}>{q}</h2>
      <p style={styles.answer}>{a}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "40px 16px",
  },
  card: {
    maxWidth: 850,
    margin: "0 auto",
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 24,
    padding: 28,
    color: "#0F172A",
  },
  title: {
    margin: "20px 0 24px",
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    textAlign: "center",
  },
  faqItem: {
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    background: "#FFFFFF",
  },
  question: {
    margin: "0 0 8px",
    fontSize: 18,
    fontWeight: 900,
  },
  answer: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#475569",
  },
};