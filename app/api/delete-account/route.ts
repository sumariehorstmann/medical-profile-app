import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, confirmText } = body;

    if (confirmText !== "DELETE") {
      return NextResponse.json(
        { error: "Invalid confirmation text" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // no-op in route handler
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400 }
      );
    }

    const { error: passwordCheckError } =
      await supabase.auth.signInWithPassword({
        email: user.email!,
        password,
      });

    if (passwordCheckError) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 401 }
      );
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Look up affiliate row
    const { data: affiliateRow, error: affiliateLookupError } = await admin
      .from("affiliates")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (affiliateLookupError) {
      return NextResponse.json(
        { error: "Failed to look up affiliate record" },
        { status: 500 }
      );
    }

    // Look up profile row
    const { data: profileRow, error: profileLookupError } = await admin
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileLookupError) {
      return NextResponse.json(
        { error: "Failed to look up profile record" },
        { status: 500 }
      );
    }

    // Delete affiliate referral rows where this user was the referred customer
    const { error: referralUserDeleteError } = await admin
      .from("affiliate_referrals")
      .delete()
      .eq("user_id", user.id);

    if (referralUserDeleteError) {
      return NextResponse.json(
        { error: "Failed to delete from affiliate_referrals" },
        { status: 500 }
      );
    }

    // Delete affiliate referral rows linked to this user's affiliate account
    if (affiliateRow?.id) {
      const { error: referralAffiliateDeleteError } = await admin
        .from("affiliate_referrals")
        .delete()
        .eq("affiliate_id", affiliateRow.id);

      if (referralAffiliateDeleteError) {
        return NextResponse.json(
          { error: "Failed to delete from affiliate_referrals" },
          { status: 500 }
        );
      }
    }

    // Delete emergency contacts by profile_id
    if (profileRow?.id) {
      const { error: emergencyContactsDeleteError } = await admin
        .from("emergency_contacts")
        .delete()
        .eq("profile_id", profileRow.id);

      if (emergencyContactsDeleteError) {
        return NextResponse.json(
          { error: "Failed to delete from emergency_contacts" },
          { status: 500 }
        );
      }
    }

    // Delete qr_codes by profile_id
    if (profileRow?.id) {
      const { error: qrDeleteError } = await admin
        .from("qr_codes")
        .delete()
        .eq("profile_id", profileRow.id);

      if (qrDeleteError) {
        return NextResponse.json(
          { error: "Failed to delete from qr_codes" },
          { status: 500 }
        );
      }
    }

    // Delete remaining app data
    const tablesToDelete = [
      { table: "affiliate_applications", column: "user_id" },
      { table: "premium_order_forms", column: "user_id" },
      { table: "affiliates", column: "user_id" },
      { table: "subscriptions", column: "user_id" },
      { table: "payments", column: "user_id" },
      { table: "orders", column: "user_id" },
      { table: "shipping_details", column: "user_id" },
      { table: "profiles", column: "user_id" },
    ];

    for (const item of tablesToDelete) {
      const { error } = await admin
        .from(item.table)
        .delete()
        .eq(item.column, user.id);

      if (error) {
        return NextResponse.json(
          { error: `Failed to delete from ${item.table}` },
          { status: 500 }
        );
      }
    }

    // Delete auth user last so email becomes available again
    const { error: deleteAuthError } = await admin.auth.admin.deleteUser(
      user.id
    );

    if (deleteAuthError) {
      return NextResponse.json(
        { error: "Failed to delete authentication user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}