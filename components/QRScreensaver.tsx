"use client";

import { QRCodeSVG } from "qrcode.react";

type QRScreensaverProps = {
  qrValue: string;
  firstName?: string;
  lastName?: string;
};

export default function QRScreensaver({
  qrValue,
  firstName,
  lastName,
}: QRScreensaverProps) {
  const fullName =
    firstName || lastName
      ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
      : null;

  return (
    <div id="qr-screensaver" style={styles.canvas}>
      <div style={styles.inner}>
        <div style={styles.brandWrap}>
          <img
  src="/logo-full-white.png"
  alt="RROI logo"
  style={styles.realLogo}
/>
        </div>

        <div style={styles.qrWrap}>
          <QRCodeSVG
  value={qrValue || " "}
  size={720}
  bgColor="#000000"
  fgColor="#FFFFFF"
  level="H"
  includeMargin={true}
  style={{
    display: "block",
    backgroundColor: "#000000",
    color: "#FFFFFF",
  }}
/>
        </div>

        <div style={styles.textWrap}>
          <div style={styles.scanText}>SCAN IN AN EMERGENCY</div>
          <div style={styles.profileText}>Emergency Profile</div>

          {fullName ? <div style={styles.nameText}>{fullName}</div> : null}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    width: 1440,
    height: 3040,
    background: "#000000",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "140px 120px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
    colorScheme: "light",
forcedColorAdjust: "none",
  },

  inner: {
  width: "100%",
  maxWidth: 1040,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 60,
},

  brandWrap: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

  realLogo: {
  width: 650,
  height: "auto",
  display: "block",
  objectFit: "contain",
  forcedColorAdjust: "none",
},

  qrWrap: {
  width: 920,
  height: 920,
  background: "#000000",
  borderRadius: 52,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 70,
  border: "12px solid #FFFFFF",
  colorScheme: "light",
forcedColorAdjust: "none",
},

  textWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },

  scanText: {
    fontSize: 76,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#FFFFFF",
    letterSpacing: -1.2,
    textTransform: "uppercase",
  },

  profileText: {
    fontSize: 42,
    fontWeight: 500,
    lineHeight: 1.1,
    textAlign: "center",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  nameText: {
    fontSize: 64,
    fontWeight: 800,
    lineHeight: 1.08,
    textAlign: "center",
    color: "#22C55E",
    letterSpacing: -0.8,
    textTransform: "uppercase",
    marginTop: 12,
  },
};