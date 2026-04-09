"use client";

import { QRCodeSVG } from "qrcode.react";

type QRScreensaverProps = {
  qrValue: string;
  firstName?: string;
};

export default function QRScreensaver({
  qrValue,
  firstName,
}: QRScreensaverProps) {
  return (
    <div id="qr-screensaver" style={styles.canvas}>
      <div style={styles.inner}>
        <div style={styles.logoWrap}>
          <img
            src="/logo-full-v2.png"
            alt="RROI logo"
            style={styles.logo}
          />
        </div>

        <div style={styles.qrWrap}>
          <QRCodeSVG
            value={qrValue || " "}
            size={760}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>

        <div style={styles.textWrap}>
          <div style={styles.scanText}>SCAN IN AN EMERGENCY</div>
          <div style={styles.profileText}>Medical Profile</div>

          {firstName ? <div style={styles.nameText}>{firstName}</div> : null}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    width: 1440,
    height: 3040,
    background: "#F1F5F9",
    color: "#0F172A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "180px 140px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  inner: {
    width: "100%",
    maxWidth: 1040,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 110,
  },

  logoWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 360,
    height: "auto",
    objectFit: "contain",
    display: "block",
  },

  qrWrap: {
    width: 860,
    height: 860,
    background: "#FFFFFF",
    borderRadius: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
  },

  textWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },

  scanText: {
    fontSize: 82,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#0F172A",
    letterSpacing: -0.6,
  },

  profileText: {
    fontSize: 64,
    fontWeight: 500,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#0F172A",
  },

  nameText: {
    fontSize: 54,
    fontWeight: 700,
    lineHeight: 1.08,
    textAlign: "center",
    color: "#157A55",
  },
};