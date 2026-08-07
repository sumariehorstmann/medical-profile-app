import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const hostname =
    req.headers.get("host")?.split(":")[0].toLowerCase() ?? "";

  const path = req.nextUrl.pathname;

  const isSOSDomain =
    hostname === "sos.rroi.co.za" ||
    hostname === "www.sos.rroi.co.za";

  /*
   * https://sos.rroi.co.za/
   * is internally served by /rroi-sos.
   * The browser address remains sos.rroi.co.za.
   */
  const shouldRewriteToSOS =
    isSOSDomain && path === "/";

  let res: NextResponse;

  if (shouldRewriteToSOS) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = "/rroi-sos";

    res = NextResponse.rewrite(rewriteUrl);
  } else {
    res = NextResponse.next();
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);

            res.cookies.set(name, value, {
              ...options,
              path: options?.path ?? "/",
              sameSite: options?.sameSite ?? "lax",
              secure: req.nextUrl.protocol === "https:",
            });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const needsAuth =
    path.startsWith("/profile") ||
    path.startsWith("/subscribe/pay") ||
    path.startsWith("/rroi-sos") ||
    shouldRewriteToSOS;

  if (needsAuth && !user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";

    loginUrl.searchParams.set(
      "next",
      shouldRewriteToSOS ? "/" : path
    );

    const redirectResponse =
      NextResponse.redirect(loginUrl);

    res.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/subscribe/pay",
    "/rroi-sos/:path*",
  ],
};