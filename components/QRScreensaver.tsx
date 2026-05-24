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
  <div style={styles.brandIcon}>RROI</div>
  <div style={styles.brandText}>
    RAPID RESPONSE
    <br />
    ONLINE INFORMATION
  </div>
</div>

        <div style={styles.qrWrap}>
          <QRCodeSVG
            value={qrValue || " "}
            size={720}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>

        <div style={styles.textWrap}>
  <div style={styles.scanText}>SCAN IN AN EMERGENCY</div>

  <div style={styles.profileText}>
    Emergency Medical Profile
  </div>

  {fullName ? (
    <div style={styles.nameText}>{fullName}</div>
  ) : null}
</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  canvas: {
    width: 1440,
    height: 3040,
    background:
      "linear-gradient(180deg, #0B0F14 0%, #111827 55%, #0F172A 100%)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "140px 120px",
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
    gap: 64,
  },

  brandWrap: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 18,
  padding: "18px 28px",
  borderRadius: 24,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
},

brandIcon: {
  width: 92,
  height: 92,
  borderRadius: 22,
  background: "#22C55E",
  color: "#07130D",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  fontWeight: 900,
  letterSpacing: 0.5,
  boxShadow: "0 10px 30px rgba(34,197,94,0.35)",
},

brandText: {
  fontSize: 24,
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: 1.4,
  color: "#FFFFFF",
},

  qrWrap: {
  width: 920,
  height: 920,
  background:
    "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
  borderRadius: 52,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow:
    "0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
  padding: 70,
  position: "relative",
},

  textWrap: {
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
    color: "#FFFFFF",
    letterSpacing: -1.2,
    textTransform: "uppercase",
  },

  profileText: {
    fontSize: 42,
    fontWeight: 500,
    lineHeight: 1.1,
    textAlign: "center",
    color: "#CBD5E1",
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