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

        <div style={styles.scanText}>
  SCAN TO VIEW MY
  <br />
  EMERGENCY PROFILE
</div>

        <div style={styles.qrWrap}>
          <QRCodeSVG
            value={qrValue || " "}
            size={390}
            bgColor="#000000"
            fgColor="#FFFFFF"
            level="H"
            includeMargin={true}
            style={{
              display: "block",
              backgroundColor: "#000000",
              color: "#FFFFFF",
              colorScheme: "light",
            }}
          />
        </div>

        
        {fullName ? (
          <div style={styles.nameText}>{fullName}</div>
        ) : null}
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
    padding: "560px 160px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
    colorScheme: "light",
    forcedColorAdjust: "none",
  },

  inner: {
    width: "100%",
    maxWidth: 620,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 48,
  },

  brandWrap: {
    display: "flex",
    justifyContent: "center",
  },

  realLogo: {
    width: 500,
    height: "auto",
    display: "block",
    objectFit: "contain",
    forcedColorAdjust: "none",
  },

  qrWrap: {
    width: 500,
    height: 500,
    background: "#000000",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 42,
    border: "7px solid #FFFFFF",
    colorScheme: "light",
    forcedColorAdjust: "none",
  },

 scanText: {
  fontSize: 50,
  fontWeight: 900,
  lineHeight: 1.15,
    textAlign: "center",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  
  nameText: {
    fontSize: 42,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#22C55E",
    textTransform: "uppercase",
  },
};