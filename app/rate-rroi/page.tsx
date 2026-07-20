import RatingForm from "./RatingForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export default async function RateRROIPage() {
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
          } catch {}
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/rate-rroi");
  }

  return (
    <main
      style={{
        width: "100%",
        maxWidth: 760,
        margin: "40px auto",
        padding: "24px",
      }}
    >
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: 18,
          background: "#FFFFFF",
          padding: 24,
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        }}
      >
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 900,
            color: "#0F172A",
          }}
        >
          ⭐ Rate Your RROI Experience
        </h1>

        <p
          style={{
            margin: "0 0 8px",
            fontSize: 16,
            lineHeight: 1.7,
            color: "#334155",
          }}
        >
          Your feedback helps us improve RROI and create a better experience for
          all users.
        </p>

        <p
          style={{
            margin: "0 0 28px",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#64748B",
            fontWeight: 700,
          }}
        >
          Your star rating is required. All written feedback is optional.
        </p>

        <RatingForm />
      </div>
    </main>
  );
}