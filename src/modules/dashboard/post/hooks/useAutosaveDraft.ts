import { useEffect, useRef, useState } from "react";
import type { AutosaveStatus } from "../types/post.types";

export const useAutosaveDraft = (
  saveFunction: () => Promise<void>,
  delay: number = 8000,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<AutosaveStatus>("idle");

  const cancelPendingSave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setStatus("idle");
    }
  };

  const triggerSave = () => {
    setStatus("typing");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving");

        await saveFunction();

        setStatus("saved");

        setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { triggerSave, status, cancelPendingSave };
};
