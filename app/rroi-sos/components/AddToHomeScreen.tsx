"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type DeviceType = "ios" | "android" | "other";

function detectDevice(): DeviceType {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  }

  if (/android/.test(userAgent)) {
    return "android";
  }

  return "other";
}

function isStandaloneMode() {
  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

export default function AddToHomeScreen() {
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);

  const [device, setDevice] = useState<DeviceType>("other");
  const [showInstructions, setShowInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setDevice(detectDevice());
    setIsInstalled(isStandaloneMode());

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    }

    function handleInstalled() {
      setInstallPrompt(null);
      setIsInstalled(true);
      setShowInstructions(false);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (installPrompt) {
      await installPrompt.prompt();

      const choice = await installPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }

      setInstallPrompt(null);
      return;
    }

    setShowInstructions(true);
  }

  async function copySOSLink() {
    try {
      await navigator.clipboard.writeText(
        "https://www.rroi.co.za/rroi-sos"
      );

      setLinkCopied(true);

      window.setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch {
      setLinkCopied(false);
    }
  }

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <section
        style={{
          background: "#FFFFFF",
          border: "1px solid #D9E2DD",
          borderRadius: 16,
          padding: 20,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px",
            color: "#0F172A",
            fontSize: 22,
            fontWeight: 900,
          }}
        >
          Add RROI SOS to your Home Screen
        </h2>

        <p
          style={{
            margin: "0 auto 18px",
            maxWidth: 600,
            color: "#475569",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Create a one-tap RROI SOS shortcut on your phone&apos;s Home
          Screen.
        </p>

        <button
          type="button"
          onClick={handleInstall}
          style={{
            width: "100%",
            minHeight: 54,
            padding: "14px 18px",
            border: "1px solid #157A55",
            borderRadius: 14,
            background: "#157A55",
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          ADD RROI SOS TO HOME SCREEN
        </button>
      </section>

      {showInstructions ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-rroi-sos-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "rgba(15, 23, 42, 0.65)",
          }}
          onClick={() => setShowInstructions(false)}
        >
          <section
            style={{
              width: "100%",
              maxWidth: 480,
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: 20,
              padding: 24,
              background: "#FFFFFF",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="install-rroi-sos-title"
              style={{
                margin: "0 0 16px",
                color: "#0F172A",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              Add RROI SOS
            </h2>

            {device === "ios" ? (
              <div
                style={{
                  color: "#334155",
                  lineHeight: 1.7,
                }}
              >
                <p style={{ marginTop: 0 }}>
                  On iPhone or iPad:
                </p>

                <ol style={{ paddingLeft: 22 }}>
                  <li>Open this page in Safari.</li>
                  <li>Tap the Share button.</li>
                  <li>Scroll down and tap Add to Home Screen.</li>
                  <li>Confirm the name RROI SOS and tap Add.</li>
                </ol>
              </div>
            ) : device === "android" ? (
              <div
                style={{
                  color: "#334155",
                  lineHeight: 1.7,
                }}
              >
                <p style={{ marginTop: 0 }}>
                  On Android:
                </p>

                <ol style={{ paddingLeft: 22 }}>
                  <li>
                    Open this page in the full Chrome browser.
                  </li>
                  <li>Tap the three-dot menu at the top right.</li>
                  <li>
                    Tap Add to Home screen or Install app.
                  </li>
                  <li>Confirm by tapping Add or Install.</li>
                </ol>

                <p>
                  When viewing this page inside the RROI app, first use
                  the browser menu to select Open in Chrome.
                </p>
              </div>
            ) : (
              <div
                style={{
                  color: "#334155",
                  lineHeight: 1.7,
                }}
              >
                <p style={{ marginTop: 0 }}>
                  Open this page in your phone&apos;s main browser and use
                  the browser menu to select Add to Home Screen or
                  Install app.
                </p>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                type="button"
                onClick={copySOSLink}
                style={{
                  width: "100%",
                  minHeight: 48,
                  padding: "12px 18px",
                  border: "1px solid #157A55",
                  borderRadius: 12,
                  background: "#FFFFFF",
                  color: "#157A55",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {linkCopied ? "LINK COPIED" : "COPY RROI SOS LINK"}
              </button>

              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                style={{
                  width: "100%",
                  minHeight: 48,
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: 12,
                  background: "#157A55",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                CLOSE
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}