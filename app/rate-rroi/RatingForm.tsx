"use client";

import { useState, type CSSProperties } from "react";

export default function RatingForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [experienceComment, setExperienceComment] = useState("");
  const [improvementFeedback, setImprovementFeedback] = useState("");

  const visibleRating = hoveredRating || rating;

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
                style={{
                  ...starButtonStyle,
                  color: selected ? "#F4B400" : "#D1D5DB",
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
          style={textareaStyle}
        />

        <div style={characterCountStyle}>
          {improvementFeedback.length}/1000
        </div>
      </section>
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
  cursor: "pointer",
  transition: "color 0.15s ease, transform 0.15s ease",
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