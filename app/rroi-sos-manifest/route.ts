import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      id: "/",
      name: "RROI SOS",
      short_name: "RROI SOS",
      description:
        "Open your RROI SOS dashboard and send an emergency alert.",
        categories: ["medical", "health"],
        lang: "en-ZA",
        screenshots: [
  {
    src: "/images/rroi-sos-screen.png",
    sizes: "1080x1920",
    type: "image/png",
    form_factor: "narrow",
  },
],
      start_url: "/",
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
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}