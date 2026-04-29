import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function normalizeString(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // no-op
          },
        },
      }
    );

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // TEMPORARY ADMIN CHECK
    // Replace this with your real admin email.
    const adminEmails = [
  "sumariehorstmann@gmail.com",
  "support@rroi.co.za",
];
    const userEmail = String(user.email || "").toLowerCase();

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const applicationId = normalizeString(body?.applicationId);
    const reviewNotes = normalizeString(body?.reviewNotes);

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    const { data: application, error: applicationError } = await supabaseAdmin
  .from("affiliate_applications")
  .select("id, status, email, full_name")
  .eq("id", applicationId)
  .maybeSingle();

    if (applicationError) {
      console.error("APPLICATION LOOKUP ERROR:", applicationError);
      return NextResponse.json(
        { error: "Failed to load affiliate application." },
        { status: 500 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: "Affiliate application not found." },
        { status: 404 }
      );
    }

    if (String(application.status || "").toLowerCase() === "approved") {
      return NextResponse.json(
        { error: "Approved applications cannot be declined here." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { error: declineError } = await supabaseAdmin
      .from("affiliate_applications")
      .update({
        status: "rejected",
        reviewed_at: now,
        review_notes: reviewNotes || null,
        updated_at: now,
      })
      .eq("id", application.id);

    if (declineError) {
      console.error("APPLICATION DECLINE ERROR:", declineError);
      return NextResponse.json(
        { error: "Failed to decline affiliate application." },
        { status: 500 }
      );
    }
try {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: application.email,
      subject: "RROI Affiliate Application Update",
      html: `
        <h2>Application Update</h2>
        <p>Hi ${application.full_name},</p>
        <p>Thank you for applying to the RROI affiliate program.</p>
        <p>Unfortunately, your application was not approved at this time.</p>
        <p>You are welcome to contact us if you would like feedback.</p>
        <br/>
        <p>— RROI Team</p>
      `,
    }),
  });
} catch (emailError) {
  console.error("EMAIL SEND ERROR (DECLINED):", emailError);
}
    return NextResponse.json({
      success: true,
      message: "Affiliate application declined successfully.",
    });
  } catch (err) {
    console.error("AFFILIATE DECLINE ERROR:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}