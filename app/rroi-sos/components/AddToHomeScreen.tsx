"use client";

import { useEffect, useState } from "react";

export default function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ios =
      /iphone|ipad|ipod/i.test(window.navigator.userAgent);

    setIsIOS(ios);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };
  }, []);

  async function install() {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === "accepted") {
        setDeferredPrompt(null);
      }

      return;
    }

    if (isIOS) {
      alert(
        "To install RROI SOS:\n\nTap Share\nThen tap 'Add to Home Screen'."
      );
      return;
    }

    alert(
      "Your browser does not currently support automatic installation."
    );
  }

  return (
    <button
      onClick={install}
      style={{
        width: "100%",
        padding: "18px",
        border: "none",
        borderRadius: 14,
        background: "#157A55",
        color: "#fff",
        fontSize: 18,
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      ADD RROI SOS TO HOME SCREEN
    </button>
  );
}