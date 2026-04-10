"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import QRScreensaver from "./QRScreensaver";

export default function DownloadQRWallpaper({
  publicId,
  firstName,
}: {
  publicId: string;
  firstName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ref.current || !publicId || downloading) return;

    setDownloading(true);

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#F1F5F9",
      });

      const link = document.createElement("a");
      link.download = "rroi-phone-lock-screen.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://www.rroi.co.za";

  const qrUrl = publicId ? `${baseUrl}/e/${publicId}` : "";

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-10000px",
          left: "-10000px",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <div ref={ref}>
          <QRScreensaver qrValue={qrUrl} firstName={firstName} />
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        style={styles.button}
        disabled={!publicId || downloading}
      >
        {downloading ? "Preparing download..." : "Download Phone Lock Screen"}
      </button>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    marginTop: 20,
    padding: "14px 18px",
    borderRadius: 12,
    background: "#157A55",
    color: "#FFFFFF",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    width: "auto",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(21, 122, 85, 0.16)",
  },
};