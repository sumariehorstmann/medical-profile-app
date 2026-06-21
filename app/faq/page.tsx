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
          a="RROI is an information-sharing platform that allows you to create an emergency profile linked to a QR code. Important information can be accessed when your QR code is scanned."
        />

        <FAQ
          q="Is RROI a medical device or emergency service?"
          a="No. RROI is an information-sharing platform only. RROI is not a medical device, healthcare provider, emergency response service, or substitute for professional medical advice, diagnosis, treatment, or emergency assistance."
        />

        <FAQ
          q="How does the RROI QR code work?"
          a="When your QR code is scanned using a smartphone camera or QR scanner, your public RROI profile opens in a web browser. No app installation is required for the person scanning the QR code."
        />

        <FAQ
          q="What information can I add to my RROI profile?"
          a="You can add a profile photo, personal details, emergency contacts, blood type, allergies, medical conditions, medications, implanted devices, mobility notes, organ donor status, medical aid information, doctor and specialist details, preferred hospital, languages, identifying information, additional notes, and emergency call buttons."
        />

        <FAQ
          q="What is included in the Basic Profile?"
          a="The Basic Profile is free and includes a profile photo, first name, surname, one emergency contact, an emergency call button, a downloadable QR phone lock screen wallpaper, and a downloadable QR smartwatch wallpaper."
        />

        <FAQ
          q="How do the downloadable QR phone and smartwatch wallpapers work?"
          a="After creating your profile, you can download your QR phone lock screen image and QR smartwatch wallpaper from your dashboard. Save the image to your device. On your phone, open the image from your gallery or photos app and set it as your lock screen image so your QR code can be viewed and scanned without unlocking your phone. Smartwatch setup depends on your watch model and app, but the downloaded smartwatch image can be used where custom watch faces or wallpapers are supported."
        />

        <FAQ
          q="What information is shown when a Basic Profile QR code is scanned?"
          a="Only the profile photo, first name, surname, and one emergency contact are displayed."
        />

        <FAQ
          q="What is included in the R129 Premium Subscription?"
          a="The R129 Premium Subscription provides full public profile visibility when your QR code is scanned."
        />

        <FAQ
          q="What is included in the R499 Premium Kit?"
          a="The Premium Kit includes a 1-year Premium Subscription, full public profile visibility, one black anodised aluminium QR card, one black anodised aluminium QR tag, a downloadable QR phone lock screen wallpaper, and a downloadable QR smartwatch wallpaper."
        />

        <FAQ
          q="What happens if I upgrade from Premium (R129) to the Premium Kit (R499)?"
          a="The Premium Kit includes a full 1-year Premium subscription. If you already have an active Premium subscription and later purchase the Premium Kit, your current subscription period is extended by an additional year."
        />

        <FAQ
          q="Can affiliate discount codes be used on all purchases?"
          a="No. Affiliate discount codes are only valid on the RROI Premium Kit where stated."
        />

        <FAQ
          q="How much discount does an affiliate code provide?"
          a="Approved affiliate codes provide a R30 discount on the RROI Premium Kit. Premium Kit price: R499. Affiliate discount: R30. Discounted price: R469."
        />

        <FAQ
          q="Can I update my information after creating my profile?"
          a="Yes. You can log in to your account and update your profile information at any time."
        />

        <FAQ
          q="Can I renew my Premium subscription before it expires?"
          a="Yes. You can renew your Premium subscription at any time before expiry."
        />

        <FAQ
          q="What happens if my Premium subscription expires?"
          a="Your profile is not deleted. Your public profile automatically reverts to the Basic Profile view, displaying only your profile photo, first name, surname, and one emergency contact. You can renew your Premium subscription at any time."
        />

        <FAQ
          q="Do I need the RROI app installed to use my QR code?"
          a="No. Any modern smartphone can scan an RROI QR code using its camera or QR scanner. The person scanning your QR code does not need an RROI account or the RROI app installed."
        />

        <FAQ
          q="What happens if I lose my QR card or QR tag?"
          a="Replacement QR cards and QR tags can be purchased through the RROI Online Store. Your profile information remains linked to your account."
        />

        <FAQ
          q="How long does delivery take?"
          a="RROI products are custom made to order and are typically manufactured and delivered within 7–14 working days in South Africa."
        />

        <FAQ
          q="Are physical RROI products available outside South Africa?"
          a="No. Physical RROI products, including QR cards and QR tags, are currently only manufactured and delivered within South Africa. Online RROI profiles may be accessed through the website, but physical product delivery is limited to South Africa only."
/>
        <FAQ
          q="Can I permanently delete my account and information?"
          a="Yes. You may request permanent deletion of your account and profile information. Once deleted, your information will no longer be accessible through your QR code."
        />

        <FAQ
          q="Does RROI guarantee that someone will scan my QR code in an emergency?"
          a="No. RROI cannot guarantee that emergency responders, healthcare personnel, bystanders, or any other person will scan, access, use, or rely on your QR profile."
        />

        <FAQ
          q="Who should use RROI?"
          a="RROI can be used by children, adults, elderly individuals, people with allergies, chronic medical conditions, implanted medical devices, those taking regular medication, athletes, travelers, and anyone who wants important information available through a QR code in an emergency."
        />

        <FAQ
          q="What should I do in a real emergency?"
          a="In a real emergency, contact local emergency services immediately."
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