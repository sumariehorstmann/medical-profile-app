import type React from "react";
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
              
        <section style={sectionStyle}>
          <div style={labelStyle}>Permission to use your feedback</div>

          <p
            style={{
              margin: "8px 0 16px",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#475569",
            }}
          >
            Please choose how RROI may use your feedback.
          </p>

          <label style={radioRowStyle}>
            <input type="radio" disabled />

            <span>
              <strong>I give RROI permission</strong> to use my star rating and
              written feedback on the RROI website, social media and other
              marketing material. Only my name and surname will be displayed.
              My contact details and private profile information will not be
              published.
            </span>
          </label>

          <label style={radioRowStyle}>
            <input type="radio" disabled />

            <span>
              <strong>I do not give RROI permission</strong> to use my feedback
              publicly. My rating and comments may only be used internally by
              RROI to help improve its products and services.
            </span>
          </label>
        </section>

        <button
          type="button"
          disabled
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 12,
            border: "1px solid #157A55",
            background: "#157A55",
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 900,
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          SAVE MY RATING
        </button>

        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            fontSize: 13,
            color: "#64748B",
          }}
        >
          The rating form is currently under development.
        </div>
      </div>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: "1px solid #E5E7EB",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 16,
  fontWeight: 800,
  lineHeight: 1.5,
  color: "#0F172A",
};

const radioRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 16,
  fontSize: 14,
  lineHeight: 1.65,
  color: "#334155",
};