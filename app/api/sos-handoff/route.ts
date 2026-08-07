import { NextResponse } from "next/server";
import { createSupabaseServer, supabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);

    const hostname = requestUrl.hostname.toLowerCase();

    // This handoff must only start from the main RROI website.
    const isMainRROIDomain =
      hostname === "www.rroi.co.za" ||
      hostname === "rroi.co.za" ||
      hostname === "localhost";

    if (!isMainRROIDomain) {
      return NextResponse.redirect(
        new URL("https://www.rroi.co.za/login")
      );
    }

    const supabase = await createSupabaseServer();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.email) {
      const loginUrl = new URL(
        "/login",
        requestUrl.origin
      );

      loginUrl.searchParams.set(
        "next",
        "/api/sos-handoff"
      );

      return NextResponse.redirect(loginUrl);
    }

    /*
     * Create a secure one-time Supabase authentication link.
     *
     * No email is sent.
     *
     * The link signs this already-authenticated RROI user
     * into the SOS subdomain and then sends them through
     * the existing auth callback.
     */
    const { data, error } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: user.email,
        options: {
          redirectTo:
  "https://sos.rroi.co.za/auth/callback?next=/&handoff=sos",
        },
      });

    if (error || !data?.properties?.action_link) {
      console.error(
        "Unable to create RROI SOS handoff:",
        error
      );

      return NextResponse.redirect(
        new URL(
          "/profile?sos_error=handoff",
          requestUrl.origin
        )
      );
    }

    return NextResponse.redirect(
      data.properties.action_link
    );
  } catch (error) {
    console.error(
      "RROI SOS handoff error:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/profile?sos_error=handoff",
        "https://www.rroi.co.za"
      )
    );
  }
}