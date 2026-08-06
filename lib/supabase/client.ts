import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === "undefined") {
            return [];
          }

          return document.cookie
            .split(";")
            .map((cookie) => cookie.trim())
            .filter(Boolean)
            .map((cookie) => {
              const separatorIndex = cookie.indexOf("=");

              const name =
                separatorIndex >= 0
                  ? cookie.slice(0, separatorIndex)
                  : cookie;

              const value =
                separatorIndex >= 0
                  ? cookie.slice(separatorIndex + 1)
                  : "";

              return {
                name,
                value: decodeURIComponent(value),
              };
            });
        },

        setAll(cookiesToSet) {
          if (typeof document === "undefined") {
            return;
          }

          const hostname = window.location.hostname.toLowerCase();

          const isRROIDomain =
            hostname === "rroi.co.za" ||
            hostname === "www.rroi.co.za" ||
            hostname.endsWith(".rroi.co.za");

          cookiesToSet.forEach(({ name, value, options }) => {
            const opts = options ?? {};

            let cookie = `${name}=${encodeURIComponent(value)}`;

            cookie += `; Path=/`;

            if (opts.maxAge !== undefined) {
              cookie += `; Max-Age=${opts.maxAge}`;
            }

            if (opts.expires) {
              cookie += `; Expires=${opts.expires.toUTCString()}`;
            }

            if (isRROIDomain) {
              cookie += `; Domain=.rroi.co.za`;
            } else if (opts.domain) {
              cookie += `; Domain=${opts.domain}`;
            }

            cookie += `; SameSite=${opts.sameSite ?? "lax"}`;

            if (
              window.location.protocol === "https:" ||
              opts.secure === true
            ) {
              cookie += `; Secure`;
            }

            document.cookie = cookie;
          });
        },
      },
    }
  );
}