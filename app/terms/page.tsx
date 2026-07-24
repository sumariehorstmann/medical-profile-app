"use client";

import PageHeader from "@/components/PageHeader";
import PageBottomNav from "@/components/PageBottomNav";

const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E5E7EB";
const PAGE_BG = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BRAND_GREEN = "#157A55";

export default function TermsPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.card}>
          <PageHeader />

          <div style={styles.topBlock}>
            <h1 style={styles.title}>Terms &amp; Conditions</h1>

            <p style={styles.subtitle}>
              These Terms &amp; Conditions govern your access to and use of the
              RROI platform, emergency-profile services, subscriptions, QR
              products, online store, affiliate programme and related services.
            </p>

            <div style={styles.policyMeta}>
              <div>
                <strong>Effective date:</strong> 23 July 2026
              </div>

              <div>
                <strong>Company:</strong> RROI (Pty) Ltd
              </div>

              <div>
                <strong>Registration number:</strong> 2026/303146/07
              </div>

              <div>
                <strong>Country:</strong> Republic of South Africa
              </div>

              <div>
                <strong>Contact:</strong>{" "}
                <a href="mailto:support@rroi.co.za" style={styles.link}>
                  support@rroi.co.za
                </a>
              </div>
            </div>
          </div>

          <TermsSection title="1. Introduction">
            <p style={styles.paragraph}>
              These Terms and Conditions (“Terms”) govern your access to and use
              of the RROI platform, including the RROI website, web application,
              mobile application, emergency-profile services, QR-code services,
              Premium subscriptions, Premium Kit Bundles, online store,
              affiliate programme and all related products and services provided
              by RROI (Pty) Ltd.
            </p>

            <p style={styles.paragraph}>
              These Terms constitute a legally binding agreement between you and
              RROI (Pty) Ltd.
            </p>

            <p style={styles.paragraph}>
              By creating an account, logging into the platform, purchasing any
              product or subscription, creating an emergency profile, using an
              RROI QR code, accessing an RROI public profile, or otherwise using
              an RROI service, you acknowledge that you have read, understood
              and agree to be bound by these Terms.
            </p>

            <p style={styles.paragraph}>
              If you do not agree to these Terms, you must not use the RROI
              platform.
            </p>
          </TermsSection>

          <TermsSection title="2. About RROI">
            <p style={styles.paragraph}>
              RROI, meaning Rapid Response Online Information, is operated by
              RROI (Pty) Ltd, a company incorporated in the Republic of South
              Africa.
            </p>

            <p style={styles.paragraph}>
              RROI provides a digital emergency-information platform designed to
              allow individuals to create and manage emergency profiles linked
              to unique QR codes.
            </p>

            <p style={styles.paragraph}>
              When an authorised QR code or public-profile link is accessed,
              selected emergency information chosen by the profile owner may be
              displayed in a web browser to assist emergency responders,
              healthcare professionals, family members or other persons during
              an emergency.
            </p>

            <p style={styles.paragraph}>
              RROI is an information-storage and retrieval platform only. RROI
              is not a medical device, emergency service, ambulance service,
              healthcare provider, hospital, medical practitioner, medical
              scheme or insurance provider.
            </p>
          </TermsSection>

          <TermsSection title="3. Definitions">
            <p style={styles.paragraph}>For purposes of these Terms:</p>

            <Definition
              term="Affiliate"
              text="means an individual approved by RROI to participate in the RROI Affiliate Programme."
            />

            <Definition
              term="Affiliate Code"
              text="means the unique referral code assigned to an approved affiliate."
            />

            <Definition
              term="Emergency Contact"
              text="means a person whose details are voluntarily supplied by the profile owner for emergency-notification purposes."
            />

            <Definition
              term="Emergency Profile"
              text="means an RROI profile containing emergency information created and managed by a user."
            />

            <Definition
              term="Free Profile"
              text="means the free version of an RROI profile with limited public visibility and features."
            />

            <Definition
              term="Premium Subscription"
              text="means the annual paid subscription providing additional profile functionality and expanded public-profile visibility."
            />

            <Definition
              term="Premium Kit Bundle"
              text="means the RROI package that includes one year of Premium access together with selected personalised physical QR products."
            />

            <Definition
              term="Profile Owner"
              text="means the registered user responsible for creating and maintaining an emergency profile."
            />

            <Definition
              term="Public Profile"
              text="means the information displayed when an RROI QR code or public-profile link is opened."
            />

            <Definition
              term="QR Code"
              text="means a unique code generated or supplied by RROI that links to an RROI public profile."
            />

            <Definition
              term="Services"
              text="means all products, software, subscriptions, applications, websites and related services offered by RROI."
            />

            <Definition
              term="Website"
              text="means www.rroi.co.za and any authorised RROI web application."
            />

            <Definition
              term="You or User"
              text="means any individual accessing or using the RROI platform."
            />
          </TermsSection>

          <TermsSection title="4. Acceptance of These Terms">
            <p style={styles.paragraph}>These Terms apply whenever you:</p>

            <BulletList
              items={[
                "create an RROI account;",
                "verify your email address;",
                "log into your account;",
                "create or edit an emergency profile;",
                "purchase a Premium Subscription;",
                "purchase a Premium Kit Bundle;",
                "purchase products through the RROI Online Store;",
                "use an affiliate code;",
                "participate in the Affiliate Programme;",
                "scan or use an RROI QR code;",
                "access an RROI public profile;",
                "browse or use the RROI website; or",
                "otherwise use an RROI service.",
              ]}
            />

            <p style={styles.paragraph}>
              Your continued use of RROI constitutes acceptance of these Terms
              and any future updates published by RROI.
            </p>
          </TermsSection>

          <TermsSection title="5. Eligibility">
            <p style={styles.paragraph}>
              Any person may create and use an RROI profile.
            </p>

            <p style={styles.paragraph}>
              If a profile owner is under the age at which they may lawfully
              manage their own personal information under applicable law, RROI
              recommends that a parent, legal guardian or another authorised
              adult create and manage the profile on their behalf.
            </p>

            <p style={styles.paragraph}>
              Where a person creates or manages an RROI profile for another
              individual, including a child or dependant, they confirm that they
              have the necessary authority or permission to do so and accept
              responsibility for the information submitted.
            </p>

            <p style={styles.paragraph}>
              By creating an account, you represent that:
            </p>

            <BulletList
              items={[
                "the information you provide is accurate;",
                "you have the legal authority to provide information relating to another person;",
                "you will keep the information reasonably up to date; and",
                "you agree to comply with these Terms and all applicable laws.",
              ]}
            />
          </TermsSection>

          <TermsSection title="6. User Accounts">
            <p style={styles.paragraph}>
              Creating an RROI account requires a valid email address and
              completion of the registration process.
            </p>

            <p style={styles.paragraph}>
              Certain features require email verification before becoming
              available.
            </p>

            <p style={styles.paragraph}>
              You are responsible for maintaining the confidentiality of your
              login credentials.
            </p>

            <p style={styles.paragraph}>
              You must immediately notify RROI if you become aware of any
              unauthorised use of your account.
            </p>

            <p style={styles.paragraph}>
              You remain responsible for all activity occurring under your
              account unless caused solely by RROI’s own negligence or unlawful
              conduct.
            </p>

            <p style={styles.paragraph}>
              RROI may refuse registration, suspend accounts or require
              additional verification where reasonably necessary to protect
              users, comply with legal obligations or prevent fraud.
            </p>
          </TermsSection>

          <TermsSection title="7. Account Security">
            <p style={styles.paragraph}>
              You are responsible for maintaining the security of:
            </p>

            <BulletList
              items={[
                "your password;",
                "your email account;",
                "your devices;",
                "your QR products;",
                "your public-profile link; and",
                "any authentication methods associated with your account.",
              ]}
            />

            <p style={styles.paragraph}>You must not:</p>

            <BulletList
              items={[
                "share your login credentials;",
                "attempt to access another user’s account;",
                "bypass authentication mechanisms;",
                "interfere with platform security; or",
                "intentionally introduce malicious software into the platform.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI employs reasonable security measures to protect user
              information. However, no online platform can guarantee absolute
              security.
            </p>

            <p style={styles.paragraph}>
              You acknowledge that use of internet-based services carries
              inherent risks.
            </p>
          </TermsSection>

          <TermsSection title="8. Emergency Profiles">
            <p style={styles.paragraph}>
              The primary purpose of RROI is to provide emergency information
              when it may be needed during an emergency.
            </p>

            <p style={styles.paragraph}>
              An emergency profile may include information such as:
            </p>

            <BulletList
              items={[
                "identity information;",
                "profile photograph;",
                "emergency contacts;",
                "blood type;",
                "allergies;",
                "medications;",
                "medical conditions;",
                "implanted medical devices;",
                "pregnancy information;",
                "medical-aid information;",
                "preferred hospital;",
                "healthcare-provider details;",
                "language preferences;",
                "mobility information;",
                "custom emergency call buttons; and",
                "additional information voluntarily supplied by the profile owner.",
              ]}
            />

            <p style={styles.paragraph}>
              Profile information is supplied entirely by the profile owner.
              RROI does not independently verify the accuracy of information
              contained in an emergency profile.
            </p>
          </TermsSection>

          <TermsSection title="9. Accuracy of Information">
            <p style={styles.paragraph}>
              The profile owner is solely responsible for ensuring that all
              information entered into RROI remains accurate, complete and up to
              date.
            </p>

            <p style={styles.paragraph}>
              This includes, without limitation:
            </p>

            <BulletList
              items={[
                "blood type;",
                "allergies;",
                "medications;",
                "medical conditions;",
                "emergency contacts;",
                "healthcare providers;",
                "medical-aid details;",
                "emergency numbers;",
                "physical characteristics; and",
                "additional notes.",
              ]}
            />

            <p style={styles.paragraph}>
              Profile owners should review their emergency profiles regularly
              and update them whenever circumstances change.
            </p>

            <p style={styles.paragraph}>
              RROI accepts no responsibility for consequences arising from
              inaccurate, incomplete, outdated or misleading information
              supplied by a user.
            </p>

            <p style={styles.paragraph}>
              Healthcare professionals, emergency responders and other persons
              accessing an RROI profile remain responsible for exercising their
              own professional judgement.
            </p>
          </TermsSection>

          <TermsSection title="10. Emergency Contact Information">
            <p style={styles.paragraph}>
              By entering emergency-contact information into your profile, you
              confirm that:
            </p>

            <BulletList
              items={[
                "you have lawful authority to provide those contact details;",
                "the information is accurate to the best of your knowledge;",
                "you have obtained any consent required by applicable law;",
                "the information is provided for emergency purposes; and",
                "you understand that the information may become visible to persons accessing your public profile under your selected profile visibility.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI is not responsible for disputes arising between profile
              owners and emergency contacts.
            </p>
          </TermsSection>

          <TermsSection title="11. Children’s Profiles">
            <p style={styles.paragraph}>
              RROI may be used to create emergency profiles for children and
              other dependants.
            </p>

            <p style={styles.paragraph}>
              RROI recommends that profiles for minors be created and managed by
              a parent, legal guardian or another authorised adult.
            </p>

            <p style={styles.paragraph}>
              The person creating or managing the profile confirms that they:
            </p>

            <BulletList
              items={[
                "have lawful authority to act on behalf of the child or dependant;",
                "have obtained permissions or consents required by law;",
                "will maintain accurate and current information; and",
                "accept responsibility for information entered into the profile.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI reserves the right to restrict, suspend or remove a profile
              where it reasonably believes that a person lacks authority to
              create or manage the profile or where continued use may breach
              applicable law.
            </p>
          </TermsSection>

          <TermsSection title="12. QR Codes and Public Profiles">
            <p style={styles.paragraph}>
              Each RROI emergency profile is linked to a unique QR code and may
              also be accessible through a public-profile link.
            </p>

            <p style={styles.paragraph}>
              When a QR code is scanned, the associated public profile may be
              displayed in a web browser without requiring the person scanning
              the code to log in.
            </p>

            <p style={styles.paragraph}>
              The amount of information displayed depends on the profile
              owner’s subscription level and information they have chosen to
              complete.
            </p>

            <p style={styles.paragraph}>Users acknowledge and accept that:</p>

            <BulletList
              items={[
                "anyone who obtains the QR code may be able to access the public profile;",
                "public-profile information may be viewed, photographed, copied or shared by third parties;",
                "RROI cannot control screenshots, downloads or redistribution after information has been accessed;",
                "profile owners are responsible for deciding what information they make publicly available; and",
                "possession of an RROI QR code does not verify the identity or authority of the person scanning it.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI does not guarantee that every QR-code scan will be successful
              or that a public profile will always be available due to internet
              connectivity, device compatibility, maintenance, third-party
              interruptions or circumstances beyond RROI’s reasonable control.
            </p>
          </TermsSection>

          <TermsSection title="13. Free Profiles">
            <p style={styles.paragraph}>
              RROI offers a Free Profile that allows users to create and
              maintain an emergency profile at no cost.
            </p>

            <p style={styles.paragraph}>
              Features available on a Free Profile are determined by RROI and
              may change from time to time.
            </p>

            <p style={styles.paragraph}>
              A Free Profile generally includes limited public-profile
              visibility compared with a Premium Subscription.
            </p>

            <p style={styles.paragraph}>
              RROI may modify, expand, restrict or discontinue Free Profile
              features without creating an obligation to continue offering a
              particular feature indefinitely.
            </p>
          </TermsSection>

          <TermsSection title="14. Premium Subscription">
            <p style={styles.paragraph}>
              RROI offers an optional annual Premium Subscription that provides
              additional features and enhanced public-profile visibility.
            </p>

            <p style={styles.paragraph}>
              Premium features may include:
            </p>

            <BulletList
              items={[
                "expanded public emergency-profile visibility;",
                "additional medical-information fields;",
                "additional emergency contacts;",
                "custom emergency call buttons;",
                "downloadable QR wallpapers; and",
                "additional profile features released by RROI from time to time.",
              ]}
            />

            <p style={styles.paragraph}>
              Premium access remains active for the subscription period
              purchased.
            </p>

            <p style={styles.paragraph}>
              Unless renewed, Premium access expires at the end of the
              applicable subscription period.
            </p>

            <p style={styles.paragraph}>
              Upon expiry, the account may automatically revert to applicable
              Free Profile features while retaining the underlying account and
              profile information unless the account is deleted.
            </p>

            <p style={styles.paragraph}>
              RROI reserves the right to modify Premium features, subscription
              pricing or benefits for future subscription periods.
            </p>
          </TermsSection>

          <TermsSection title="15. Premium Kit Bundle">
            <p style={styles.paragraph}>
              RROI offers the Premium Kit Bundle, which includes one year of
              Premium access together with selected personalised physical QR
              products.
            </p>

            <p style={styles.paragraph}>
              The contents of the Premium Kit Bundle are described on the RROI
              website at the time of purchase.
            </p>

            <p style={styles.paragraph}>
              Because the products are personalised for each customer,
              production begins only after payment has been successfully
              confirmed.
            </p>

            <p style={styles.paragraph}>
              Customers are responsible for ensuring that the emergency profile
              linked to the QR products is accurate before manufacture.
            </p>

            <p style={styles.paragraph}>
              Changes made to the online profile after manufacture will update
              the online emergency profile but will not physically alter
              products already manufactured.
            </p>
          </TermsSection>

          <TermsSection title="16. Online Store">
            <p style={styles.paragraph}>
              RROI operates an online store through which users may purchase
              personalised and non-personalised products.
            </p>

            <p style={styles.paragraph}>
              Store products may include QR cards, QR tags, QR stickers and
              other products offered by RROI.
            </p>

            <p style={styles.paragraph}>
              Personalised products are manufactured to order.
            </p>

            <p style={styles.paragraph}>
              Product photographs, colours, finishes, dimensions and materials
              displayed on the website are guides only and may vary slightly
              from finished products due to manufacturing processes, material
              characteristics or supplier variations.
            </p>

            <p style={styles.paragraph}>
              RROI reserves the right to discontinue products, introduce new
              products or modify specifications without prior notice.
            </p>
          </TermsSection>

          <TermsSection title="17. Orders and Payments">
            <p style={styles.paragraph}>
              All prices displayed by RROI are quoted in South African Rand
              (ZAR).
            </p>

            <p style={styles.paragraph}>
              Orders are subject to payment verification and acceptance by
              RROI.
            </p>

            <p style={styles.paragraph}>
              RROI currently uses PayFast as its payment-service provider.
              Payment transactions are processed in accordance with the
              provider’s own terms, conditions and security procedures.
            </p>

            <p style={styles.paragraph}>
              RROI does not store complete payment-card details or
              online-banking credentials.
            </p>

            <p style={styles.paragraph}>
              Orders will generally be processed only once payment has been
              successfully confirmed.
            </p>

            <p style={styles.paragraph}>
              RROI reserves the right to cancel, refuse or delay an order where:
            </p>

            <BulletList
              items={[
                "payment cannot be verified;",
                "fraudulent activity is suspected;",
                "a pricing error has occurred;",
                "stock or materials become unavailable;",
                "production is not reasonably possible; or",
                "the order would breach applicable law or these Terms.",
              ]}
            />

            <p style={styles.paragraph}>
              If payment is declined or cancelled before completion, no order
              will be processed.
            </p>
          </TermsSection>

          <TermsSection title="18. Renewals">
            <p style={styles.paragraph}>
              Premium Subscriptions are valid for the subscription period
              purchased.
            </p>

            <p style={styles.paragraph}>
              RROI may send renewal reminders before expiry. Users remain
              responsible for renewing their subscriptions if they wish to
              continue receiving Premium features.
            </p>

            <p style={styles.paragraph}>
              Failure to renew may result in:
            </p>

            <BulletList
              items={[
                "expiry of Premium access;",
                "reduced public-profile visibility;",
                "loss of Premium-only features; and",
                "reversion to applicable Free Profile functionality.",
              ]}
            />

            <p style={styles.paragraph}>
              Renewal pricing may differ from previous subscription pricing.
              New pricing will apply to future renewals.
            </p>
          </TermsSection>

          <TermsSection title="19. Refunds">
            <p style={styles.paragraph}>
              Refunds are governed by the RROI Refund Policy.
            </p>

            <p style={styles.paragraph}>
              Because many RROI products are personalised and manufactured for
              individual customers, refunds may be limited where permitted by
              applicable law.
            </p>

            <p style={styles.paragraph}>
              Nothing in these Terms limits rights users may have under the
              Consumer Protection Act or other applicable South African
              legislation.
            </p>

            <p style={styles.paragraph}>
              Users should read the Refund Policy before placing an order.
            </p>
          </TermsSection>

          <TermsSection title="20. Delivery">
            <p style={styles.paragraph}>
              Estimated production and delivery timeframes displayed by RROI are
              estimates only.
            </p>

            <p style={styles.paragraph}>
              Delivery times may vary because of:
            </p>

            <BulletList
              items={[
                "production requirements;",
                "courier delays;",
                "public holidays;",
                "severe weather;",
                "supply shortages;",
                "strikes;",
                "customs delays where applicable; or",
                "events beyond RROI’s reasonable control.",
              ]}
            />

            <p style={styles.paragraph}>
              Risk in physical products passes to the customer upon delivery by
              the courier to the delivery address supplied by the customer,
              subject to applicable law.
            </p>

            <p style={styles.paragraph}>
              Customers are responsible for providing accurate delivery
              information.
            </p>

            <p style={styles.paragraph}>
              RROI is not responsible for delays or losses caused by incorrect
              delivery information supplied by the customer.
            </p>
          </TermsSection>

          <TermsSection title="21. Affiliate Programme">
            <p style={styles.paragraph}>
              Participation in the RROI Affiliate Programme is by invitation or
              approval only.
            </p>

            <p style={styles.paragraph}>
              Submitting an affiliate application does not guarantee
              acceptance.
            </p>

            <p style={styles.paragraph}>
              RROI may approve or decline applications at its discretion,
              subject to applicable law.
            </p>

            <p style={styles.paragraph}>
              Approved affiliates receive a unique affiliate code which may be
              used in accordance with the Affiliate Terms.
            </p>

            <p style={styles.paragraph}>
              Affiliate commissions are payable only on qualifying purchases
              that satisfy applicable programme requirements.
            </p>

            <p style={styles.paragraph}>
              Affiliate discounts, commissions, payout thresholds and payout
              dates are determined by RROI and may be amended for future
              transactions.
            </p>

            <p style={styles.paragraph}>
              RROI may suspend, terminate or remove an affiliate where it
              reasonably believes the affiliate has:
            </p>

            <BulletList
              items={[
                "breached these Terms;",
                "breached the Affiliate Terms;",
                "engaged in fraudulent conduct;",
                "misrepresented RROI;",
                "used misleading advertising;",
                "manipulated referrals or commissions; or",
                "acted in a manner that may harm RROI or its users.",
              ]}
            />

            <p style={styles.paragraph}>
              Further details are contained in the RROI Affiliate Terms.
            </p>
          </TermsSection>

          <TermsSection title="22. Acceptable Use">
            <p style={styles.paragraph}>
              Users must use the RROI platform lawfully and responsibly.
            </p>

            <p style={styles.paragraph}>Users must not:</p>

            <BulletList
              items={[
                "provide false or misleading information;",
                "impersonate another person;",
                "create profiles without appropriate authority;",
                "upload unlawful, defamatory or offensive content;",
                "interfere with the operation or security of the platform;",
                "attempt unauthorised access to systems or data;",
                "distribute malware, viruses or malicious software;",
                "copy or exploit the platform for unauthorised commercial purposes;",
                "misuse affiliate codes or referral systems;",
                "use automated tools to scrape or harvest information; or",
                "engage in activity that could damage the reputation, operation or security of RROI.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI may investigate suspected misuse and take appropriate action,
              including suspension or termination.
            </p>
          </TermsSection>

          <TermsSection title="23. Intellectual Property">
            <p style={styles.paragraph}>
              Intellectual property rights relating to the RROI platform remain
              the property of RROI (Pty) Ltd or its licensors.
            </p>

            <p style={styles.paragraph}>
              This includes, without limitation:
            </p>

            <BulletList
              items={[
                "the RROI name;",
                "logos and branding;",
                "artwork and the Riley mascot;",
                "website content;",
                "software and source code;",
                "databases;",
                "graphics and icons;",
                "product and QR-product designs;",
                "documentation;",
                "photographs; and",
                "other original materials.",
              ]}
            />

            <p style={styles.paragraph}>
              No intellectual-property rights are transferred to users except
              for the limited right to use the platform in accordance with these
              Terms.
            </p>

            <p style={styles.paragraph}>
              Users may not reproduce, copy, modify, distribute, publish,
              reverse engineer, sell or commercially exploit any part of the
              RROI platform without prior written permission from RROI.
            </p>
          </TermsSection>

          <TermsSection title="24. Third-Party Services and Service Availability">
            <p style={styles.paragraph}>
              RROI relies on third-party providers to operate parts of the
              platform. These providers may include hosting, authentication,
              database, payment, email-delivery, courier and application-store
              providers.
            </p>

            <p style={styles.paragraph}>
              RROI is not responsible for the independent acts, omissions,
              outages or policies of third-party providers.
            </p>

            <p style={styles.paragraph}>
              While RROI aims to provide a reliable service, it does not
              guarantee:
            </p>

            <BulletList
              items={[
                "uninterrupted availability;",
                "continuous operation;",
                "successful QR-code scanning;",
                "compatibility with every device or browser;",
                "continuous internet connectivity;",
                "continuous availability of third-party services; or",
                "error-free operation at all times.",
              ]}
            />

            <p style={styles.paragraph}>
              The platform may be temporarily unavailable because of
              maintenance, upgrades, security incidents, internet failures,
              power interruptions, third-party outages or other circumstances
              beyond RROI’s reasonable control.
            </p>

            <p style={styles.paragraph}>
              Users acknowledge that emergency access depends on factors outside
              RROI’s control, including internet availability, device
              functionality, browser compatibility and third-party
              infrastructure.
            </p>
          </TermsSection>

          <TermsSection title="25. Medical Disclaimer">
            <p style={styles.paragraph}>
              RROI is an emergency-information storage and retrieval platform
              designed to assist users by making selected emergency information
              available through a QR code or public profile.
            </p>

            <p style={styles.paragraph}>RROI is not:</p>

            <BulletList
              items={[
                "a medical device;",
                "a healthcare provider;",
                "an ambulance service;",
                "an emergency-dispatch service;",
                "a hospital;",
                "a medical practitioner;",
                "a pharmacy;",
                "a medical scheme;",
                "a health insurer; or",
                "a substitute for professional medical advice, diagnosis or treatment.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI does not verify medical information supplied by users and
              does not determine what treatment should be provided in an
              emergency.
            </p>

            <p style={styles.paragraph}>
              Healthcare professionals, emergency responders and other persons
              accessing a profile remain responsible for exercising their own
              professional judgement and complying with their legal and
              professional obligations.
            </p>

            <p style={styles.paragraph}>
              Users should never rely exclusively on an RROI profile when making
              medical or emergency decisions.
            </p>
          </TermsSection>

          <TermsSection title="26. Limitation of Liability">
            <p style={styles.paragraph}>
              To the fullest extent permitted by applicable law, RROI (Pty) Ltd,
              its directors, officers, employees, contractors, affiliates,
              licensors and service providers will not be liable for any
              indirect, incidental, consequential, special, exemplary or
              punitive loss, damage, expense, claim or liability arising from or
              relating to:
            </p>

            <BulletList
              items={[
                "inaccurate, incomplete or outdated information entered by users;",
                "failure by a user to update a profile;",
                "reliance on information contained in an emergency profile;",
                "inability to access a QR-linked profile;",
                "internet or mobile-network failures;",
                "electrical interruptions;",
                "browser incompatibility;",
                "device malfunction;",
                "QR-code damage or loss;",
                "third-party service interruptions;",
                "hosting failures;",
                "software defects;",
                "cyberattacks or unauthorised access;",
                "delayed access to information;",
                "emergency circumstances;",
                "medical-treatment decisions;",
                "delays in emergency response;",
                "loss of business or income;",
                "loss of data;",
                "reputational damage; or",
                "indirect or consequential loss.",
              ]}
            />

            <p style={styles.paragraph}>
              Nothing in these Terms excludes or limits liability where such
              exclusion or limitation is prohibited by applicable South African
              law.
            </p>
          </TermsSection>

          <TermsSection title="27. Indemnity">
            <p style={styles.paragraph}>
              To the extent permitted by law, you agree to indemnify, defend and
              hold harmless RROI (Pty) Ltd, its directors, officers, employees,
              contractors, licensors and service providers against claims,
              proceedings, damages, losses, liabilities, penalties, costs or
              expenses arising from or relating to:
            </p>

            <BulletList
              items={[
                "your use of the RROI platform;",
                "your breach of these Terms;",
                "information supplied by you;",
                "information supplied on behalf of another person;",
                "infringement of third-party rights;",
                "misuse of QR codes;",
                "misuse of affiliate codes;",
                "unlawful conduct;",
                "fraudulent activity; or",
                "an act or omission attributable to your account.",
              ]}
            />

            <p style={styles.paragraph}>
              This indemnity continues after an account has been suspended,
              terminated or deleted, to the extent permitted by law.
            </p>
          </TermsSection>

          <TermsSection title="28. Suspension and Termination">
            <p style={styles.paragraph}>
              RROI may suspend, restrict or terminate an account or service
              where it reasonably believes that:
            </p>

            <BulletList
              items={[
                "these Terms have been breached;",
                "fraudulent activity has occurred;",
                "false information has been submitted;",
                "unlawful activity has occurred;",
                "the platform has been abused;",
                "another person’s rights have been infringed;",
                "security has been compromised;",
                "continued access may expose RROI or users to unacceptable risk; or",
                "suspension or termination is required by law.",
              ]}
            />

            <p style={styles.paragraph}>
              Where reasonably practicable, RROI may notify the affected user
              before or after taking action.
            </p>

            <p style={styles.paragraph}>
              Termination does not affect obligations that survive termination,
              including payment obligations, indemnities, intellectual-property
              rights and legal claims.
            </p>
          </TermsSection>

          <TermsSection title="29. Force Majeure">
            <p style={styles.paragraph}>
              RROI will not be liable for delay, interruption or failure to
              perform obligations where the delay or failure results from
              circumstances beyond its reasonable control.
            </p>

            <p style={styles.paragraph}>
              These circumstances may include:
            </p>

            <BulletList
              items={[
                "natural disasters;",
                "floods, fires or severe weather;",
                "earthquakes;",
                "pandemics or epidemics;",
                "acts of terrorism;",
                "war or civil unrest;",
                "riots;",
                "strikes or labour disputes;",
                "governmental action;",
                "court orders;",
                "internet or telecommunications outages;",
                "electrical outages;",
                "cyberattacks or denial-of-service attacks;",
                "supplier failures;",
                "courier disruptions; or",
                "failures of third-party providers.",
              ]}
            />

            <p style={styles.paragraph}>
              RROI will make reasonable efforts to restore services as soon as
              reasonably practicable.
            </p>
          </TermsSection>

          <TermsSection title="30. Changes to the Platform and These Terms">
            <p style={styles.paragraph}>
              RROI continually develops and improves its services.
            </p>

            <p style={styles.paragraph}>RROI reserves the right to:</p>

            <BulletList
              items={[
                "add new features;",
                "remove existing features;",
                "modify subscriptions;",
                "change pricing;",
                "discontinue products;",
                "introduce new services;",
                "update technical requirements;",
                "modify QR products;",
                "update these Terms; and",
                "make other changes reasonably necessary for operation of the platform.",
              ]}
            />

            <p style={styles.paragraph}>
              Updated Terms become effective from the date published unless
              otherwise stated.
            </p>

            <p style={styles.paragraph}>
              Continued use after updated Terms take effect constitutes
              acceptance of those changes.
            </p>

            <p style={styles.paragraph}>
              Where required by law, RROI will provide additional notice or
              obtain consent before material changes become effective.
            </p>
          </TermsSection>

          <TermsSection title="31. Privacy">
            <p style={styles.paragraph}>
              The collection, use, storage and protection of personal
              information is governed by the RROI Privacy Policy.
            </p>

            <p style={styles.paragraph}>
              By using RROI, you acknowledge that personal information will be
              processed in accordance with:
            </p>

            <BulletList
              items={[
                "the RROI Privacy Policy;",
                "applicable South African legislation;",
                "the Protection of Personal Information Act; and",
                "other applicable legal requirements.",
              ]}
            />

            <p style={styles.paragraph}>
              The Privacy Policy forms an integral part of these Terms.
            </p>
          </TermsSection>

          <TermsSection title="32. Governing Law and Jurisdiction">
            <p style={styles.paragraph}>
              These Terms and disputes arising from or relating to the RROI
              platform are governed by the laws of the Republic of South Africa.
            </p>

            <p style={styles.paragraph}>
              Subject to mandatory consumer rights and statutory provisions, the
              appropriate courts of South Africa will have jurisdiction over
              disputes relating to these Terms or the RROI platform.
            </p>

            <p style={styles.paragraph}>
              Nothing in this clause limits rights users may have under
              applicable South African consumer legislation.
            </p>
          </TermsSection>

          <TermsSection title="33. Severability">
            <p style={styles.paragraph}>
              If a provision of these Terms is found by a court or competent
              authority to be unlawful, invalid or unenforceable, that provision
              will be interpreted to the minimum extent necessary to make it
              enforceable where legally possible.
            </p>

            <p style={styles.paragraph}>
              If that is not possible, the affected provision will be severed
              without affecting the validity or enforceability of the remaining
              provisions.
            </p>

            <p style={styles.paragraph}>
              The remaining provisions will continue in full force and effect.
            </p>
          </TermsSection>

          <TermsSection title="34. Entire Agreement">
            <p style={styles.paragraph}>
              These Terms, together with the following documents where
              applicable, constitute the entire agreement between RROI and the
              user regarding use of the platform:
            </p>

            <BulletList
              items={[
                "the Privacy Policy;",
                "the Refund Policy;",
                "the Affiliate Terms;",
                "additional policies published by RROI; and",
                "specific terms accepted during a purchase or subscription.",
              ]}
            />

            <p style={styles.paragraph}>
              These documents supersede prior representations, understandings or
              agreements relating to the same subject matter.
            </p>
          </TermsSection>

          <TermsSection title="35. Contact Information">
            <p style={styles.paragraph}>
              Questions regarding these Terms may be directed to:
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
              <br />
              Website:{" "}
              <a
                href="https://www.rroi.co.za"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                www.rroi.co.za
              </a>
            </div>

            <p style={styles.paragraph}>
              RROI will make reasonable efforts to respond to enquiries as soon
              as reasonably practicable.
            </p>
          </TermsSection>

          <PageBottomNav />
        </div>
      </section>
    </main>
  );
}

function TermsSection({
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

function Definition({ term, text }: { term: string; text: string }) {
  return (
    <p style={styles.paragraph}>
      <strong>{term}</strong> {text}
    </p>
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
    width: "100%",
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
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "10px 0 14px",
    paddingLeft: 22,
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
    maxWidth: "100%",
    boxSizing: "border-box",
    marginBottom: 14,
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
    display: "inline",
    maxWidth: "100%",
    color: BRAND_GREEN,
    fontWeight: 800,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    overflowWrap: "anywhere",
  },
};