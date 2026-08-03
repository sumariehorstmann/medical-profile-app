import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      id: "/rroi-sos",
      name: "RROI SOS",
      short_name: "RROI SOS",
      description:
        "Open your RROI SOS dashboard and send an emergency alert.",
      start_url: "/rroi-sos",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#157A55",
      icons: [
        {
          src: "/icons/rroi-sos-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icons/rroi-sos-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}