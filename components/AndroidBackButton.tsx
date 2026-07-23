"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export default function AndroidBackButton() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = App.addListener(
      "backButton",
      ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          void App.exitApp();
        }
      }
    );

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, []);

  return null;
}