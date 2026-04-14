import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
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

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Delete app data first
    const tablesToDelete = [
      { table: "affiliate_referrals", column: "referred_user_id" },
      { table: "affiliate_referrals", column: "affiliate_user_id" },
      { table: "affiliate_applications", column: "user_id" },
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

    // Delete the auth user last so the email becomes available again
    const { error: deleteAuthError } = await admin.auth.admin.deleteUser(user.id);

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