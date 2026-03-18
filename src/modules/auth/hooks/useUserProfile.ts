import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { getAuthUserProfile } from "@/services/supabase/auth.service";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  password_set: boolean;
  is_active: boolean;
};

export const useUserProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAuthUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return { profile, loading };
};