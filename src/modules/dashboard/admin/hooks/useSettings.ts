import { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
} from "@/services/supabase/settings.service";

type Settings = {
  id: string;
  maintenance_mode?: boolean;
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (updates: Partial<Settings>) => {
    try {
      setUpdating(true);
      const updated = await updateSettings(updates);
      setSettings(updated);
      return updated;
    } finally {
      setUpdating(false);
    }
  };

  return {
    settings,
    loading,
    updating,
    saveSettings,
  };
}
