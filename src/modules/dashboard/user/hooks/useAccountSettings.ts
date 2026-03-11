import { useState, useEffect } from "react";
import {
  updateUserProfile,
  changeUserPassword,
  getUserProfile,
  deleteUserAccount,
} from "@/services/supabase/auth.service";

export function useAccountSettings() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getUserProfile();
      setProfile(data);
    }

    fetchProfile();
  }, []);

  const updateProfile = async (data: { name?: string; bio?: string }) => {
    try {
      setLoading(true);
      console.log("Updating profile with data:", data);

      await updateUserProfile(data);

      const updatedProfile = await getUserProfile();
      setProfile(updatedProfile);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setLoading(true);
      await changeUserPassword(password);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      await deleteUserAccount();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    profile,
    updateProfile,
    updatePassword,
    deleteAccount,
  };
}
