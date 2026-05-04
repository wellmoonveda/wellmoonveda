import { supabase } from "./supabaseClient";
import type { HealingPath } from "@/modules/healing-paths/types/healing.types";

export const getHealingPaths = async (): Promise<HealingPath[]> => {
  const { data, error } = await supabase
    .from("healing_paths")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    thumbnail: item.thumbnail,
    slug: item.slug,
    created_at: item.created_at,
    intro_content: item.intro_content ?? null,
  }));
};

export const getHealingPathBySlug = async (
  slug: string,
): Promise<HealingPath | null> => {
  const { data, error } = await supabase
    .from("healing_paths")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    thumbnail: data.thumbnail,
    slug: data.slug,
    created_at: data.created_at,
    intro_content: data.intro_content ?? null,
  };
};
