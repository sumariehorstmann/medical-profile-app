import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import AndroidBackButton from "@/components/AndroidBackButton";

export const metadata: Metadata = {
  title: "RROI",
  description: "Rapid Response Online Information",
  manifest: "/manifest.json",
  themeColor: "#157A55",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>

      <body
  style={{
    margin: 0,
    background: "#FFFFFF",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  }}
>
  <AndroidBackButton />

  <SiteHeader />

  <main style={{ flex: 1 }}>{children}</main>

  <Footer />

  <script
    dangerouslySetInnerHTML={{
      __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js');
          });
        }
      `,
    }}
  />
</body>
      
    </html>
  );
}
