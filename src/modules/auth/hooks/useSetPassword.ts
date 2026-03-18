import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { changeUserPassword } from "@/services/supabase/auth.service";
import { markPasswordAsSet } from "@/services/supabase/user.service";

export const useSetPassword = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const setPassword = async (password: string) => {
    if (!user?.id) throw new Error("User not found");

    try {
      setLoading(true);

      // Update password in Supabase Auth
      await changeUserPassword(password);

      //Mark password_set = true in DB
      await markPasswordAsSet(user.id);
    } finally {
      setLoading(false);
    }
  };

  return { setPassword, loading };
};