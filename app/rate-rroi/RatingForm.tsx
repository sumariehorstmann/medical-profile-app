"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

type PermissionChoice = "public" | "internal" | "";

export default function RatingForm() {
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [experienceComment, setExperienceComment] = useState("");
  const [improvementFeedback, setImprovementFeedback] = useState("");
  const [permissionChoice, setPermissionChoice] =
    useState<PermissionChoice>("");

  const [saving, setSaving] = useState(false);
  const [loadingRating, setLoadingRating] = useState(true);
  const [hasExistingRating, setHasExistingRating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    "success" | "error" | null
  >(null);

  const visibleRating = hoveredRating || rating;

useEffect(() => {
  let cancelled = false;

  async function loadExistingRating() {
    try {
      const response = await fetch("/api/ratings", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Your existing rating could not be loaded."
        );
      }

      if (cancelled) return;

      if (result.rating) {
        setRating(result.rating.rating);
        setExperienceComment(result.rating.experience_comment ?? "");
        setImprovementFeedback(result.rating.improvement_feedback ?? "");
        setPermissionChoice(
          result.rating.public_permission ? "public" : "internal"
        );
        setHasExistingRating(true);
      }
    } catch (error) {
      if (cancelled) return;

      setMessage(
        error instanceof Error
          ? error.message
          : "Your existing rating could not be loaded."
      );
      setMessageType("error");
    } finally {
      if (!cancelled) {
        setLoadingRating(false);
      }
    }
  }

  void loadExistingRating();

  return () => {
    cancelled = true;
  };
}, []);

  async function handleSaveRating() {
    setMessage(null);
    setMessageType(null);

    if (rating < 1 || rating > 5) {
      setMessage("Please select a rating from 1 to 5 stars.");
      setMessageType("error");
      return;
    }

    if (!permissionChoice) {
      setMessage("Please choose how RROI may use your feedback.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          experience_comment: experienceComment,
          improvement_feedback: improvementFeedback,
          public_permission: permissionChoice === "public",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Your rating could not be saved."
        );
      }

      setMessage("Thank you. Your rating has been saved successfully.");
      setMessageType("success");
      setHasExistingRating(true);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your rating."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <section style={sectionStyle}>
        <div style={labelStyle}>
          1. How would you rate your overall RROI experience?{" "}
          <span style={{ color: "#B00020" }}>*</span>
        </div>

        <div
          role="radiogroup"
          aria-label="Overall RROI rating"
          style={starsRowStyle}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const selected = star <= visibleRating;

            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-label={`${star} star${star === 1 ? "" : "s"}`}
                aria-checked={rating === star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onFocus={() => setHoveredRating(star)}
                onBlur={() => setHoveredRating(0)}
                disabled={saving}
                style={{
                  ...starButtonStyle,
                  color: selected ? "#F4B400" : "#D1D5DB",
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                ★
              </button>
            );
          })}
        </div>

        <div style={hintStyle}>
          {rating > 0
            ? `${rating} out of 5 stars selected`
            : "Select a rating from 1 to 5 stars."}
        </div>
      </section>

      <section style={sectionStyle}>
        <label htmlFor="experience-comment" style={labelStyle}>
          2. Tell us about your experience with RROI
        </label>

        <div style={optionalStyle}>Optional</div>

        <textarea
          id="experience-comment"
          rows={5}
          maxLength={1000}
          value={experienceComment}
          onChange={(event) => setExperienceComment(event.target.value)}
          placeholder="Tell us what you like about RROI or how it has helped you."
          disabled={saving}
          style={textareaStyle}
        />

        <div style={characterCountStyle}>
          {experienceComment.length}/1000
        </div>
      </section>

      <section style={sectionStyle}>
        <label htmlFor="improvement-feedback" style={labelStyle}>
          3. How could we improve RROI?
        </label>

        <div style={optionalStyle}>Optional</div>

        <textarea
          id="improvement-feedback"
          rows={5}
          maxLength={1000}
          value={improvementFeedback}
          onChange={(event) => setImprovementFeedback(event.target.value)}
          placeholder="Share any suggestions or ideas that could make RROI even better."
          disabled={saving}
          style={textareaStyle}
        />

        <div style={characterCountStyle}>
          {improvementFeedback.length}/1000
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={labelStyle}>
          4. Permission to use your feedback{" "}
          <span style={{ color: "#B00020" }}>*</span>
        </div>

        <p style={permissionIntroStyle}>
          Please choose how RROI may use your feedback.
        </p>

        <label style={radioRowStyle}>
          <input
            type="radio"
            name="feedback-permission"
            value="public"
            checked={permissionChoice === "public"}
            onChange={() => setPermissionChoice("public")}
            disabled={saving}
            style={radioStyle}
          />

          <span>
            <strong>I give RROI permission</strong> to use my star rating and
            written feedback on the RROI website, social media and other
            marketing material. Only my name and surname will be displayed. My
            contact details and private profile information will not be
            published.
          </span>
        </label>

        <label style={radioRowStyle}>
          <input
            type="radio"
            name="feedback-permission"
            value="internal"
            checked={permissionChoice === "internal"}
            onChange={() => setPermissionChoice("internal")}
            disabled={saving}
            style={radioStyle}
          />

          <span>
            <strong>I do not give RROI permission</strong> to use my feedback
            publicly. My rating and comments may only be used internally by RROI
            to help improve its products and services.
          </span>
        </label>
      </section>

      {message ? (
        <div
          role="status"
          style={{
            ...messageStyle,
            borderColor:
              messageType === "success" ? "#BBF7D0" : "#FECACA",
            background:
              messageType === "success" ? "#F0FDF4" : "#FEF2F2",
            color:
              messageType === "success" ? "#166534" : "#991B1B",
          }}
        >
          {message}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleSaveRating}
        disabled={saving || loadingRating}
        style={{
          ...saveButtonStyle,
          opacity: saving || loadingRating ? 0.65 : 1,
cursor: saving || loadingRating ? "not-allowed" : "pointer",
        }}
      >
        {saving
  ? "SAVING..."
  : hasExistingRating
    ? "UPDATE MY RATING"
    : "SAVE MY RATING"}
      </button>
      <button
  type="button"
  onClick={() => router.push("/profile")}
  style={{
    width: "100%",
    marginTop: 12,
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#0F172A",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  ← Back to My Profile
</button>
    </>
  );
}

const sectionStyle: CSSProperties = {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: "1px solid #E5E7EB",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 16,
  fontWeight: 800,
  lineHeight: 1.5,
  color: "#0F172A",
};

const optionalStyle: CSSProperties = {
  marginTop: 4,
  marginBottom: 8,
  fontSize: 13,
  color: "#64748B",
};

const starsRowStyle: CSSProperties = {
  display: "flex",
  gap: 4,
  marginTop: 12,
  flexWrap: "wrap",
};

const starButtonStyle: CSSProperties = {
  appearance: "none",
  border: "none",
  background: "transparent",
  padding: "2px",
  fontSize: 44,
  lineHeight: 1,
  transition: "color 0.15s ease",
};

const hintStyle: CSSProperties = {
  marginTop: 10,
  fontSize: 13,
  color: "#64748B",
  fontWeight: 600,
};

const textareaStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: 12,
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: 15,
  fontFamily: "inherit",
  lineHeight: 1.6,
  resize: "vertical",
};

const characterCountStyle: CSSProperties = {
  marginTop: 6,
  textAlign: "right",
  fontSize: 12,
  color: "#64748B",
};

const permissionIntroStyle: CSSProperties = {
  margin: "8px 0 16px",
  fontSize: 14,
  lineHeight: 1.6,
  color: "#475569",
};

const radioRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 16,
  fontSize: 14,
  lineHeight: 1.65,
  color: "#334155",
  cursor: "pointer",
};

const radioStyle: CSSProperties = {
  marginTop: 5,
  flexShrink: 0,
};

const messageStyle: CSSProperties = {
  marginBottom: 16,
  padding: "12px 14px",
  border: "1px solid",
  borderRadius: 12,
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 700,
};

const saveButtonStyle: CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #157A55",
  background: "#157A55",
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: 900,
};