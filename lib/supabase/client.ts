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

          cookiesToSet.forEach(({ name, value, options }) => {
            const opts = options ?? {};

            let cookie = `${name}=${encodeURIComponent(value)}`;

            cookie += `; Path=${opts.path ?? "/"}`;

            if (opts.maxAge !== undefined) {
              cookie += `; Max-Age=${opts.maxAge}`;
            }

            if (opts.expires) {
              cookie += `; Expires=${opts.expires.toUTCString()}`;
            }

            if (opts.sameSite) {
              cookie += `; SameSite=${opts.sameSite}`;
            }

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