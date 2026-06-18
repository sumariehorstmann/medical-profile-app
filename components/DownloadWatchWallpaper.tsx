"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  publicId: string;
  firstName?: string;
  lastName?: string;
};

export default function DownloadWatchWallpaper({
  publicId,
  firstName,
  lastName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/e/${publicId}`
      : "";

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  async function downloadWatchWallpaper() {
    if (!ref.current) return;

    const dataUrl = await htmlToImage.toPng(ref.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#050B08",
    });

    const link = document.createElement("a");
    link.download = "rroi-smartwatch-qr-wallpaper.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <>
      <button
        type="button"
        onClick={downloadWatchWallpaper}
        style={{
          marginTop: 20,
          padding: "16px 24px",
          minHeight: 52,
          width: 310,
          borderRadius: 12,
          background: "#157A55",
          color: "#FFFFFF",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          display: "inline-block",
          boxShadow: "0 10px 24px rgba(21,122,85,0.22)",
        }}
      >
        Download Smartwatch Wallpaper
      </button>

      <div
        ref={ref}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -9999,
          width: 1024,
          height: 1024,
          background: "#050B08",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          fontFamily: "Arial, sans-serif",
          paddingTop: 180,
          paddingLeft: 70,
          paddingRight: 70,
          paddingBottom: 70,
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: 2,
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          SCAN IN AN EMERGENCY
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: 42,
            borderRadius: 44,
          }}
        >
          <QRCodeSVG value={publicUrl} size={560} />
        </div>

        <div
          style={{
            fontSize: 46,
            fontWeight: 900,
            marginTop: 42,
            color: "#4ADE80",
          }}
        >
          RROI
        </div>

        {fullName ? (
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {fullName}
          </div>
        ) : null}
      </div>
    </>
  );
}