import { useEffect, useRef, useState } from "react";

export const useAutosaveDraft = (
  saveFunction: () => Promise<void>,
  delay: number = 20000,
) => {
  const timeout = useRef<any>(null);

  const [status, setStatus] = useState<
    "idle" | "typing" | "saving" | "saved" | "error"
  >("idle");

  const triggerSave = () => {
    setStatus("typing");

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      try {
        setStatus("saving");

        await saveFunction();

        setStatus("saved");

        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return { triggerSave, status };
};
