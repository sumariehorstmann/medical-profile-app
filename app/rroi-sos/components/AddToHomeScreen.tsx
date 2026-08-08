"use client";

import { useEffect, useState } from "react";
import { Capacitor, registerPlugin } from "@capacitor/core";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform?: string;
  }>;
};

type RroiSosShortcutPlugin = {
  addToHomeScreen: () => Promise<{
    requested: boolean;
  }>;
};

const RroiSosShortcut =
  registerPlugin<RroiSosShortcutPlugin>("RroiSosShortcut");

declare global {
  interface Window {
    __rroiInstallPrompt?: InstallPromptEvent | null;
  }
}

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

    // Use an install event that may have been captured before
    // this React component loaded.
    if (window.__rroiInstallPrompt) {
      setInstallPrompt(window.__rroiInstallPrompt);
    }

    function saveInstallPrompt(event: Event) {
      event.preventDefault();

      const promptEvent = event as InstallPromptEvent;

      window.__rroiInstallPrompt = promptEvent;
      setInstallPrompt(promptEvent);
      setShowInstructions(false);
    }

    function useSavedInstallPrompt() {
      if (window.__rroiInstallPrompt) {
        setInstallPrompt(window.__rroiInstallPrompt);
        setShowInstructions(false);
      }
    }

    function handleInstalled() {
        
      window.__rroiInstallPrompt = null;
      setInstallPrompt(null);
      setIsInstalled(true);
      setShowInstructions(false);
    }

    window.addEventListener(
      "beforeinstallprompt",
      saveInstallPrompt
    );

    window.addEventListener(
      "rroi-install-prompt-ready",
      useSavedInstallPrompt
    );

    window.addEventListener(
      "rroi-app-installed",
      handleInstalled
    );

    window.addEventListener(
      "appinstalled",
      handleInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        saveInstallPrompt
      );

      window.removeEventListener(
        "rroi-install-prompt-ready",
        useSavedInstallPrompt
      );

      window.removeEventListener(
        "rroi-app-installed",
        handleInstalled
      );

      window.removeEventListener(
        "appinstalled",
        handleInstalled
      );
    };
  }, []);

  async function handleInstall() {
  const isSOSDomain =
    window.location.hostname === "sos.rroi.co.za";

  // Android: ALWAYS try the native shortcut first.
  if (device === "android") {
    try {
      const result =
        await RroiSosShortcut.addToHomeScreen();

      if (result.requested) {
        setShowInstructions(false);
        return;
      }
    } catch (error) {
      console.log(
        "Native shortcut unavailable:",
        error
      );
    }

    setShowInstructions(true);
    return;
  }

  // Non-Android browsers
  if (!isSOSDomain) {
    window.location.href = "https://sos.rroi.co.za";
    return;
  }

  const promptEvent =
    installPrompt ??
    window.__rroiInstallPrompt ??
    null;

  if (promptEvent) {
    try {
      await promptEvent.prompt();

      const choice = await promptEvent.userChoice;

      if (choice.outcome === "accepted") {
        setIsInstalled(true);
        setShowInstructions(false);
      }

      window.__rroiInstallPrompt = null;
      setInstallPrompt(null);
    } catch {
      setShowInstructions(true);
    }

    return;
  }

  setShowInstructions(true);
}

  async function copySOSLink() {
    try {
      await navigator.clipboard.writeText(
  "https://sos.rroi.co.za"
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
          Create a one-tap RROI SOS icon on your phone&apos;s
          Home Screen.
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
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.25)",
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
                  <li>
                    Tap <strong>Add to Home Screen</strong>.
                  </li>
                  <li>
                    Confirm the name RROI SOS and tap Add.
                  </li>
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
  Install RROI SOS to your Home Screen for quick one-tap access.
</p>

<p>
  <strong>Android</strong>
</p>

<ol style={{ paddingLeft: 22 }}>
  <li>Tap the <strong>⋮</strong> menu in your browser.</li>
  <li>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
  <li>Tap <strong>Install</strong> or <strong>Add</strong>.</li>
</ol>

<p>
  <strong>iPhone (Safari)</strong>
</p>

<ol style={{ paddingLeft: 22 }}>
  <li>Tap the <strong>Share</strong> button.</li>
  <li>Select <strong>Add to Home Screen</strong>.</li>
  <li>Tap <strong>Add</strong>.</li>
</ol>

<p style={{ marginBottom: 0 }}>
  Once added, tap the <strong>RROI SOS</strong> icon on your Home Screen to open RROI SOS instantly.
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
                  Open this page in your device&apos;s main
                  browser and select Install app or Add to Home
                  Screen from the browser menu.
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
                {linkCopied
                  ? "LINK COPIED"
                  : "COPY RROI SOS LINK"}
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