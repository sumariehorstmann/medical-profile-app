// app/profile/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import Link from "next/link";
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
          } catch {
            // Ignore cookie write errors during render
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, plan, current_period_end")
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

  const isAffiliate = !!affiliate;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Profile</h1>

        {!isPremium ? (
          <div style={styles.upgradeBanner}>
            <div style={styles.upgradeBannerTitle}>Upgrade to Premium</div>
            <p style={styles.upgradeBannerText}>
              Unlock your full medical profile visibility and get access to
              apply to become an RROI affiliate.
            </p>
            <Link href="/subscribe" style={styles.upgradeBtn}>
              Upgrade to Premium
            </Link>
          </div>
        ) : null}

        <ProfileFormClient initial={profile} showUpgrade={!isPremium} />

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
            {subscription?.current_period_end
              ? new Date(subscription.current_period_end).toLocaleDateString(
                  "en-ZA",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )
              : "-"}
          </p>

          {!isPremium ? (
            <p style={styles.mutedText}>
              Upgrade to Premium to unlock full profile visibility and affiliate
              access.
            </p>
          ) : null}
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
                <strong>Commission:</strong> 10% of base price
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
                <Link href="/subscribe" style={styles.secondaryBtn}>
                  Upgrade to Premium
                </Link>
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
    background: "#f8fafc",
    padding: 24,
  },
  container: {
    maxWidth: 820,
    margin: "0 auto",
  },
  h1: {
    margin: "0 0 20px",
    fontSize: 32,
    fontWeight: 900,
    color: "#0F172A",
  },
  h2: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: 800,
    color: "#0F172A",
  },
  card: {
    marginTop: 24,
    padding: 18,
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    maxWidth: 560,
    background: "#FFFFFF",
  },
  upgradeBanner: {
    marginBottom: 24,
    padding: 18,
    borderRadius: 14,
    border: "1px solid #BBF7D0",
    background: "#F0FDF4",
    maxWidth: 700,
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
    lineHeight: 1.55,
    fontSize: 15,
  },
  upgradeBtn: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #157A55",
    background: BRAND_GREEN,
    color: "#fff",
    textDecoration: "none",
    fontWeight: 800,
  },
  primaryBtn: {
    display: "inline-block",
    marginTop: 8,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #157A55",
    background: BRAND_GREEN,
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryBtn: {
    display: "inline-block",
    marginTop: 8,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #157A55",
    background: "#fff",
    color: BRAND_GREEN,
    textDecoration: "none",
    fontWeight: 700,
  },
  mutedText: {
    marginTop: 12,
    marginBottom: 14,
    color: "#666",
    lineHeight: 1.5,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 6,
  },
};