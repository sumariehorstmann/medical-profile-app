"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  publicId: string;
  firstName?: string;
  lastName?: string;
};

export default function DownloadWatchWallpaper({ publicId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/e/${publicId}`
      : "";

  async function downloadWatchWallpaper() {
    if (!ref.current || !publicId) return;

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000000",
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
        style={styles.button}
        disabled={!publicId}
      >
        Download Smartwatch Wallpaper
      </button>

      <div style={styles.hiddenWrap} aria-hidden="true">
        <div ref={ref} style={styles.canvas}>
  <div style={styles.scanTopText}>
    SCAN TO VIEW MY
  </div>

  <div style={styles.qrBox}>
    <QRCodeSVG
      value={publicUrl || " "}
      size={340}
      level="H"
      includeMargin
      bgColor="#000000"
      fgColor="#FFFFFF"
      style={{
        display: "block",
        backgroundColor: "#000000",
        colorScheme: "light",
      }}
    />
  </div>

  <div style={styles.emergencyText}>
    EMERGENCY PROFILE
  </div>
</div>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
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
  },

  hiddenWrap: {
    position: "fixed",
    top: "-1200px",
    left: "-1200px",
    width: 1024,
    height: 1024,
    pointerEvents: "none",
    colorScheme: "light",
    forcedColorAdjust: "none",
  },

  canvas: {
    width: 1024,
    height: 1024,
    background: "#000000",
    color: "#FFFFFF",
    colorScheme: "light",
    forcedColorAdjust: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    padding: "0 90px",
  },
  
  qrBox: {
  background: "#000000",
  padding: 24,
  borderRadius: 28,
  border: "6px solid #FFFFFF",
  colorScheme: "light",
  forcedColorAdjust: "none",
},

scanTopText: {
  fontSize: 36,
  fontWeight: 900,
  letterSpacing: 5,
  lineHeight: 1,
  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "uppercase",
  marginBottom: 20,
},
  emergencyText: {
  width: 650,
  fontSize: 36,
  fontWeight: 900,
  letterSpacing: 5,
  lineHeight: 1,
  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "uppercase",
  marginTop: 28,
},
 };