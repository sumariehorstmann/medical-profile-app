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

  // Get logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → login page
  if (!user) {
    redirect("/login");
  }

  // Load user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <main style={{ padding: 40 }}>
      <h1>Profile</h1>
      <ProfileFormClient initial={profile} />
    </main>
  );
}