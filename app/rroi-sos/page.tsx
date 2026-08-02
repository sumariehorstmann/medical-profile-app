import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import PageHeader from "@/components/PageHeader";
import RROISOSClient from "./RROISOSClient";

export default async function RROISOSPage() {
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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .single();

  const isPremium =
    subscription?.status === "active" &&
    (!subscription?.current_period_end ||
      new Date(subscription.current_period_end).getTime() > Date.now());

  return (
    <main
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <PageHeader />

        <RROISOSClient
  isPremium={isPremium}
  hasHadPremium={Boolean(subscription?.current_period_end)}
  premiumExpiry={subscription?.current_period_end ?? null}
/>
      </div>
    </main>
  );
}