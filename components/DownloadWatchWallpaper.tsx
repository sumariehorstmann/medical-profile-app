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
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box",
          pointerEvents: "none",
          padding: 120,
        }}
      >
        {/* TOP TEXT */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: 2,
            lineHeight: 1,
            marginBottom: 40,
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          SCAN
        </div>

        {/* QR CODE */}
        <div
          style={{
            background: "#FFFFFF",
            padding: 24,
            borderRadius: 28,
          }}
        >
          <QRCodeSVG
            value={publicUrl}
            size={500}
            level="H"
            includeMargin
          />
        </div>

        {/* BOTTOM TEXT */}
        <div
          style={{
            marginTop: 36,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            EMERGENCY
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#4ADE80",
            }}
          >
            PROFILE
          </div>
        </div>
      </div>
    </>
  );
}