import { createSupabaseServer } from "@/lib/supabase/server";

export async function getSubscriptionStatus() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, active: false as const };

  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  const active = data?.status === "active";
  return { user, active };
}
