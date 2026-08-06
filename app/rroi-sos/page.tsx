import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import RROISOSClient from "./RROISOSClient";

export default async function RROISOSPage() {
  const supabase = await createSupabaseServer();

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
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: 32,
  }}
>
  <Image
    src="/icons/rroi-sos-512.png"
    alt="RROI SOS"
    width={140}
    height={140}
    priority
    style={{
      objectFit: "contain",
    }}
  />
</div>

        <RROISOSClient
  isPremium={isPremium}
  hasHadPremium={Boolean(subscription?.current_period_end)}
  premiumExpiry={subscription?.current_period_end ?? null}
/>
      </div>
    </main>
  );
}