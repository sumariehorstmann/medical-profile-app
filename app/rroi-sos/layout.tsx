import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "RROI SOS",
  description:
    "Open your RROI SOS dashboard and send an emergency alert.",
  manifest: "/rroi-sos-manifest?v=3",
  applicationName: "RROI SOS",
  themeColor: "#991B1B",
  appleWebApp: {
    capable: true,
    title: "RROI SOS",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      {
        url: "/icons/rroi-sos-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/rroi-sos-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/rroi-sos-192.png",
  },
};

type RROISOSLayoutProps = {
  children: ReactNode;
};

export default function RROISOSLayout({
  children,
}: RROISOSLayoutProps) {
  return children;
}