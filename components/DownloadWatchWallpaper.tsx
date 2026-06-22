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
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/e/${publicId}`
      : "";

  async function downloadWatchWallpaper() {
    if (!ref.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#050B08",
      });

      const link = document.createElement("a");
      link.download = "rroi-smartwatch-qr-wallpaper.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Smartwatch wallpaper download failed", err);
      alert("Download failed. Please try again.");
    }
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
        style={{
          position: "fixed",
          top: "-1200px",
          left: "-1200px",
          width: 1024,
          height: 1024,
          pointerEvents: "none",
        }}
      >
        <div
  ref={ref}
  style={{
    width: 1024,
    height: 1024,
    background: "#050B08",
    color: "#FFFFFF",

    colorScheme: "light",
    forcedColorAdjust: "none",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "Arial, sans-serif",

    paddingTop: 100,
    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom: 70,

    boxSizing: "border-box",
  }}
>
          <div
            style={{
              width: 420,
fontSize: 42,
fontWeight: 900,
letterSpacing: 1,
marginBottom: 30,
              textAlign: "center",
              color: "#4ADE80",
              lineHeight: 1,
            }}
          >
            EMERGENCY PROFILE
          </div>

          <div
  style={{
    background: "#FFFFFF",
    padding: 24,
    borderRadius: 32,
  }}
>
            <QRCodeSVG
  value={publicUrl}
  size={300}
  level="H"
  includeMargin
  bgColor="#FFFFFF"
  fgColor="#000000"
  style={{
    backgroundColor: "#FFFFFF",
    colorScheme: "light",
  }}
/>
          </div>
        </div>
      </div>
    </>
  );
}