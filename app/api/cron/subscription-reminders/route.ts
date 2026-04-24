import { sendRenewalEmail } from "@/app/lib/email/sendRenewalEmail";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const today = new Date();

  const in30Days = new Date();
  in30Days.setDate(today.getDate() + 30);

  const in7Days = new Date();
  in7Days.setDate(today.getDate() + 7);

  // --- 30 day reminder ---
  const { data: subs30 } = await supabase
    .from("subscriptions")
    .select("id, user_id, expires_at")
    .eq("renewal_30_email_sent", false);

  // --- 7 day reminder ---
  const { data: subs7 } = await supabase
    .from("subscriptions")
    .select("id, user_id, expires_at")
    .eq("renewal_7_email_sent", false);

  // Filter manually (date matching)
  const toSend30 =
    subs30?.filter((s) => {
      const exp = new Date(s.expires_at);
      return exp.toDateString() === in30Days.toDateString();
    }) || [];

  const toSend7 =
    subs7?.filter((s) => {
      const exp = new Date(s.expires_at);
      return exp.toDateString() === in7Days.toDateString();
    }) || [];

  // --- Send emails (placeholder for now) ---
  for (const sub of toSend30) {
    const { data: profile } = await supabase
  .from("profiles")
  .select("email, first_name")
  .eq("id", sub.user_id)
  .single();

if (!profile?.email) continue;

await sendRenewalEmail({
  to: profile.email,
  firstName: profile.first_name,
  daysLeft: 30,
});

    await supabase
      .from("subscriptions")
      .update({
        renewal_30_email_sent: true,
        last_renewal_reminder_sent_at: new Date(),
      })
      .eq("id", sub.id);
  }

  for (const sub of toSend7) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, first_name")
    .eq("id", sub.user_id)
    .single();

  if (!profile?.email) continue;

  await sendRenewalEmail({
    to: profile.email,
    firstName: profile.first_name,
    daysLeft: 7,
  });
}

  return NextResponse.json({
    success: true,
    sent30: toSend30.length,
    sent7: toSend7.length,
  });
}