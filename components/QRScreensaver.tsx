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
      <div style={styles.safeTop} />

      <div style={styles.headerWrap}>
        <img src="/logo.png" alt="RROI logo" style={styles.logo} />

        <div style={styles.brandBlock}>
          <div style={styles.brandMain}>Rapid Response</div>
          <div style={styles.brandSub}>Online Information</div>
        </div>
      </div>

      <div style={styles.qrSection}>
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

      <div style={styles.textBlock}>
        <div style={styles.scanText}>Scan in an Emergency</div>
        <div style={styles.profileText}>Medical Profile</div>

        {firstName ? <div style={styles.nameText}>{firstName}</div> : null}

        <div style={styles.helperText}>Secure emergency information</div>
      </div>

      <div style={styles.safeBottom} />
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "90px 110px 120px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  safeTop: {
    height: 20,
    flexShrink: 0,
  },

  headerWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    marginTop: 10,
  },

  logo: {
    width: 300,
    height: 300,
    objectFit: "contain",
    display: "block",
  },

  brandBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },

  brandMain: {
    fontSize: 74,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#157A55",
    letterSpacing: 0.2,
  },

  brandSub: {
    fontSize: 58,
    fontWeight: 800,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#157A55",
    letterSpacing: 0.2,
  },

  qrSection: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0 20px",
    minHeight: 0,
  },

  qrCard: {
    width: 930,
    height: 930,
    borderRadius: 46,
    background: "#FFFFFF",
    border: "2px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
  },

  textBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 10,
  },

  scanText: {
    fontSize: 84,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  profileText: {
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#475569",
  },

  nameText: {
    marginTop: 10,
    fontSize: 48,
    fontWeight: 800,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#157A55",
  },

  helperText: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.2,
    textAlign: "center",
    color: "#64748B",
    letterSpacing: 0.2,
  },

  safeBottom: {
    height: 24,
    flexShrink: 0,
  },
};