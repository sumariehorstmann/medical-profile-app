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
      <div style={styles.topSafeArea} />

      <div style={styles.headerWrap}>
        <img
          src="/logo.png"
          alt="RROI logo"
          style={styles.logo}
        />

        <div style={styles.brandLine}>Rapid Response Online Information</div>
      </div>

      <div style={styles.middleWrap}>
        <div style={styles.qrCard}>
          <QRCodeSVG
            value={qrValue || " "}
            size={760}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      <div style={styles.bottomWrap}>
        <div style={styles.scanText}>Scan In Emergency</div>
        <div style={styles.profileText}>Medical Profile</div>

        {firstName ? (
          <div style={styles.nameText}>{firstName}</div>
        ) : null}
      </div>

      <div style={styles.bottomSafeArea} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    width: 1440,
    height: 3040,
    background: "#F8FAFC",
    color: "#0F172A",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "120px 110px 180px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  topSafeArea: {
    height: 40,
    flexShrink: 0,
  },

  headerWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
  },

  logo: {
    width: 220,
    height: 220,
    objectFit: "contain",
    display: "block",
  },

  brandLine: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    textAlign: "center",
    color: "#157A55",
    maxWidth: 1180,
    letterSpacing: 0.4,
  },

  middleWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    minHeight: 0,
    padding: "70px 0",
  },

  qrCard: {
    width: 900,
    height: 900,
    borderRadius: 44,
    background: "#FFFFFF",
    border: "2px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.10)",
  },

  bottomWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
  },

  scanText: {
    fontSize: 76,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#0F172A",
  },

  profileText: {
    fontSize: 58,
    fontWeight: 700,
    lineHeight: 1.1,
    textAlign: "center",
    color: "#475569",
  },

  nameText: {
    marginTop: 12,
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1.1,
    textAlign: "center",
    color: "#157A55",
  },

  bottomSafeArea: {
    height: 30,
    flexShrink: 0,
  },
};