"use client";

import { useState, type CSSProperties } from "react";

export default function RatingForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const visibleRating = hoveredRating || rating;

  return (
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