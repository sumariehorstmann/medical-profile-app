import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";

export default function FAQPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
  <div style={styles.card}>
        <PageHeader />

        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>
  Find answers to the most common questions about RROI, Premium
  subscriptions, QR products, orders and emergency profiles.
</p>

        <FAQ
          q="What is RROI?"
          a="RROI is an information-sharing platform that allows you to create an online Emergency Profile linked to your own unique QR code. The emergency information you choose to include can be viewed when your QR code is scanned."
        />

        <FAQ
          q="Is RROI a medical device or emergency service?"
          a="No. RROI is an information-sharing platform only. RROI is not a medical device, healthcare provider, emergency response service, or substitute for professional medical advice, diagnosis, treatment or emergency assistance."
        />

        <FAQ
          q="How does an RROI QR code work?"
          a="When your QR code is scanned using a smartphone camera or QR scanner, your public RROI Emergency Profile opens in a web browser. No app is required for the person scanning your QR code."
        />

        <FAQ
          q="Do I need to buy the RROI Premium Kit Bundle to use RROI?"
          a="No. You can create and use a Free Basic Profile at no cost. You may later upgrade to the R129 annual Premium Subscription, purchase the R499 RROI Premium Kit Bundle, or order individual physical QR products separately through the RROI Online Store."
        />

        <FAQ
          q="What is included in the Free Basic Profile?"
          a="The Free Basic Profile allows you to add an optional profile photo, your first name and surname, one emergency contact's name and surname, their relationship to you, their phone number and a one-tap Emergency Contact call button. It also includes a downloadable QR phone lock screen wallpaper and a downloadable QR smartwatch wallpaper."
        />

        <FAQ
          q="What information is shown when a Free Basic Profile QR code is scanned?"
          a="The public Free Basic Profile displays your profile photo if one has been added, your first name and surname, one emergency contact's name and surname, their relationship to you, their phone number and an Emergency Contact call button."
        />

        <FAQ
          q="What information can I add to a Premium Emergency Profile?"
          a="A Premium Emergency Profile allows you to add additional emergency, medical, support, identification, communication and contact information. This can include blood type, allergies, medication, medical conditions, implanted devices, mobility notes, medical aid information, doctor and specialist details, preferred hospital, additional emergency contacts, identifying information, languages, location details, additional notes and custom emergency call buttons. Only completed information is displayed."
        />

        <FAQ
          q="What is included in the R129 Premium Subscription?"
          a="The R129 Premium Subscription is an annual subscription that includes everything available in the Free Basic Profile, plus access to the full RROI Premium Emergency Profile. It also includes a downloadable QR phone lock screen wallpaper and a downloadable QR smartwatch wallpaper. No physical QR products are included."
        />

        <FAQ
          q="Do I need to renew my Premium Subscription every year?"
          a="Yes. The Premium Subscription costs R129 per year. It must be renewed annually if you want the full Premium Emergency Profile to remain visible when your QR code is scanned."
        />

        <FAQ
          q="What is included in the R499 RROI Premium Kit Bundle?"
          a="The R499 RROI Premium Kit Bundle includes a 1-year RROI Premium Subscription, full Premium Emergency Profile visibility, one Engraved Metal QR Card, one Engraved Metal QR Tag, one Pack of 5 Splash-Proof QR Stickers, a downloadable QR phone lock screen wallpaper, a downloadable QR smartwatch wallpaper and free nationwide delivery."
        />

        <FAQ
          q="What happens after the first year of the RROI Premium Kit Bundle?"
          a="The RROI Premium Kit Bundle includes Premium access for the first year. After that year, you may renew your Premium Subscription for R129 per year to keep the full Premium Emergency Profile visible."
        />

        <FAQ
          q="Is the RROI Premium Kit Bundle better value than buying everything separately?"
          a="Yes. Purchased separately, the R129 Premium Subscription, R150 Engraved Metal QR Card, R150 Engraved Metal QR Tag, R150 Pack of 5 Splash-Proof QR Stickers and R120 delivery would cost R699. The R499 RROI Premium Kit includes all of these, providing a saving of R200."
        />

        <FAQ
          q="What happens if I already have Premium and then purchase the RROI Premium Kit Bundle?"
          a="The RROI Premium Kit Bundle includes a full additional year of Premium. If you already have an active Premium Subscription, purchasing the RROI Premium Kit Bundle extends your existing Premium period by another year."
        />

        <FAQ
          q="Can I purchase physical QR products without a Premium Subscription?"
          a="Yes. Any registered RROI user can purchase products from the RROI Online Store, including users with a Free Basic Profile and users with a Premium Emergency Profile."
        />

        <FAQ
          q="What products can I order from the RROI Online Store?"
          a="You can order additional Engraved Metal QR Cards, Engraved Metal QR Tags and Packs of 5 Splash-Proof QR Stickers. These products are linked to your existing RROI Emergency Profile."
        />

        <FAQ
          q="Can I order additional QR products later?"
          a="Yes. You can order additional physical QR products through the RROI Online Store at any time. You do not need to create a new profile or account."
        />

        <FAQ
          q="Can I have more than one RROI QR product?"
          a="Yes. You can carry multiple RROI QR products, such as an Engraved Metal QR Card in your wallet, an Engraved Metal QR Tag on your keys or bag, Splash-Proof QR Stickers on personal belongings, and QR wallpapers on your phone and smartwatch."
        />

        <FAQ
          q="Do all my RROI QR products link to the same profile?"
          a="Yes. Every physical QR product and downloadable QR wallpaper linked to your account opens the same RROI Emergency Profile. When you update your profile, the updated information is available through all your existing QR products."
        />

        <FAQ
          q="Do I need to replace my QR products when I update my information?"
          a="No. Your QR products remain linked to the same online RROI Emergency Profile. You can update your information without replacing your Engraved Metal QR Card, Engraved Metal QR Tag, Splash-Proof QR Stickers or downloadable QR wallpapers."
        />

        <FAQ
          q="Where can I use the Splash-Proof QR Stickers?"
          a="The Splash-Proof QR Stickers can be applied to clean, smooth surfaces on everyday items such as mobile phone cases, water bottles, laptops, tablets, bicycle or motorcycle helmets, sports equipment, cooler boxes, travel luggage, wheelchairs and mobility equipment."
        />

        <FAQ
          q="Are the QR stickers waterproof?"
          a="The stickers are described as splash-proof. They are designed to handle normal splashes and everyday use, but they should not be treated as fully waterproof or intended for prolonged submersion."
        />

        <FAQ
          q="What happens if I lose or damage a physical QR product?"
          a="You can order a replacement Engraved Metal QR Card, Engraved Metal QR Tag or Pack of 5 Splash-Proof QR Stickers through the RROI Online Store. Your Emergency Profile remains linked to your account."
        />

        <FAQ
          q="What happens if my Premium Subscription expires?"
          a="Your account and Premium information are not deleted. Your public profile automatically reverts to the Free Basic Profile view until Premium is renewed. Your physical QR products and downloadable QR wallpapers continue to open your profile."
        />

        <FAQ
          q="What information will be visible after Premium expires?"
          a="After Premium expires, the public profile displays only the information included in the Free Basic Profile: your profile photo if added, your first name and surname, one emergency contact's details and the Emergency Contact call button."
        />

        <FAQ
          q="Can I renew my Premium Subscription before it expires?"
          a="Yes. You can renew your Premium Subscription at any time before it expires. The additional subscription period will be added to your existing Premium period."
        />

        <FAQ
          q="Can I choose what information appears on my public RROI Emergency Profile?"
          a="Yes. You decide what information to add to your profile. Only the information you choose to enter can be displayed when your QR code is scanned. You can update or remove information by logging into your RROI account."
        />

        <FAQ
          q="Can I update my information after creating my profile?"
          a="Yes. You can log in to your RROI account and update your profile information whenever your circumstances change."
        />

        <FAQ
          q="How do the downloadable QR phone and smartwatch wallpapers work?"
          a="After creating your profile, you can download your personalised QR phone lock screen wallpaper and QR smartwatch wallpaper from your dashboard. You can set the phone image as your lock screen so the QR code can be viewed without unlocking your phone. Smartwatch setup depends on the watch model and whether it supports custom images or watch faces."
        />

        <FAQ
          q="Are the QR phone and smartwatch wallpapers included with both profile levels?"
          a="Yes. Both the Free Basic Profile and the Premium Emergency Profile include access to the downloadable QR phone lock screen wallpaper and QR smartwatch wallpaper."
        />

        <FAQ
          q="Do I need the RROI app installed to use my QR code?"
          a="No. Any compatible smartphone can scan an RROI QR code using its camera or QR scanner. The person scanning the code does not need an RROI account or the RROI app installed."
        />

        <FAQ
          q="Can affiliate discount codes be used on all purchases?"
          a="No. Affiliate discount codes are only valid on the RROI Premium Kit Bundle where stated. They are not valid for the R129 Premium Subscription or Online Store purchases."
        />

        <FAQ
          q="How much discount does an affiliate code provide?"
          a="An approved affiliate code provides a R30 discount on the R499 RROI Premium Kit Bundle, reducing the price to R469."
        />

        <FAQ
          q="How long does delivery take?"
          a="RROI physical products are custom made to order and are typically manufactured and delivered within 7–14 working days in South Africa."
        />

        <FAQ
          q="Is delivery included with the RROI Premium Kit Bundle?"
          a="Yes. Free nationwide delivery within South Africa is included with the R499 RROI Premium Kit."
        />

        <FAQ
          q="Is delivery included with Online Store orders?"
          a="No. Online Store products are priced separately, and a delivery fee is added to the order at checkout."
        />

        <FAQ
          q="Are physical RROI products available outside South Africa?"
          a="No. Physical RROI products are currently manufactured and delivered only within South Africa. RROI profiles can still be accessed online, but physical product delivery is limited to South Africa."
        />

        <FAQ
          q="Who can use RROI?"
          a="RROI can be used by children, adults and older people. It may be useful for people with allergies, medical conditions, implanted devices or regular medication, as well as for work, travel, sport, outdoor activities and everyday emergency preparedness."
        />

        <FAQ
          q="Can I permanently delete my account and information?"
          a="Yes. You may request permanent deletion of your account and associated profile information. Once the account is deleted, your RROI Emergency Profile will no longer be accessible through your QR code."
        />

        <FAQ
          q="Does RROI guarantee that someone will scan my QR code in an emergency?"
          a="No. RROI cannot guarantee that emergency responders, healthcare professionals, bystanders or any other person will scan, access, use or rely on your QR code or Emergency Profile."
        />

        <FAQ
          q="What should I do in a real emergency?"
          a="In a real emergency, contact the appropriate local emergency services immediately."
        />

        <PageBottomNav />
        </div>
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
    width: "100%",
    minHeight: "100vh",
    background: PAGE_BG,
    padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 16px) 56px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: 900,
    minWidth: 0,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 24,
    padding: "clamp(16px, 4vw, 28px)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    color: TEXT,
  },

  title: {
    margin: "20px 0 24px",
    maxWidth: "100%",
    fontSize: "clamp(30px, 6vw, 36px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
    textAlign: "center",
    overflowWrap: "break-word",
  },

  faqItem: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "clamp(16px, 3vw, 20px)",
    marginBottom: 18,
    background: "#FFFFFF",
    textAlign: "left",
  },

  question: {
    margin: "0 0 10px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 20px)",
    lineHeight: 1.35,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  answer: {
    margin: 0,
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.75,
    color: MUTED,
    overflowWrap: "break-word",
    wordBreak: "normal",
  },
  subtitle: {
  margin: "0 auto 28px",
  width: "100%",
  maxWidth: 700,
  fontSize: "clamp(15px, 2.5vw, 16px)",
  lineHeight: 1.7,
  color: MUTED,
  textAlign: "center",
  overflowWrap: "break-word",
},
};