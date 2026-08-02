import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "RROI SOS",
  description: "Open your RROI SOS dashboard and send an emergency alert.",
  manifest: "/rroi-sos-manifest",
  applicationName: "RROI SOS",
  appleWebApp: {
    capable: true,
    title: "RROI SOS",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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