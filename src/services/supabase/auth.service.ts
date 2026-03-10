import { supabase } from "./supabaseClient";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};

export const updateProfile = async (updates: {
  name?: string;
  bio?: string;
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) throw error;
};
