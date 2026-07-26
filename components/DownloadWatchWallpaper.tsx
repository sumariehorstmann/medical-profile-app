"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import { Capacitor } from "@capacitor/core";
import { Media } from "@capacitor-community/media";

type Props = {
  publicId: string;
  firstName?: string;
  lastName?: string;
};

export default function DownloadWatchWallpaper({ publicId }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function getOrCreateRroiAlbum(): Promise<string> {
  const { albums } = await Media.getAlbums();

  const existingAlbum = albums.find(
    (album) => album.name.trim().toLowerCase() === "rroi"
  );

  if (existingAlbum) {
    return existingAlbum.identifier;
  }

  await Media.createAlbum({
    name: "RROI",
  });

  const updatedAlbums = await Media.getAlbums();

  const createdAlbum = updatedAlbums.albums.find(
    (album) => album.name.trim().toLowerCase() === "rroi"
  );

  if (!createdAlbum) {
    throw new Error("The Gallery save location could not be prepared.");
  }

  return createdAlbum.identifier;
}

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://www.rroi.co.za";

  const publicUrl = publicId ? `${baseUrl}/e/${publicId}` : "";

  

  async function downloadWatchWallpaper() {
    if (!ref.current || !publicId || downloading) return;

    setDownloading(true);

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });

      const fileName = `rroi-smartwatch-wallpaper-${Date.now()}`;

      if (Capacitor.isNativePlatform()) {
  const albumIdentifier = await getOrCreateRroiAlbum();

  await Media.savePhoto({
    path: dataUrl,
    albumIdentifier,
    fileName,
  });

  alert("Smartwatch wallpaper saved to your Gallery.");
  return;
}

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      console.error("Smartwatch wallpaper download failed:", err);

      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err);

      alert(`Smartwatch wallpaper failed: ${errorMessage}`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={downloadWatchWallpaper}
        style={styles.button}
        disabled={!publicId || downloading}
      >
        {downloading
          ? "Saving smartwatch wallpaper..."
          : "Download Smartwatch Wallpaper"}
      </button>

      <div style={styles.hiddenWrap} aria-hidden="true">
        <div ref={ref} style={styles.canvas}>
          <div style={styles.scanTopText}>SCAN TO VIEW MY</div>

          <div style={styles.qrBox}>
            <QRCodeSVG
              value={publicUrl || " "}
              size={420}
              level="M"
              includeMargin={false}
              bgColor="#000000"
              fgColor="#FFFFFF"
              style={{
                display: "block",
                backgroundColor: "#000000",
                colorScheme: "light",
              }}
            />
          </div>

          <div style={styles.emergencyText}>EMERGENCY PROFILE</div>
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
    padding: 12,
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
    maxWidth: "100%",
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