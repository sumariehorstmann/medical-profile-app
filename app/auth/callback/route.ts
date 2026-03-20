import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getSupabaseRouteClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;

  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") ?? "signup";

  const supabase = await getSupabaseRouteClient();

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    } else if (token_hash) {
      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });
      if (error) throw error;
    } else {
      return NextResponse.redirect(`${origin}/login?error=missing_code`);
    }

    return NextResponse.redirect(`${origin}/profile`);
  } catch (e: any) {
    const message = encodeURIComponent(e?.message ?? "auth_failed");
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback&message=${message}`
    );
  }
}