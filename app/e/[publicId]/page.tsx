import { createClient } from "@/lib/supabase/server";
import PublicPageClient from "./PublicPageClient";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("medical_profiles")
    .select(
  "first_name,last_name,id_number,medical_aid_number,medical_aid_company,allergies,medical_history,blood_type,nok_name,nok_phone"
)

    .eq("public_id", publicId)
    .single();

  if (error || !data) return notFound();

  return <PublicPageClient profile={data} />;
}
