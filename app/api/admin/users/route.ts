import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin/requireAdmin";

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdmin(req);

if (adminCheck.error) {
  return NextResponse.json(
    { error: adminCheck.error },
    { status: adminCheck.status }
  );
}

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: users, error: usersError } = await supabase
  .from("admin_users_view")
  .select("*")
  .order("current_period_end", {
    ascending: true,
    nullsFirst: false,
  });

if (usersError) {
  return NextResponse.json(
    { error: usersError.message },
    { status: 500 }
  );
}

const { data: ratings, error: ratingsError } = await supabase
  .from("ratings")
  .select(
    "user_id, rating, experience_comment, improvement_feedback, public_permission, show_on_homepage, created_at, updated_at"
  );

if (ratingsError) {
  return NextResponse.json(
    { error: ratingsError.message },
    { status: 500 }
  );
}

const ratingsByUserId = new Map(
  (ratings ?? []).map((rating) => [rating.user_id, rating])
);

const combined = (users ?? []).map((user) => {
  const userRating = ratingsByUserId.get(user.user_id);

  return {
    ...user,
    rating: userRating?.rating ?? null,
    experience_comment: userRating?.experience_comment ?? null,
    improvement_feedback: userRating?.improvement_feedback ?? null,
    public_permission: userRating?.public_permission ?? null,
    show_on_homepage: userRating?.show_on_homepage ?? false,
    rating_created_at: userRating?.created_at ?? null,
    rating_updated_at: userRating?.updated_at ?? null,
  };
});

return NextResponse.json(combined);
  
}
export async function PATCH(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);

if (adminCheck.error) {
  return NextResponse.json(
    { error: adminCheck.error },
    { status: adminCheck.status }
  );
}

    const body = await req.json();

    const ratingUserId =
      typeof body?.user_id === "string" ? body.user_id.trim() : "";

    const showOnHomepage = body?.show_on_homepage;

    if (!ratingUserId) {
      return NextResponse.json(
        { error: "Missing rating user ID." },
        { status: 400 }
      );
    }

    if (typeof showOnHomepage !== "boolean") {
      return NextResponse.json(
        { error: "Invalid homepage selection value." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: rating, error: ratingError } = await supabase
      .from("ratings")
      .select(
        "user_id, rating, public_permission, show_on_homepage"
      )
      .eq("user_id", ratingUserId)
      .maybeSingle();

    if (ratingError) {
      return NextResponse.json(
        { error: ratingError.message },
        { status: 500 }
      );
    }

    if (!rating) {
      return NextResponse.json(
        { error: "Rating not found." },
        { status: 404 }
      );
    }

    if (
      showOnHomepage &&
      (rating.rating !== 5 || rating.public_permission !== true)
    ) {
      return NextResponse.json(
        {
          error:
            "Only 5-star ratings with public permission may be shown on the homepage.",
        },
        { status: 400 }
      );
    }

    if (showOnHomepage && !rating.show_on_homepage) {
      const { count, error: countError } = await supabase
        .from("ratings")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("show_on_homepage", true);

      if (countError) {
        return NextResponse.json(
          { error: countError.message },
          { status: 500 }
        );
      }

      if ((count ?? 0) >= 4) {
        return NextResponse.json(
          {
            error:
              "A maximum of 4 ratings may be featured on the homepage. Remove one before selecting another.",
          },
          { status: 400 }
        );
      }
    }

    const { data: updatedRating, error: updateError } = await supabase
      .from("ratings")
      .update({
        show_on_homepage: showOnHomepage,
      })
      .eq("user_id", ratingUserId)
      .select(
        "user_id, rating, public_permission, show_on_homepage, updated_at"
      )
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rating: updatedRating,
    });
  } catch (error) {
    console.error("Admin rating update error:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating the rating." },
      { status: 500 }
    );
  }
}