// app/profile/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProfileFormClient from "./ProfileFormClient";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: subscription } = await supabase
  .from("subscriptions")
  .select("status, plan, current_period_start, current_period_end")
  .eq("user_id", user.id)
  .order("current_period_end", { ascending: false })
  .limit(1)
  .single();

  const { data: affiliate } = await supabase
    .from("affiliates")
    .select("affiliate_code, status, total_earned, total_paid")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPremium =
  subscription?.status === "active" &&
  (!subscription?.current_period_end ||
    new Date(subscription.current_period_end).getTime() > Date.now());
const hasHadPremium =
  subscription?.plan === "premium" ||
  (subscription?.current_period_end &&
    new Date(subscription.current_period_end).getTime() < Date.now());
  const isAffiliate = !!affiliate;
const premiumOptionsSection = (
  <div style={styles.upgradeOptions}>
    <h2 style={styles.upgradeOptionsTitle}>
      {isPremium
        ? "Renew or extend your Premium"
        : "Choose your Premium option"}
    </h2>

    <p style={styles.upgradeOptionsText}>
      {isPremium && subscription?.current_period_end
        ? `Your Premium profile is active until ${new Date(
            subscription.current_period_end
          ).toLocaleDateString("en-ZA", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}. You can renew before expiry to extend your Premium access for another year.`
        : "Choose between the R129 annual Premium Subscription or the R499 RROI Premium Kit Bundle."}
    </p>

    <div style={styles.upgradeOptionGrid}>
      <div style={styles.upgradeOptionCard}>
        <h3 style={styles.upgradeOptionHeading}>
          {isPremium
            ? "Renew Premium Subscription Only"
            : "Premium Subscription Only"}
        </h3>

        <div style={styles.upgradeOptionPrice}>R129/year</div>

        <p style={styles.upgradeOptionDescription}>
          Full Premium Emergency Profile visibility. No physical QR products
          are included. QR phone lock screen and smartwatch wallpapers are
          included.
        </p>

        <Link href="/renew" style={styles.secondaryBtn}>
          {isPremium
            ? "Renew Premium - R129"
            : "Upgrade to Premium - R129"}
        </Link>
      </div>

      <div style={styles.upgradeOptionCard}>
        <h3 style={styles.upgradeOptionHeading}>
          {isPremium
  ? "Renew RROI Premium Kit Bundle"
  : "RROI Premium Kit Bundle"}
        </h3>

        <div style={styles.upgradeOptionPrice}>R499</div>

        <p style={styles.upgradeOptionDescription}>
          Includes a 1-year Premium subscription, an Engraved Metal QR Card,
          an Engraved Metal QR Tag, a Pack of 5 Splash-Proof QR Stickers,
          QR wallpapers and free nationwide delivery.
        </p>

        <Link href="/subscribe/order" style={styles.upgradeBtn}>
          {isPremium
  ? "Renew RROI Premium Kit Bundle"
  : "Get Premium Kit Bundle - R499"}
        </Link>

        <Link href="/premium-kit" style={styles.viewKitLink}>
          View Premium Kit Bundle →
        </Link>
      </div>
    </div>
  </div>
);
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <PageHeader />

        <h1 style={styles.h1}>Profile</h1>

        <div style={styles.cardWide}>
          <h2 style={styles.h2}>How RROI works</h2>
          <ul style={styles.list}>
  <li>
    <strong>Free Profile:</strong> Section 1 is visible when your QR code is scanned.
  </li>

  <li>
    <strong>Premium Profile:</strong> All Sections (1–7) are visible on your public emergency profile.
  </li>

  <li>
    Only information that you complete in your profile will appear on your public profile.
  </li>
</ul>
        </div>

        {!isPremium && premiumOptionsSection}

