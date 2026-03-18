import { supabase } from "./supabaseClient";

export const getEditors = async () => {
  const { data: roles, error: roleError } = await supabase
    .from("user_roles")
    .select("user_id")
    .eq("role", "editor");

  if (roleError) throw roleError;

  const userIds = roles?.map((r) => r.user_id) ?? [];

  if (userIds.length === 0) {
    return { active: [], disabled: [] };
  }

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, name, email, password_set, created_at, is_active")
    .in("id", userIds)
    .order("created_at", { ascending: false });

  if (userError) throw userError;

  const active = users?.filter((u) => u.is_active) ?? [];
  const disabled = users?.filter((u) => !u.is_active) ?? [];

  return { active, disabled };
};

export const createEditor = async (
  name: string,
  email: string,
  tempPassword: string,
) => {
  console.log("Calling create-editor:", {name, email, tempPassword});
  const {data, error} = await supabase.functions.invoke("create-editor", {
    body: {name, email, tempPassword}
  });
  if (error) throw error; 
  return data;
};

export const disableEditor = async (editorId: string) => {
  const { data, error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id", editorId)
    .select();

  if (error) throw error;

  return data;
};

export const activateEditor = async (editorId: string) => {
  const { data, error } = await supabase
    .from("users")
    .update({ is_active: true })
    .eq("id", editorId)
    .select();

  if (error) throw error;

  return data;
};

// Get User Role
export const getUserRole = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return data?.role ?? null;
};

// Get Current User Profile (for auth flow)
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, password_set, is_active")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};

export const markPasswordAsSet = async (userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({ password_set: true })
    .eq("id", userId);

  if (error) throw error;
};