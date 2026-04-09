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
        <img
          src="/logo-full-v2.png"
          alt="RROI logo"
          style={styles.logo}
        />
      </div>

      <div style={styles.cardWrap}>
        <div style={styles.mainCard}>
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

          <div style={styles.textBlock}>
            <div style={styles.scanText}>SCAN IN AN EMERGENCY</div>
            <div style={styles.profileText}>Medical Profile</div>

            {firstName ? <div style={styles.nameText}>{firstName}</div> : null}

            <div style={styles.divider} />

            <div style={styles.helperText}>Secure emergency information</div>
          </div>
        </div>
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
    padding: "70px 110px 100px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  safeTop: {
    height: 10,
    flexShrink: 0,
  },

  headerWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 34,
  },

  logo: {
    width: 740,
    height: "auto",
    objectFit: "contain",
    display: "block",
  },

  cardWrap: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 0,
  },

  mainCard: {
    width: 980,
    background: "#FFFFFF",
    borderRadius: 52,
    border: "2px solid #E5E7EB",
    boxShadow: "0 28px 80px rgba(15, 23, 42, 0.10)",
    padding: "34px 34px 42px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  qrWrap: {
    width: 820,
    height: 820,
    borderRadius: 28,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  textBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 34,
  },

  scanText: {
    fontSize: 72,
    fontWeight: 900,
    lineHeight: 1,
    textAlign: "center",
    color: "#0F172A",
    letterSpacing: -0.8,
  },

  profileText: {
    marginTop: 18,
    fontSize: 58,
    fontWeight: 500,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#475569",
    letterSpacing: 0.2,
  },

  nameText: {
    marginTop: 24,
    fontSize: 50,
    fontWeight: 800,
    lineHeight: 1.05,
    textAlign: "center",
    color: "#157A55",
  },

  divider: {
    width: "82%",
    height: 1,
    background: "#E5E7EB",
    marginTop: 34,
    marginBottom: 24,
  },

  helperText: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    textAlign: "center",
    color: "#475569",
    letterSpacing: 0.15,
  },

  safeBottom: {
    height: 16,
    flexShrink: 0,
  },
};