<ProfileFormClient initial={profile} showUpgrade={false} />


        <div style={styles.card}>
          <h2 style={styles.h2}>Subscription Status</h2>

          <p>
            <strong>Status:</strong> {subscription?.status ?? "free"}
          </p>
          <p>
            <strong>Plan:</strong> {subscription?.plan ?? "free"}
          </p>
          <p>
            <strong>Expires:</strong>{" "}
{isPremium && subscription?.current_period_end
  ? new Date(subscription.current_period_end).toLocaleDateString("en-ZA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : "-"}
          </p>

          {!isPremium && (
            <p style={styles.mutedText}>
              On the Free plan, only Section 1 is publicly visible when your QR
              code is scanned.
            </p>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Affiliate</h2>

          {isAffiliate ? (
            <>
              <p>
                <strong>Status:</strong> {affiliate.status}
              </p>
              <p>
                <strong>Your Code:</strong> {affiliate.affiliate_code}
              </p>
              <p>
                <strong>Commission:</strong> R30 of base price
              </p>
              <p>
                <strong>Total Earned:</strong> R
                {Number(affiliate.total_earned ?? 0).toFixed(2)}
              </p>
              <p>
                <strong>Total Paid:</strong> R
                {Number(affiliate.total_paid ?? 0).toFixed(2)}
              </p>

              <div style={styles.buttonRow}>
                <Link href="/affiliate/dashboard" style={styles.primaryBtn}>
                  Go to Affiliate Dashboard
                </Link>
              </div>
            </>
                    ) : isPremium ? (
            <>
              <div style={styles.buttonRow}>
                <Link href="/affiliate/apply" style={styles.primaryBtn}>
                  Apply to Become an Affiliate
                </Link>
              </div>

              <p style={styles.mutedText}>
                Apply to become an affiliate by invitation only.
              </p>
            </>
          ) : (
            <>
              <p style={styles.mutedText}>
                Only active Premium users can become affiliates.
              </p>

              <div style={styles.buttonRow}>
                
              </div>
            </>
          )}
        </div>

        {isPremium && premiumOptionsSection}

        <div style={styles.storeSection}>
  <div style={styles.storeCard}>
    <div>
      <h2 style={styles.storeTitle}>
        RROI Online Store
      </h2>

      <p style={styles.storeText}>
        Order additional RROI QR Cards, QR Tags and QR Stickers linked to
        your RROI Emergency Profile from our Online Store.
      </p>
    </div>

    <Link href="/store" style={styles.storeButton}>
      Online Store
    </Link>
  </div>
</div>

      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 20px) 56px",
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

  h1: {
    margin: "0 0 20px",
    maxWidth: "100%",
    fontSize: "clamp(30px, 6vw, 36px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: "#0F172A",
    overflowWrap: "break-word",
  },

  h2: {
    margin: "0 0 12px",
    maxWidth: "100%",
    fontSize: "clamp(19px, 4vw, 22px)",
    lineHeight: 1.3,
    fontWeight: 800,
    color: "#0F172A",
    overflowWrap: "break-word",
  },

  card: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    marginTop: 24,
    padding: "clamp(16px, 3vw, 20px)",
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    background: "#FFFFFF",
  },

  cardWide: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    marginBottom: 24,
    padding: "clamp(16px, 3vw, 20px)",
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
  },

  list: {
    width: "100%",
    maxWidth: "100%",
    margin: 0,
    paddingLeft: 22,
    boxSizing: "border-box",
    fontSize: 15,
    lineHeight: 1.75,
    color: "#374151",
    overflowWrap: "break-word",
  },

  mutedText: {
    margin: "10px 0 0",
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.65,
    color: "#475569",
    overflowWrap: "break-word",
  },

  buttonRow: {
    width: "100%",
    display: "flex",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  primaryBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 360,
    minHeight: 48,
    padding: "12px 16px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 800,
    overflowWrap: "break-word",
  },

  secondaryBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 360,
    minHeight: 48,
    padding: "12px 16px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 12,
    border: `1px solid ${BRAND_GREEN}`,
    color: BRAND_GREEN,
    textDecoration: "none",
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 800,
    background: "#FFFFFF",
    overflowWrap: "break-word",
  },

  upgradeBtn: {
    display: "flex",
    width: "100%",
    maxWidth: 360,
    minHeight: 48,
    padding: "12px 16px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 12,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 800,
    overflowWrap: "break-word",
  },

  upgradeOptions: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    marginTop: 24,
    marginBottom: 24,
    padding: "clamp(16px, 4vw, 24px)",
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: 18,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
  },

  upgradeOptionsTitle: {
    margin: "0 0 8px",
    maxWidth: "100%",
    fontSize: "clamp(22px, 5vw, 28px)",
    lineHeight: 1.2,
    fontWeight: 900,
    color: "#0F172A",
    overflowWrap: "break-word",
  },

  upgradeOptionsText: {
    margin: "0 0 20px",
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#475569",
    overflowWrap: "break-word",
  },

  upgradeOptionGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: 16,
    boxSizing: "border-box",
  },

  upgradeOptionCard: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    padding: "clamp(16px, 3vw, 20px)",
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: 14,
    border: "1px solid #D1FAE5",
    background: "#F0FDF4",
  },

  upgradeOptionHeading: {
    margin: "0 0 8px",
    maxWidth: "100%",
    fontSize: "clamp(18px, 4vw, 20px)",
    lineHeight: 1.3,
    fontWeight: 900,
    color: "#0F172A",
    overflowWrap: "break-word",
  },

  upgradeOptionPrice: {
    marginBottom: 12,
    maxWidth: "100%",
    fontSize: "clamp(26px, 6vw, 32px)",
    lineHeight: 1.15,
    fontWeight: 900,
    color: BRAND_GREEN,
    overflowWrap: "break-word",
  },

  upgradeOptionDescription: {
    margin: "0 0 18px",
    maxWidth: "100%",
    fontSize: 14,
    lineHeight: 1.7,
    color: "#475569",
    overflowWrap: "break-word",
  },

  viewKitLink: {
    display: "inline-block",
    maxWidth: "100%",
    marginTop: 12,
    color: BRAND_GREEN,
    fontSize: 15,
    lineHeight: 1.5,
    fontWeight: 700,
    textDecoration: "underline",
    textUnderlineOffset: 2,
    overflowWrap: "anywhere",
  },

  storeSection: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    marginTop: 24,
    marginBottom: 24,
    boxSizing: "border-box",
  },

  storeCard: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    padding: "clamp(18px, 4vw, 26px)",
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    borderRadius: 24,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 22,
    flexWrap: "wrap",
  },

  storeTitle: {
    margin: "0 0 10px",
    maxWidth: "100%",
    fontSize: "clamp(24px, 5vw, 34px)",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    fontWeight: 900,
    color: "#0F172A",
    overflowWrap: "break-word",
  },

  storeText: {
    margin: 0,
    width: "100%",
    maxWidth: 660,
    fontSize: "clamp(15px, 2.5vw, 17px)",
    lineHeight: 1.65,
    color: "#334155",
    overflowWrap: "break-word",
  },

  storeButton: {
    display: "flex",
    width: "100%",
    maxWidth: 280,
    minHeight: 52,
    padding: "14px 22px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 15,
    border: `1px solid ${BRAND_GREEN}`,
    background: "#FFFFFF",
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
    lineHeight: 1.4,
  },
};
