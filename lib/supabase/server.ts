import { cookies, headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

export async function createSupabaseServer() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const hostname =
    headerStore.get("host")?.split(":")[0].toLowerCase() ?? "";

  const isRROIDomain =
    hostname === "rroi.co.za" ||
    hostname === "www.rroi.co.za" ||
    hostname.endsWith(".rroi.co.za");

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                ...(isRROIDomain
                  ? { domain: ".rroi.co.za" }
                  : {}),
                path: "/",
                sameSite: options?.sameSite ?? "lax",
                secure:
                  isRROIDomain ||
                  options?.secure === true,
              });
            });
          } catch {
            // Server Components cannot always write cookies.
            // Middleware will handle session refreshes.
          }
        },
      },
    }
  );
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);