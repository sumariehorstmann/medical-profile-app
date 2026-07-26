"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Capacitor } from "@capacitor/core";
import { Media } from "@capacitor-community/media";
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

  async function getOrCreateRroiAlbum(): Promise<string> {
    const existingAlbums = await Media.getAlbums();

    const existingAlbum = existingAlbums.albums.find(
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
      throw new Error("The RROI Gallery album could not be created.");
    }

    return createdAlbum.identifier;
  }

  const handleDownload = async () => {
    if (!ref.current || !publicId || downloading) return;

    setDownloading(true);

    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#000000",
      });

      const fileName = `rroi-phone-lock-screen-${Date.now()}`;

      if (Capacitor.isNativePlatform()) {
        const albumIdentifier = await getOrCreateRroiAlbum();

        await Media.savePhoto({
          path: dataUrl,
          albumIdentifier,
          fileName,
        });

        alert("Wallpaper saved to your Gallery in the RROI album.");
        return;
      }

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      console.error("Wallpaper download failed:", err);

      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err);

      alert(`Wallpaper failed: ${errorMessage}`);
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
        {downloading
          ? "Saving wallpaper..."
          : "Download Phone Lock Screen"}
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