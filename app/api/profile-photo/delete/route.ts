// app/api/profile-photo/delete/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdmin();

  await admin.storage
    .from("profile-photos")
    .remove([
      `${user.id}/profile.jpg`,
      `${user.id}/profile.png`,
      `${user.id}/profile.webp`,
    ]);

  await admin
    .from("profiles")
    .update({ profile_photo_url: null })
    .eq("user_id", user.id);

  return NextResponse.json({ success: true });
}