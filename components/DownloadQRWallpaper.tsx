"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import QRScreensaver from "./QRScreensaver";

export default function DownloadQRWallpaper({
  publicId,
  firstName,
  lastName,
}: {
  publicId: string;
  firstName?: string;
  lastName?: string;
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
      backgroundColor: "#000000",
    });

    const fileName = "rroi-phone-lock-screen.png";

    if (Capacitor.isNativePlatform()) {
      const base64Data = dataUrl.split(",")[1];

      if (!base64Data) {
        throw new Error("The wallpaper image could not be prepared.");
      }

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache,
      });

      await Share.share({
        title: "RROI Phone Lock Screen",
        text: "Save or share your RROI phone lock screen wallpaper.",
        files: [savedFile.uri],
        dialogTitle: "Save or share RROI wallpaper",
      });

      return;
    }

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
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
    colorScheme: "light",
    forcedColorAdjust: "none",
  }}
>
        <div ref={ref}>
          <QRScreensaver
            qrValue={qrUrl}
            firstName={firstName}
            lastName={lastName}
          />
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
  padding: "16px 24px",
  minHeight: 52,
  width: "100%",
  maxWidth: 310,
  boxSizing: "border-box",
  borderRadius: 12,
  background: "#157A55",
  color: "#FFFFFF",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  display: "inline-block",
  boxShadow: "0 10px 24px rgba(21,122,85,0.22)",
},
};