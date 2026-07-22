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
      minHeight: "100vh",
      maxWidth: "100%",
      margin: 0,
      padding: "clamp(16px, 5vw, 40px) clamp(12px, 4vw, 20px)",
      boxSizing: "border-box",
      background: "#F8FAFC",
      overflowX: "hidden",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 760,
        minWidth: 0,
        margin: "0 auto",
        boxSizing: "border-box",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        background: "#FFFFFF",
        padding: "clamp(18px, 4vw, 24px)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <h1
        style={{
          margin: "0 0 12px",
          maxWidth: "100%",
          fontSize: "clamp(27px, 5vw, 38px)",
          lineHeight: 1.15,
          fontWeight: 900,
          color: "#0F172A",
          whiteSpace: "normal",
          overflowWrap: "normal",
          wordBreak: "normal",
        }}
      >
        ⭐ Rate Your RROI Experience
      </h1>

      <p
        style={{
          margin: "0 0 8px",
          maxWidth: "100%",
          fontSize: 16,
          lineHeight: 1.7,
          color: "#334155",
          overflowWrap: "break-word",
        }}
      >
        Your feedback helps us improve RROI and create a better experience for
        all users.
      </p>

      <p
        style={{
          margin: "0 0 28px",
          maxWidth: "100%",
          fontSize: 14,
          lineHeight: 1.6,
          color: "#64748B",
          fontWeight: 700,
          overflowWrap: "break-word",
        }}
      >
        Your star rating is required. All written feedback is optional.
      </p>

      <RatingForm />
    </div>
  </main>
);
}