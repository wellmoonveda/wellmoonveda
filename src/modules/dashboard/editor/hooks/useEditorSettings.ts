import { useState } from "react";
import {
  updatePassword,
  updateProfile,
} from "@/services/supabase/auth.service";

export const useEditorSettings = () => {
  const [loading, setLoading] = useState(false);

  const saveProfile = async (data: { name: string; bio: string }) => {
    setLoading(true);

    try {
      await updateProfile({
        name: data.name,
        bio: data.bio,
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (password: string) => {
    setLoading(true);

    try {
      await updatePassword(password);
    } finally {
      setLoading(false);
    }
  };

  return {
    saveProfile,
    changePassword,
    loading,
  };
};
