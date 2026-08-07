import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);

    const hostname = requestUrl.hostname.toLowerCase();

    const isMainRROIDomain =
      hostname === "www.rroi.co.za" ||
      hostname === "rroi.co.za" ||
      hostname === "localhost";

    if (!isMainRROIDomain) {
      return NextResponse.json(
        {
          error: "Invalid RROI handoff origin.",
        },
        {
          status: 403,
        }
      );
    }

    const authorization =
      request.headers.get("authorization");

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        {
          error: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken =
      authorization.slice("Bearer ".length).trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Verify the logged-in RROI user's Supabase token.
     * Never trust an email/user ID supplied by the browser.
     */
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user || !user.email) {
      console.error(
        "RROI SOS handoff user verification failed:",
        userError
      );

      return NextResponse.json(
        {
          error: "Your RROI session is no longer valid. Please log in again.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Generate a one-time authentication link for the
     * verified user. No email is sent.
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

    if (
      error ||
      !data?.properties?.action_link
    ) {
      console.error(
        "Unable to create RROI SOS handoff:",
        error
      );

      return NextResponse.json(
        {
          error:
            "RROI SOS could not be opened right now. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      url: data.properties.action_link,
    });
  } catch (error) {
    console.error(
      "RROI SOS handoff error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "RROI SOS could not be opened right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}