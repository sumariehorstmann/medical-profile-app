import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: ratings, error: ratingsError } = await supabase
      .from("ratings")
      .select("user_id, rating, experience_comment, updated_at")
      .eq("rating", 5)
      .eq("public_permission", true)
      .eq("show_on_homepage", true)
      .not("experience_comment", "is", null)
      .order("updated_at", { ascending: false })
      .limit(4);

    if (ratingsError) {
      console.error("Testimonials rating query error:", ratingsError);

      return NextResponse.json(
        { error: "Testimonials could not be loaded." },
        { status: 500 }
      );
    }

    if (!ratings || ratings.length === 0) {
      return NextResponse.json([]);
    }

    const userIds = ratings.map((item) => item.user_id);

    const { data: users, error: usersError } = await supabase
      .from("admin_users_view")
      .select("user_id, first_name, last_name")
      .in("user_id", userIds);

    if (usersError) {
      console.error("Testimonials user query error:", usersError);

      return NextResponse.json(
        { error: "Testimonial names could not be loaded." },
        { status: 500 }
      );
    }

    const usersById = new Map(
      (users ?? []).map((user) => [user.user_id, user])
    );

    const testimonials = ratings.map((item) => {
      const profile = usersById.get(item.user_id);

      const name =
        [profile?.first_name, profile?.last_name]
          .filter(Boolean)
          .join(" ")
          .trim() || "RROI User";

      return {
        rating: item.rating,
        comment: item.experience_comment,
        name,
      };
    });

    return NextResponse.json(testimonials, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Testimonials API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading testimonials." },
      { status: 500 }
    );
  }
}