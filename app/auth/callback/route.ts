import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getSupabaseRouteClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                path: options?.path ?? "/",
                sameSite:
                  options?.sameSite ?? "lax",
                secure:
                  options?.secure ?? true,
              });
            }
          );
        },
      },
    }
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;

  const code = url.searchParams.get("code");
  const tokenHash =
    url.searchParams.get("token_hash");

  const type =
    url.searchParams.get("type") ?? "signup";

  const handoff =
    url.searchParams.get("handoff");

  const next =
    url.searchParams.get("next");

  const isSOSDomain =
    url.hostname === "sos.rroi.co.za" ||
    url.hostname === "www.sos.rroi.co.za";

  const supabase =
    await getSupabaseRouteClient();

  try {
    if (code) {
      const { error } =
        await supabase.auth.exchangeCodeForSession(
          code
        );

      if (error) {
        throw error;
      }
    } else if (tokenHash) {
      const { error } =
        await supabase.auth.verifyOtp({
          type: type as any,
          token_hash: tokenHash,
        });

      if (error) {
        throw error;
      }
    } else {
      return NextResponse.redirect(
        `${origin}/login?error=missing_code`
      );
    }

    /*
     * Any successful authentication callback
     * taking place on the SOS domain must open
     * the SOS dashboard.
     */
    if (
      isSOSDomain ||
      handoff === "sos"
    ) {
      return NextResponse.redirect(
        `${origin}/`
      );
    }

    /*
     * Normal RROI email verification.
     */
    if (
      type === "signup" ||
      type === "email"
    ) {
      return NextResponse.redirect(
        `${origin}/login?verified=true`
      );
    }

    const safeNext =
      next && next.startsWith("/")
        ? next
        : "/profile";

    return NextResponse.redirect(
      `${origin}${safeNext}`
    );
  } catch (error: any) {
  console.error(
    "Auth callback failed:",
    error
  );

  /*
   * Installed PWAs can occasionally trigger the SOS callback
   * more than once.
   *
   * The first request may already have successfully consumed
   * the one-time token and created the SOS session.
   *
   * If a duplicate request then reports that the email link is
   * invalid, send it to the SOS root instead of showing login.
   *
   * Middleware will make the final decision:
   * - valid SOS session -> open RROI SOS
   * - no valid session -> redirect to /login?next=/
   */
  if (handoff === "sos" || isSOSDomain) {
    return NextResponse.redirect(
      `${origin}/`
    );
  }

  const message = encodeURIComponent(
    error?.message ?? "auth_failed"
  );

  return NextResponse.redirect(
    `${origin}/login?error=auth_failed&message=${message}`
  );
}
}