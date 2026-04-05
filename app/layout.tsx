import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RROI",
  description: "Rapid Response Online Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#FFFFFF",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SiteHeader />

        <main style={{ flex: 1 }}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}