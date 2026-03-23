// app/profile/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
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

  return (
    <main style={{ padding: 40 }}>
      <h1>Profile</h1>
      <ProfileFormClient initial={profile} />

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
          maxWidth: 500,
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
      </div>
    </main>
  );
}