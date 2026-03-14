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
// export const createEditor = async (
//   name: string,
//   email: string,
//   tempPassword: string,
// ) => {
//   // create auth user
//   const { data: authUser, error: authError } = await supabase.auth.signUp({
//     email,
//     password: tempPassword,
//   });

//   if (authError) throw authError;

//   const userId = authUser.user?.id;

//   if (!userId) throw new Error("User creation failed");

//   // create user profile
//   const { error: userError } = await supabase.from("users").insert({
//     id: userId,
//     name,
//     email,
//     password_set: false,
//     is_active: true,
//   });

//   if (userError) throw userError;

//   // assign editor role
//   const { error: roleError } = await supabase.from("user_roles").insert({
//     user_id: userId,
//     role: "editor",
//   });

//   if (roleError) throw roleError;

//   return userId;
// };

export const createEditor = async (
  name: string,
  email: string,
  tempPassword: string,
) => {
  const userId = crypto.randomUUID();

  // create profile
  const { error: userError } = await supabase.from("users").insert({
    id: userId,
    name,
    email,
    password_set: false,
    is_active: true,
  });

  if (userError) throw userError;

  // assign role
  const { error: roleError } = await supabase.from("user_roles").insert({
    user_id: userId,
    role: "editor",
  });

  if (roleError) throw roleError;

  return userId;
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
