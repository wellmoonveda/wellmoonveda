import { supabase } from "./supabaseClient";

export const getHealingPaths = async () => {
  const { data, error } = await supabase
    .from("healing_paths")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
};

export const getHealingPathBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("healing_paths")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data;
};
