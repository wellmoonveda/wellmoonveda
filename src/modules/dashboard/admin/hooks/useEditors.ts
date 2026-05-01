import { useEffect, useState } from "react";
import {
  activateEditor,
  createEditor,
  disableEditor,
  getEditors,
} from "@/services/supabase/user.service";
import type { EditorUser } from "../types/editor.types";

export const useEditors = () => {
  const [activeEditors, setActiveEditors] = useState<EditorUser[]>([]);
  const [disabledEditors, setDisabledEditors] = useState<EditorUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEditors = async () => {
    try {
      setLoading(true);

      const data = await getEditors();

      setActiveEditors(data.active);
      setDisabledEditors(data.disabled);
    } catch (error) {
      console.error("Failed to load editors", error);
    } finally {
      setLoading(false);
    }
  };

  const removeEditor = async (editorId: string) => {
    console.log("removeEditor called with:", editorId);
    const result = await disableEditor(editorId);

    console.log("Editor disabled:", result);

    await fetchEditors();
  };

  const addEditor = async (
    name: string,
    email: string,
    tempPassword: string,
  ) => {
    const result = await createEditor(name, email, tempPassword);
    console.log("Editor created:", result);

    await fetchEditors();
  };

  const enableEditor = async (editorId: string) => {
    await activateEditor(editorId);
    await fetchEditors();
  };

  useEffect(() => {
    fetchEditors();
  }, []);

  return {
    activeEditors,
    disabledEditors,
    loading,
    addEditor,
    removeEditor,
    enableEditor,
  };
};
