"use client";

import { useCallback, useEffect, useState } from "react";
import { getSOSHistory, getSOSSettings } from "../actions";

export type SOSSettings = {
  contact_1_name: string | null;
  contact_1_surname: string | null;
  contact_1_relationship: string | null;
  contact_1_phone: string | null;

  contact_2_name: string | null;
  contact_2_surname: string | null;
  contact_2_relationship: string | null;
  contact_2_phone: string | null;

  alerts_used: number;
  alerts_limit: number;
};
export type SOSHistoryItem = {
  id: string;
  contact_number: number | null;
  recipient_name: string;
  sms_status: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};

export function useSOS() {
  const [settings, setSettings] = useState<SOSSettings | null>(null);
  const [history, setHistory] = useState<SOSHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getSOSSettings();
      const historyData = await getSOSHistory();

      setSettings(
        data
          ? {
              contact_1_name: data.contact_1_name ?? null,
              contact_1_surname: data.contact_1_surname ?? null,
              contact_1_relationship:
                data.contact_1_relationship ?? null,
              contact_1_phone: data.contact_1_phone ?? null,

              contact_2_name: data.contact_2_name ?? null,
              contact_2_surname: data.contact_2_surname ?? null,
              contact_2_relationship:
                data.contact_2_relationship ?? null,
              contact_2_phone: data.contact_2_phone ?? null,

              alerts_used: Number(data.alerts_used ?? 0),
              alerts_limit: Number(data.alerts_limit ?? 60),
            }
          : {
              contact_1_name: null,
              contact_1_surname: null,
              contact_1_relationship: null,
              contact_1_phone: null,

              contact_2_name: null,
              contact_2_surname: null,
              contact_2_relationship: null,
              contact_2_phone: null,

              alerts_used: 0,
              alerts_limit: 60,
            }
      );
      setHistory(historyData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "RROI SOS settings could not be loaded."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return {
    settings,
    history,
    isLoading,
    error,
    refreshSettings: loadSettings,
};
}