import { createClient } from "@supabase/supabase-js";

export async function generateAffiliateCode(): Promise<string> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("affiliates")
    .select("affiliate_code")
    .not("affiliate_code", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  let nextNumber = 1;

  if (data?.affiliate_code) {
    const numericPart = data.affiliate_code.replace(/^RROI/, "");
    const parsed = parseInt(numericPart, 10);

    if (!Number.isNaN(parsed)) {
      nextNumber = parsed + 1;
    }
  }

  return `RROI${String(nextNumber).padStart(4, "0")}`;
}