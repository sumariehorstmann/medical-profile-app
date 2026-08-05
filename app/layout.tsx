import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
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
  <Script
  id="capture-rroi-install-prompt"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.__rroiInstallPrompt = null;

      window.addEventListener(
        "beforeinstallprompt",
        function (event) {
          event.preventDefault();
          window.__rroiInstallPrompt = event;

          window.dispatchEvent(
            new CustomEvent("rroi-install-prompt-ready")
          );
        }
      );

      window.addEventListener(
        "appinstalled",
        function () {
          window.__rroiInstallPrompt = null;

          window.dispatchEvent(
            new CustomEvent("rroi-app-installed")
          );
        }
      );
    `,
  }}
/>
  <AndroidBackButton />

  <SiteHeader />

  <main
  style={{
    flex: 1,
    paddingTop: 76,
  }}
>
  {children}
</main>

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
