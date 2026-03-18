import { supabase } from "./supabaseClient";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
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

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.session?.user;
}

export async function signupUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
}

export async function resetPasswordEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}
export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}

export async function updateUserProfile(updates: {
  name?: string;
  bio?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) throw error;
}

export async function changeUserPassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}

export async function getUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("users")
    .select("name, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function deleteUserAccount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase.from("users").delete().eq("id", user.id);

  if (error) throw error;
}

// Auth-specific profile (used for guards & onboarding)
export async function getAuthUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, password_set, is_active")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}