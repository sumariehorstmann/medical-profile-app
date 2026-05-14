// app/profile/page.tsx

import DownloadQRWallpaper from "@/components/DownloadQRWallpaper";
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
    .maybeSingle();

  const { data: affiliate } = await supabase
    .from("affiliates")
    .select("affiliate_code, status, total_earned, total_paid")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPremium =
    subscription?.status === "active" &&
    !!subscription?.current_period_end &&
    new Date(subscription.current_period_end).getTime() > Date.now();
const hasHadPremium =
  subscription?.plan === "premium" ||
  (subscription?.current_period_end &&
    new Date(subscription.current_period_end).getTime() < Date.now());
  const isAffiliate = !!affiliate;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <PageHeader />

        <h1 style={styles.h1}>Profile</h1>

        <div style={styles.cardWide}>
          <h2 style={styles.h2}>How RROI works</h2>
          <ul style={styles.list}>
            <li>Section 1 is visible when your QR is scanned on the Free plan</li>
            <li>You can complete and save your full profile on the Free plan</li>
            <li>
              Premium unlocks full public profile visibility when your QR is
              scanned
            </li>
          </ul>
        </div>

        {!isPremium && (
          <div style={styles.upgradeBanner}>
            <div style={styles.upgradeBannerTitle}>Upgrade to Premium</div>
            <p style={styles.upgradeBannerText}>
              Your full profile can be completed and saved now. Upgrade when you
              want your full medical profile to be visible when your QR code is
              scanned.
            </p>
            {!isPremium && !hasHadPremium && (
  <Link href="/subscribe/order" style={styles.upgradeBtn}>
    Get Premium Kit - R399
  </Link>
)}
{!hasHadPremium && (
  <div style={styles.premiumIncludes}>
    <p style={styles.includesTitle}>Premium Kit includes:</p>
    <ul style={styles.includesList}>
      <li>1-year RROI Premium subscription</li>
      <li>2 physical QR code items</li>
      <li>Free nationwide delivery</li>
    </ul>

    <Link
      href="/premium-kit"
      style={{ ...styles.viewKitLink, marginTop: 8, display: "inline-block" }}
    >
      See what's in the Premium Kit →
    </Link>
  </div>
)}

{!isPremium && hasHadPremium && (
  <Link href="/renew" style={styles.upgradeBtn}>
    Renew Premium - R99/year
  </Link>
)}
          </div>
        )}

        <ProfileFormClient initial={profile} showUpgrade={false} />
{true && (
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
    : "Upgrade your profile for full public medical profile visibility when your QR code is scanned."}
</p>

    <div style={styles.upgradeOptionGrid}>
      <div style={styles.upgradeOptionCard}>
        <h3 style={styles.upgradeOptionHeading}>
  {isPremium
    ? "Renew Premium Subscription Only"
    : "Premium Subscription Only"}
</h3>
        <div style={styles.upgradeOptionPrice}>R99/year</div>

        <p style={styles.upgradeOptionDescription}>
          Upgrade your profile to Premium visibility. No physical QR products are included.
          Your free downloadable QR lock screen remains available.
        </p>

        <Link href="/renew" style={styles.secondaryBtn}>
          {isPremium
  ? "Renew Premium - R99"
  : "Upgrade to Premium - R99"}
        </Link>
      </div>

      <div style={styles.upgradeOptionCard}>
        <h3 style={styles.upgradeOptionHeading}>
  {isPremium
    ? "Renew Premium Full Kit"
    : "Premium Full Kit"}
</h3>
        <div style={styles.upgradeOptionPrice}>R399</div>

        <p style={styles.upgradeOptionDescription}>
          Includes 1 year Premium subscription, 2 engraved physical QR products,
          and free nationwide delivery.
        </p>

        <Link href="/subscribe/order" style={styles.upgradeBtn}>
          {isPremium
  ? "Renew Premium Full Kit"
  : "Upgrade to Premium Full Kit"}
        </Link>

        <Link href="/premium-kit" style={styles.viewKitLink}>
          View Premium Kit →
        </Link>
      </div>
    </div>
  </div>
)}
        {profile?.public_id && (
          <div style={styles.downloadBlock}>
            <DownloadQRWallpaper
              publicId={profile.public_id}
              firstName={profile.first_name}
            />
          </div>
        )}

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
                <strong>Commission:</strong> 8% of base price
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
              <p style={styles.mutedText}>
                As an active Premium subscriber, you can apply to become an
                affiliate.
              </p>

              <div style={styles.buttonRow}>
                <Link href="/affiliate/apply" style={styles.primaryBtn}>
                  Apply to Become an Affiliate
                </Link>
              </div>
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
      </div>
    </main>
  );
}

const BRAND_GREEN = "#157A55";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: 24,
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
  },
  premiumIncludes: {
  marginTop: 12,
},

includesTitle: {
  fontWeight: 800,
  fontSize: 14,
  margin: "0 0 6px",
  color: "#065F46",
},

includesList: {
  margin: 0,
  paddingLeft: 18,
  fontSize: 14,
  color: "#374151",
  lineHeight: 1.5,
},
  h1: {
    margin: "0 0 20px",
    fontSize: 34,
    fontWeight: 900,
    color: "#0F172A",
  },
  h2: {
    margin: "0 0 12px",
    fontSize: 22,
    fontWeight: 800,
    color: "#0F172A",
  },
  card: {
    marginTop: 24,
    padding: 18,
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    background: "#FFFFFF",
  },
  cardWide: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    lineHeight: 1.7,
    color: "#374151",
  },
  upgradeBanner: {
    marginBottom: 24,
    padding: 18,
    borderRadius: 14,
    border: "1px solid #BBF7D0",
    background: "#F0FDF4",
  },
  upgradeBannerTitle: {
    fontSize: 22,
    fontWeight: 900,
    color: "#166534",
    marginBottom: 8,
  },
  upgradeBannerText: {
    margin: "0 0 14px",
    color: "#166534",
    fontSize: 15,
    lineHeight: 1.6,
  },
  upgradeBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 10,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
  },
  downloadBlock: {
    marginTop: 20,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 10,
    background: BRAND_GREEN,
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #157A55",
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 700,
    background: "#FFFFFF",
  },
  mutedText: {
    marginTop: 10,
    color: "#475569",
    lineHeight: 1.6,
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  upgradeOptions: {
  marginTop: 24,
  marginBottom: 24,
  padding: 22,
  borderRadius: 16,
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
},

upgradeOptionsTitle: {
  margin: "0 0 8px",
  fontSize: 26,
  fontWeight: 900,
  color: "#0F172A",
},

upgradeOptionsText: {
  margin: "0 0 20px",
  fontSize: 15,
  lineHeight: 1.6,
  color: "#475569",
},

upgradeOptionGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
},

upgradeOptionCard: {
  padding: 20,
  borderRadius: 14,
  border: "1px solid #D1FAE5",
  background: "#F0FDF4",
},

upgradeOptionHeading: {
  margin: "0 0 8px",
  fontSize: 20,
  fontWeight: 900,
  color: "#0F172A",
},

upgradeOptionPrice: {
  marginBottom: 12,
  fontSize: 30,
  fontWeight: 900,
  color: BRAND_GREEN,
},

upgradeOptionDescription: {
  margin: "0 0 18px",
  fontSize: 14,
  lineHeight: 1.7,
  color: "#475569",
},

viewKitLink: {
  display: "inline-block",
  marginTop: 12,
  color: BRAND_GREEN,
  fontWeight: 700,
  textDecoration: "none",
},
};