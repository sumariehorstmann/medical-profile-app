"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Privacy Policy</h1>

            <p style={styles.subtitle}>
              This Privacy Policy explains how RROI collects, uses, stores,
              shares and protects personal information when you use the RROI
              website, web application, mobile application, emergency-profile
              service, online store or affiliate programme.
            </p>

            <div style={styles.policyMeta}>
              <div>
                <strong>Effective date:</strong> 23 July 2026
              </div>

              <div>
                <strong>Responsible party:</strong> RROI (Pty) Ltd
              </div>

              <div>
                <strong>Registration number:</strong> 2026/303146/07
              </div>

              <div>
                <strong>Location:</strong> Port Elizabeth, Eastern Cape, South
                Africa
              </div>

              <div>
                <strong>Privacy and Information Officer contact:</strong>{" "}
                <a href="mailto:support@rroi.co.za" style={styles.link}>
                  support@rroi.co.za
                </a>
              </div>
            </div>
          </div>

          <PrivacySection title="1. Introduction">
            <p style={styles.paragraph}>
              RROI (Pty) Ltd respects your right to privacy and is committed to
              processing personal information lawfully, reasonably,
              transparently and securely in accordance with the Protection of
              Personal Information Act 4 of 2013, commonly referred to as
              POPIA, and other applicable South African laws.
            </p>

            <p style={styles.paragraph}>
              This policy should be read together with the RROI Terms and
              Conditions, Refund Policy, Affiliate Terms where applicable, and
              any consent notices displayed when you create an account, submit
              information, place an order or make a payment.
            </p>
          </PrivacySection>

          <PrivacySection title="2. Who We Are and Our Role">
            <p style={styles.paragraph}>
              RROI (Pty) Ltd is the responsible party for personal information
              processed through the RROI platform. This means RROI determines
              why and how personal information is processed for purposes
              connected with operating and providing the RROI service.
            </p>

            <p style={styles.paragraph}>
              RROI provides an online emergency-information platform through
              which a profile owner can create and maintain an emergency
              profile linked to a unique QR code. When the QR code is scanned,
              the profile information made publicly visible under the
              applicable profile level may be displayed in a web browser.
            </p>
          </PrivacySection>

          <PrivacySection title="3. Scope of This Policy">
            <p style={styles.paragraph}>
              This policy applies to personal information processed through:
            </p>

            <BulletList
              items={[
                "the RROI website at www.rroi.co.za;",
                "the RROI web application and mobile application;",
                "Free and Premium emergency profiles;",
                "RROI QR codes, wallpapers and physical QR products;",
                "Premium subscriptions, renewals and Premium Kit purchases;",
                "the RROI online store;",
                "the RROI affiliate programme;",
                "support, service and marketing communications; and",
                "related administrative, security and legal processes.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="4. Meaning of Key Terms">
            <p style={styles.paragraph}>
              In this policy:
            </p>

            <BulletList
              items={[
                "“Personal information” means information relating to an identifiable person, as described in POPIA.",
                "“Special personal information” includes information concerning a person’s health, medical circumstances, religious beliefs and certain other protected categories.",
                "“Processing” includes collecting, recording, storing, using, sharing, updating, deleting or otherwise handling personal information.",
                "“Profile owner” means the account holder who creates, manages or is authorised to manage an RROI profile.",
                "“Public profile” means the information displayed when an RROI QR code or public profile link is opened.",
                "“Emergency contact” means a person whose details are supplied by a profile owner for emergency-contact purposes.",
                "“Child” has the meaning assigned to that term under applicable South African law and POPIA.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="5. Information We Collect">
            <p style={styles.paragraph}>
              RROI collects information that you voluntarily submit, together
              with limited information generated through the operation,
              security and administration of the platform.
            </p>

            <h3 style={styles.subheading}>5.1 Account information</h3>

            <BulletList
              items={[
                "email address;",
                "authentication and account identifiers;",
                "account creation and verification information;",
                "login and session information;",
                "marketing-consent status and related timestamps; and",
                "account status and account-deletion information.",
              ]}
            />

            <p style={styles.paragraph}>
              Passwords are processed through RROI’s authentication service.
              RROI does not have access to your password in readable form.
            </p>

            <h3 style={styles.subheading}>5.2 Identity and profile information</h3>

            <BulletList
              items={[
                "first name and surname;",
                "profile photograph;",
                "date of birth and automatically calculated age;",
                "gender;",
                "nationality;",
                "province and city;",
                "primary and secondary language;",
                "height and weight;",
                "eye colour, hair colour, skin tone and identifying marks; and",
                "other information you choose to add to your profile.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.3 Emergency and medical information
            </h3>

            <BulletList
              items={[
                "blood type;",
                "allergies;",
                "medical conditions;",
                "medications;",
                "implanted devices;",
                "mobility information;",
                "pregnancy information;",
                "organ-donor status;",
                "preferred hospital;",
                "medical-aid provider, plan and membership or policy number;",
                "general practitioner and specialist contact details;",
                "additional medical notes;",
                "local ambulance or security-company details; and",
                "custom emergency call-button information.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.4 Emergency-contact information
            </h3>

            <BulletList
              items={[
                "emergency-contact names;",
                "relationship to the profile owner;",
                "telephone numbers; and",
                "any additional emergency-contact information voluntarily supplied.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.5 Subscription, payment and consent information
            </h3>

            <BulletList
              items={[
                "subscription type and status;",
                "subscription start and end dates;",
                "payment amount, payment status and payment reference;",
                "discount or affiliate codes used;",
                "records confirming acceptance of applicable legal terms;",
                "the date and time of legal acceptance;",
                "IP address and user-agent information recorded during checkout; and",
                "transaction information returned by the payment provider.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI does not request or store your complete payment-card number,
              card security code or online-banking password. Payment information
              of that nature is entered into and processed through the
              third-party payment provider.
            </p>

            <h3 style={styles.subheading}>
              5.6 Order and delivery information
            </h3>

            <BulletList
              items={[
                "customer and recipient names;",
                "email address and cellphone number;",
                "delivery address;",
                "products and quantities ordered;",
                "order and delivery status;",
                "courier and tracking information;",
                "QR link and public profile identifier required to manufacture personalised QR products; and",
                "limited profile and emergency information required to prepare the ordered product.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.7 Affiliate information
            </h3>

            <BulletList
              items={[
                "affiliate application information;",
                "contact information and location;",
                "promotional methods and target audience;",
                "social-media handles supplied by the applicant;",
                "experience and application responses;",
                "affiliate code and status;",
                "bank name, account-holder name, account number, account type and branch code;",
                "referral, commission and payout records;",
                "EFT references; and",
                "internal review notes.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.8 Ratings and feedback
            </h3>

            <BulletList
              items={[
                "star rating;",
                "experience comments;",
                "improvement feedback;",
                "permission or refusal regarding public use of feedback; and",
                "whether an authorised review has been selected for homepage display.",
              ]}
            />

            <h3 style={styles.subheading}>
              5.9 Technical and security information
            </h3>

            <BulletList
              items={[
                "IP address where collected for security, consent or transaction purposes;",
                "browser and user-agent information;",
                "device and operating-system information made available through normal web requests;",
                "authentication and session information;",
                "security, diagnostic and error information;",
                "service-worker and application-cache information; and",
                "information stored through essential browser storage.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="6. How We Collect Information">
            <p style={styles.paragraph}>
              Personal information may be collected:
            </p>

            <BulletList
              items={[
                "directly from you when you register, complete or update a profile;",
                "when an authorised parent or guardian creates or manages a profile for another person;",
                "when you place an order, subscribe, renew or make a payment;",
                "when you apply for or participate in the affiliate programme;",
                "when you submit a rating, support request or other communication;",
                "automatically through essential authentication, browser-storage and security technologies;",
                "from PayFast after a transaction is attempted or completed; and",
                "from service providers where necessary to deliver, secure or administer the RROI service.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="7. Purposes for Processing Information">
            <p style={styles.paragraph}>
              RROI may process personal information for the following purposes:
            </p>

            <BulletList
              items={[
                "creating, verifying and administering user accounts;",
                "creating and maintaining emergency profiles and unique QR codes;",
                "displaying the appropriate public profile when a QR code is scanned;",
                "generating phone and smartwatch QR wallpapers;",
                "providing Free and Premium profile functionality;",
                "processing subscriptions, renewals, purchases and payments;",
                "manufacturing and delivering personalised QR products;",
                "operating and administering the affiliate programme;",
                "calculating and recording affiliate commissions and payouts;",
                "sending account, verification, order, payment, tracking, affiliate and renewal communications;",
                "responding to support, privacy and account requests;",
                "recording legal agreements and transaction consent;",
                "preventing misuse, unauthorised access, fraud and security incidents;",
                "maintaining, testing and improving the platform;",
                "complying with legal, regulatory, accounting and tax obligations;",
                "establishing, exercising or defending legal rights; and",
                "sending marketing communications where valid consent has been provided.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="8. Lawful Grounds for Processing">
            <p style={styles.paragraph}>
              Depending on the circumstances, RROI processes information on one
              or more lawful grounds, including:
            </p>

            <BulletList
              items={[
                "your consent;",
                "performance of a contract or steps taken at your request before entering into a contract;",
                "compliance with legal obligations;",
                "protection of your legitimate interests or those of another person;",
                "RROI’s legitimate interests in operating, securing and administering the service, where those interests do not unjustifiably interfere with your privacy; and",
                "other grounds permitted under POPIA or applicable law.",
              ]}
            />

            <p style={styles.paragraph}>
              Where RROI relies on consent, you may withdraw that consent,
              subject to lawful limitations and the consequences of no longer
              being able to provide the relevant feature.
            </p>
          </PrivacySection>

          <PrivacySection title="9. Special Personal Information">
            <p style={styles.paragraph}>
              Emergency profiles may contain health, medical, religious and
              other special personal information. Providing these fields is
              voluntary unless a particular field is clearly marked as required
              for a requested transaction or product.
            </p>

            <p style={styles.paragraph}>
              RROI processes this information for the specific purpose of
              storing and displaying emergency information selected by the
              profile owner, administering the account and providing related
              services. RROI does not diagnose, treat, monitor or verify medical
              conditions and does not independently confirm the accuracy of
              information submitted by users.
            </p>

            <p style={styles.paragraph}>
              You should only provide special personal information that is
              relevant to the emergency-profile purpose and that you are
              comfortable making visible under your selected public-profile
              level.
            </p>
          </PrivacySection>

          <PrivacySection title="10. Public Emergency Profiles and QR Codes">
            <p style={styles.paragraph}>
              The central purpose of RROI is to make selected emergency
              information accessible when a unique QR code or public profile
              link is opened. A public RROI profile does not require the person
              scanning the QR code to log in.
            </p>

            <BulletList
              items={[
                "A Free profile publicly displays the information made available in Section 1 of the profile.",
                "A Premium profile may publicly display completed information from Sections 1 to 7.",
                "Only completed fields intended for public display are shown.",
                "A profile owner may complete information that is not publicly visible under the Free profile level.",
                "Anyone who obtains or scans the QR code may be able to view the publicly available profile information.",
                "RROI cannot control screenshots, photographs, copying or further sharing by a person who has accessed a public profile.",
              ]}
            />

            <p style={styles.paragraph}>
              Profile owners must carefully consider what information they
              enter and must protect their QR code and public profile link in a
              manner appropriate to the information displayed.
            </p>
          </PrivacySection>

          <PrivacySection title="11. Accuracy and Responsibility for Information">
            <p style={styles.paragraph}>
              Profile owners are responsible for ensuring that information
              entered into RROI is accurate, complete, current and not
              misleading. Emergency and medical information should be reviewed
              and updated whenever circumstances change.
            </p>

            <p style={styles.paragraph}>
              RROI does not independently verify medical information, emergency
              contacts, identity information or other user-supplied content.
              Incorrect, incomplete or outdated information may reduce the
              usefulness of the profile.
            </p>
          </PrivacySection>

          <PrivacySection title="12. Information About Other People">
            <p style={styles.paragraph}>
              When you provide information about an emergency contact, child,
              dependant or another person, you confirm that:
            </p>

            <BulletList
              items={[
                "you are authorised to provide and use that information;",
                "you have obtained any consent required by law;",
                "the information is accurate to the best of your knowledge; and",
                "you have informed the person, where appropriate, about how the information will be used and displayed.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="13. Children’s Information">
            <p style={styles.paragraph}>
              Profiles relating to children must be created or managed with the
              involvement and lawful authority of a parent, legal guardian or
              other competent person as required by applicable law.
            </p>

            <p style={styles.paragraph}>
              A person under 13 may not independently create or manage an RROI
              profile. A parent or legal guardian should create and manage the
              profile on that person’s behalf.
            </p>

            <p style={styles.paragraph}>
              Where a profile relates to a person under 18, the person creating
              or managing the profile confirms that they have the necessary
              authority and consent to process and publish the child’s
              information. RROI may request confirmation of that authority and
              may restrict or remove a profile where lawful authority cannot be
              established.
            </p>
          </PrivacySection>

          <PrivacySection title="14. Payments">
            <p style={styles.paragraph}>
              RROI uses PayFast to process payments. When you proceed to
              payment, information necessary to process the transaction is
              transmitted to PayFast. PayFast processes payment information
              under its own terms and privacy practices.
            </p>

            <p style={styles.paragraph}>
              RROI may receive and store transaction references, amounts,
              payment status, payer information returned by PayFast and related
              transaction records. RROI does not store your complete payment
              card details or online-banking credentials.
            </p>
          </PrivacySection>

          <PrivacySection title="15. Service Providers and Information Sharing">
            <p style={styles.paragraph}>
              RROI does not sell personal information. Information may be
              disclosed to service providers, contractors or other recipients
              where reasonably necessary for the purposes described in this
              policy.
            </p>

            <p style={styles.paragraph}>
              Current categories and examples of providers include:
            </p>

            <BulletList
              items={[
                "Supabase for database hosting, authentication and file storage;",
                "Vercel for website and application hosting and delivery;",
                "PayFast for payment processing;",
                "Brevo for transactional and authorised marketing email delivery;",
                "courier and delivery providers for physical-product fulfilment;",
                "Google services for relevant mobile-application distribution and business communications;",
                "Microsoft services for relevant business administration and records; and",
                "professional advisers, accountants, tax practitioners or legal advisers where reasonably necessary.",
              ]}
            />

            <p style={styles.paragraph}>
              Providers are given only the information reasonably necessary for
              the service they perform and may be subject to contractual,
              technical and legal confidentiality or data-protection
              obligations.
            </p>
          </PrivacySection>

          <PrivacySection title="16. Other Circumstances in Which Information May Be Disclosed">
            <p style={styles.paragraph}>
              RROI may disclose personal information where:
            </p>

            <BulletList
              items={[
                "you have authorised the disclosure;",
                "disclosure is necessary to provide a service or complete a transaction requested by you;",
                "RROI is required or permitted to do so by law, regulation, court order, warrant or lawful regulatory request;",
                "disclosure is reasonably necessary to investigate fraud, misuse, security threats or unlawful activity;",
                "disclosure is required to protect the rights, safety or property of RROI, a user or another person;",
                "disclosure is necessary to establish, exercise or defend legal rights; or",
                "RROI undergoes a lawful merger, acquisition, sale, restructuring or transfer of business, subject to applicable privacy requirements.",
              ]}
            />
          </PrivacySection>

          <PrivacySection title="17. International and Cross-Border Processing">
            <p style={styles.paragraph}>
              Some service providers used by RROI operate or store information
              outside South Africa. Personal information may therefore be
              transferred to, stored in or accessed from other countries.
            </p>

            <p style={styles.paragraph}>
              RROI will take reasonable steps to ensure that cross-border
              processing occurs in accordance with POPIA, including by using
              reputable providers, appropriate contractual safeguards or other
              lawful transfer mechanisms where required.
            </p>
          </PrivacySection>

          <PrivacySection title="18. Cookies, Sessions and Browser Storage">
            <p style={styles.paragraph}>
              RROI uses essential technologies required for authentication,
              security and operation of the platform. These may include:
            </p>

            <BulletList
              items={[
                "authentication cookies or session tokens that keep users signed in;",
                "local storage or session storage used for essential application functions;",
                "service-worker and cache storage used to support the web application or installed application experience;",
                "security information used to prevent unauthorised access; and",
                "temporary storage required to complete forms, downloads or application functions.",
              ]}
            />

            <p style={styles.paragraph}>
              These technologies are necessary for the requested service and
              are not used by RROI to sell personal information.
            </p>

            <p style={styles.paragraph}>
              RROI does not currently use third-party advertising cookies or
              behavioural advertising trackers. If optional analytics,
              advertising or similar non-essential technologies are introduced,
              this policy and any required consent process will be updated.
            </p>

            <p style={styles.paragraph}>
              Blocking essential browser storage may prevent login, account
              access or other features from functioning correctly.
            </p>
          </PrivacySection>

          <PrivacySection title="19. Marketing Communications">
            <p style={styles.paragraph}>
              RROI sends marketing emails only where the user has selected the
              applicable marketing-consent option or where another lawful basis
              permits the communication.
            </p>

            <p style={styles.paragraph}>
              Users may subscribe or unsubscribe through their profile where
              that option is available, use an unsubscribe method contained in
              a communication, or contact RROI at{" "}
              <a href="mailto:support@rroi.co.za" style={styles.link}>
                support@rroi.co.za
              </a>
              .
            </p>

            <p style={styles.paragraph}>
              Withdrawing marketing consent does not prevent RROI from sending
              essential service communications such as verification,
              transaction, security, subscription, order or account notices.
            </p>
          </PrivacySection>

          <PrivacySection title="20. Data Security">
            <p style={styles.paragraph}>
              RROI applies reasonable technical and organisational safeguards
              appropriate to the nature of the information processed. These
              measures include, where applicable:
            </p>

            <BulletList
              items={[
                "encrypted HTTPS connections;",
                "managed authentication and password hashing through the authentication provider;",
                "server-side authentication and authorisation checks;",
                "restricted administrator access using a dedicated authorised administrator account;",
                "service-role credentials retained on the server and not intentionally exposed to users;",
                "database access controls and row-level security where applicable;",
                "input validation and restricted administrative endpoints;",
                "two-factor authentication on relevant business services where enabled;",
                "controlled access to business systems and records; and",
                "weekly offline backup copies stored on a separately secured hard drive in a locked safe.",
              ]}
            />

            <p style={styles.paragraph}>
              Despite reasonable safeguards, no internet service, database,
              device, transmission method or storage system can be guaranteed to
              be completely secure. Users must keep their login credentials and
              devices secure and must notify RROI promptly if they suspect
              unauthorised access.
            </p>
          </PrivacySection>

          <PrivacySection title="21. Security Incidents">
            <p style={styles.paragraph}>
              If RROI becomes aware of a security compromise involving personal
              information, RROI will investigate, contain and respond to the
              incident and will make notifications to affected persons and the
              Information Regulator where required by applicable law.
            </p>

            <p style={styles.paragraph}>
              Notifications may be delayed where a competent authority
              determines that notification would impede a criminal
              investigation.
            </p>
          </PrivacySection>

          <PrivacySection title="22. Data Retention">
            <p style={styles.paragraph}>
              RROI retains personal information only for as long as reasonably
              necessary for the purposes for which it was collected, while an
              account or transaction remains active, or for a period required
              or permitted by law.
            </p>

            <BulletList
              items={[
                "Active account and profile information is generally retained while the account remains active.",
                "Public visibility may be reduced when a Premium subscription expires or is cancelled, while the underlying account continues to exist.",
                "Incomplete store-checkout records may remain temporarily until completed, deleted through account deletion or removed through normal administrative processes.",
                "Legal-consent records connected with payment checkout may be retained for up to five years for evidentiary, dispute-resolution, fraud-prevention or legal purposes.",
                "Transaction, tax, accounting, payment-provider and business records may be retained for the applicable period required or permitted by law.",
                "Affiliate payout and related business records may be retained where required for accounting, tax, fraud-prevention, dispute-resolution or legal purposes.",
                "Information may be retained for longer where reasonably required for an actual or anticipated legal claim, regulatory investigation or lawful instruction.",
              ]}
            />

            <p style={styles.paragraph}>
              When information is no longer required, RROI will take reasonable
              steps to delete, destroy, de-identify or restrict it, subject to
              applicable technical and legal limitations.
            </p>
          </PrivacySection>

          <PrivacySection title="23. Backups">
            <p style={styles.paragraph}>
              RROI creates an offline backup approximately once per week for
              disaster-recovery and business-continuity purposes. The previous
              backup is normally overwritten when the next backup is created.
            </p>

            <p style={styles.paragraph}>
              Information deleted from the live system may therefore remain in
              a backup for a limited period, generally until the next weekly
              backup rotation. Backup information is not intended for ordinary
              operational use and would only be accessed where reasonably
              necessary for disaster recovery, security investigation, legal
              compliance or business continuity.
            </p>
          </PrivacySection>

          <PrivacySection title="24. Account Deletion">
            <p style={styles.paragraph}>
              A logged-in user may use the in-app account-deletion process. The
              process requires confirmation and authentication before the
              account is deleted.
            </p>

            <p style={styles.paragraph}>
              Subject to successful completion of the process and applicable
              legal-retention requirements, account deletion removes active
              user-linked information including:
            </p>

            <BulletList
              items={[
                "the authentication account;",
                "the emergency profile and public profile;",
                "the unique profile QR records;",
                "emergency-contact records;",
                "uploaded profile photographs stored by RROI;",
                "subscriptions;",
                "active payment and application records linked to the account;",
                "Premium order-form and shipping information;",
                "pending store-order information;",
                "RROI order records linked to the account;",
                "ratings, feedback and public-review permission;",
                "affiliate applications, referral records and affiliate account information; and",
                "associated affiliate payout records where removed through linked database deletion rules.",
              ]}
            />

            <p style={styles.paragraph}>
              Certain separate records may remain where retention is required
              or permitted for legal agreements, transaction evidence,
              accounting, tax, fraud prevention, disputes, security,
              enforcement or other lawful purposes. Records retained after
              deletion will not be used to recreate the deleted public profile
              unless required by law or expressly authorised by the affected
              person.
            </p>

            <p style={styles.paragraph}>
              External providers, including payment, email or delivery
              providers, may retain their own records under their legal and
              contractual obligations. RROI cannot directly delete information
              controlled independently by those providers.
            </p>
          </PrivacySection>

          <PrivacySection title="25. Your Rights">
            <p style={styles.paragraph}>
              Subject to POPIA and other applicable laws, you may have the right
              to:
            </p>

            <BulletList
              items={[
                "ask whether RROI holds personal information about you;",
                "request access to personal information held by RROI;",
                "request correction or updating of inaccurate information;",
                "request deletion or destruction where legally permitted;",
                "object to processing on reasonable grounds where POPIA permits an objection;",
                "withdraw consent where processing is based on consent;",
                "object to or unsubscribe from direct marketing;",
                "request information about the identity of third parties that have had access to your information where legally applicable;",
                "submit a complaint to RROI; and",
                "lodge a complaint with the Information Regulator.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI may request reasonable information to verify your identity
              and authority before processing a privacy request. A request may
              be refused or limited where permitted or required by law, and RROI
              will explain the lawful reason where appropriate.
            </p>
          </PrivacySection>

          <PrivacySection title="26. Complaints">
            <p style={styles.paragraph}>
              Privacy concerns should first be sent to RROI at{" "}
              <a href="mailto:support@rroi.co.za" style={styles.link}>
                support@rroi.co.za
              </a>
              . Please provide enough information for RROI to understand and
              investigate the concern.
            </p>

            <p style={styles.paragraph}>
              If you believe that your personal information has been processed
              in violation of POPIA, you may lodge a complaint with the
              Information Regulator of South Africa. The Information
              Regulator’s designated POPIA complaints email is{" "}
              <a
                href="mailto:POPIAComplaints@inforegulator.org.za"
                style={styles.link}
              >
                POPIAComplaints@inforegulator.org.za
              </a>
              .
            </p>
          </PrivacySection>

          <PrivacySection title="27. Automated Decision-Making">
            <p style={styles.paragraph}>
              RROI does not currently use solely automated decision-making that
              produces legal or similarly significant effects concerning
              users. Automated processes may be used for ordinary operational
              functions such as account verification, subscription status,
              payment confirmation, reminders, fraud checks and profile
              visibility.
            </p>
          </PrivacySection>

          <PrivacySection title="28. Medical and Emergency-Service Clarification">
            <p style={styles.paragraph}>
              RROI is an information-storage and retrieval platform. It is not
              a medical practitioner, healthcare provider, emergency-response
              service, ambulance service or substitute for professional medical
              advice or emergency assistance.
            </p>

            <p style={styles.paragraph}>
              RROI does not direct medical treatment and does not guarantee that
              a QR code will be scanned, that a profile will be accessed, that
              information will be relied upon or that the service will be
              continuously available. Healthcare professionals, emergency
              personnel and other persons remain responsible for their own
              professional decisions and legal duties.
            </p>
          </PrivacySection>

          <PrivacySection title="29. Changes to This Policy">
            <p style={styles.paragraph}>
              RROI may update this Privacy Policy when its services, legal
              obligations, providers or processing activities change. The
              revised policy will be published on the RROI website with an
              updated effective date.
            </p>

            <p style={styles.paragraph}>
              Where a change materially affects how personal information is
              processed, RROI will take reasonable steps to provide an
              additional notice or obtain consent where required by law.
            </p>
          </PrivacySection>

          <PrivacySection title="30. Contact RROI">
            <p style={styles.paragraph}>
              Questions, access requests, correction requests, deletion
              requests, objections, marketing-consent requests and other
              privacy enquiries may be submitted by email to:
            </p>

            <div style={styles.contactBox}>
              <strong>RROI (Pty) Ltd</strong>
              <br />
              Registration number: 2026/303146/07
              <br />
              Port Elizabeth, Eastern Cape, South Africa
              <br />
              Email:{" "}
              <a href="mailto:support@rroi.co.za" style={styles.link}>
                support@rroi.co.za
              </a>
            </div>
          </PrivacySection>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

function PrivacySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item} style={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
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
    maxWidth: 960,
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
    padding: "clamp(16px, 4vw, 30px)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  topBlock: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: 26,
    textAlign: "center",
  },

  title: {
    margin: 0,
    maxWidth: "100%",
    fontSize: "clamp(30px, 6vw, 38px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  subtitle: {
    margin: "12px auto 0",
    maxWidth: 720,
    fontSize: "clamp(15px, 2.5vw, 16px)",
    lineHeight: 1.7,
    color: MUTED,
    overflowWrap: "break-word",
  },

  policyMeta: {
    width: "100%",
    maxWidth: 720,
    margin: "20px auto 0",
    padding: "16px 18px",
    boxSizing: "border-box",
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    background: "#F8FAFC",
    color: MUTED,
    fontSize: 14,
    lineHeight: 1.8,
    textAlign: "left",
    overflowWrap: "break-word",
  },

  section: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "clamp(16px, 3vw, 22px)",
    background: "#FFFFFF",
    marginBottom: 18,
  },

  sectionTitle: {
    margin: "0 0 12px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 21px)",
    lineHeight: 1.35,
    fontWeight: 900,
    color: TEXT,
    overflowWrap: "break-word",
  },

  subheading: {
    margin: "20px 0 8px",
    maxWidth: "100%",
    fontSize: "clamp(16px, 3.5vw, 17px)",
    lineHeight: 1.4,
    fontWeight: 850,
    color: TEXT,
    overflowWrap: "break-word",
  },

  paragraph: {
    margin: "0 0 12px",
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.75,
    color: MUTED,
    overflowWrap: "break-word",
    wordBreak: "normal",
  },

  list: {
    margin: "10px 0 14px",
    paddingLeft: 22,
    maxWidth: "100%",
    boxSizing: "border-box",
    color: MUTED,
  },

  listItem: {
    marginBottom: 8,
    paddingLeft: 3,
    fontSize: 15,
    lineHeight: 1.65,
    overflowWrap: "break-word",
  },

  contactBox: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 18px",
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    background: "#F8FAFC",
    color: MUTED,
    fontSize: 15,
    lineHeight: 1.8,
    overflowWrap: "break-word",
  },

  link: {
    maxWidth: "100%",
    color: BRAND_GREEN,
    fontWeight: 800,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    overflowWrap: "anywhere",
  },
};