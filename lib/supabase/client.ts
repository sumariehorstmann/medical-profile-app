import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === "undefined") return [];
          return document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter(Boolean)
            .map((c) => {
              const eq = c.indexOf("=");
              const name = eq >= 0 ? c.slice(0, eq) : c;
              const value = eq >= 0 ? c.slice(eq + 1) : "";
              return { name, value: decodeURIComponent(value) };
            });
        },
        setAll(cookiesToSet) {
  if (typeof document === "undefined") return;

  const isRROIDomain =
    window.location.hostname === "rroi.co.za" ||
    window.location.hostname.endsWith(".rroi.co.za");

  cookiesToSet.forEach(({ name, value, options }) => {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    const opts = options ?? {};

    cookie += `; Path=${opts.path ?? "/"}`;

    if (opts.maxAge !== undefined) {
      cookie += `; Max-Age=${opts.maxAge}`;
    }

    if (opts.expires) {
      cookie += `; Expires=${opts.expires.toUTCString()}`;
    }

    if (isRROIDomain) {
      cookie += `; Domain=.rroi.co.za`;
    }

    cookie += `; SameSite=${opts.sameSite ?? "lax"}`;

    if (window.location.protocol === "https:") {
      cookie += `; Secure`;
    }

    document.cookie = cookie;
  });
},
      },
    }
  );
}
