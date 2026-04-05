"use client";

import { useRef } from "react";
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

  const handleDownload = async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "rroi-lockscreen.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const qrUrl = `${window.location.origin}/e/${publicId}`;

  return (
    <>
      {/* Hidden render for export */}
      <div
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <div ref={ref}>
          <QRScreensaver qrValue={qrUrl} firstName={firstName} />
        </div>
      </div>

      {/* Button */}
      <button onClick={handleDownload} style={styles.button}>
        Download Phone Lock Screen (QR)
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
    color: "#fff",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
};