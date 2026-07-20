import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type RatingRequestBody = {
  rating?: unknown;
  experience_comment?: unknown;
  improvement_feedback?: unknown;
  public_permission?: unknown;
};

function cleanOptionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();
  return cleaned ? cleaned : null;
}

export async function POST(request: Request) {
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
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Cookies cannot always be written from a route response context.
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to rate RROI." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as RatingRequestBody;

    const rating = Number(body.rating);
    const experienceComment = cleanOptionalText(body.experience_comment);
    const improvementFeedback = cleanOptionalText(
      body.improvement_feedback
    );

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please select a rating from 1 to 5 stars." },
        { status: 400 }
      );
    }

    if (experienceComment && experienceComment.length > 1000) {
      return NextResponse.json(
        { error: "Your experience comment may not exceed 1000 characters." },
        { status: 400 }
      );
    }

    if (improvementFeedback && improvementFeedback.length > 1000) {
      return NextResponse.json(
        { error: "Your improvement feedback may not exceed 1000 characters." },
        { status: 400 }
      );
    }

    if (typeof body.public_permission !== "boolean") {
      return NextResponse.json(
        { error: "Please choose how RROI may use your feedback." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("ratings")
      .upsert(
        {
          user_id: user.id,
          rating,
          experience_comment: experienceComment,
          improvement_feedback: improvementFeedback,
          public_permission: body.public_permission,
        },
        {
          onConflict: "user_id",
        }
      )
      .select(
        "id, rating, experience_comment, improvement_feedback, public_permission, show_on_homepage, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error("Rating save error:", error);

      return NextResponse.json(
        { error: "Your rating could not be saved. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rating: data,
    });
  } catch (error) {
    console.error("Rating API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while saving your rating." },
      { status: 500 }
    );
  }
}