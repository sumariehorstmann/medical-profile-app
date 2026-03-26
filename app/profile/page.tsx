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

  return (
    <main style={{ padding: 40 }}>
      <h1>Profile</h1>

      <ProfileFormClient
        initial={profile}
        showUpgrade={!isPremium}
      />

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
          maxWidth: 500,
          background: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Subscription Status</h2>

        <p>
          <strong>Status:</strong> {subscription?.status ?? "free"}
        </p>

        <p>
          <strong>Plan:</strong> {subscription?.plan ?? "free"}
        </p>

        <p>
          <strong>Expires:</strong>{" "}
          {subscription?.current_period_end
            ? new Date(subscription.current_period_end).toLocaleDateString("en-ZA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "-"}
        </p>

        {!isPremium ? (
          <p style={{ marginTop: 12, color: "#666" }}>
            Upgrade to Premium to unlock full profile visibility and affiliate access.
          </p>
        ) : null}
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
          maxWidth: 500,
          background: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Affiliate</h2>

        {affiliate ? (
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
          </>
        ) : isPremium ? (
          <>
            <p style={{ color: "#666", marginBottom: 14 }}>
              You are eligible to become an affiliate.
            </p>

            <Link
              href="/affiliate/apply"
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #157A55",
                background: "#157A55",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Become an Affiliate
            </Link>
          </>
        ) : (
          <p style={{ color: "#666" }}>
            Only active Premium users can become affiliates.
          </p>
        )}
      </div>
    </main>
  );
}