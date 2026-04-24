import MudraCard from "@/modules/healing-paths/components/MudraCard";
import { supabase } from "./supabaseClient";

export const getHealingSessions = async (pathId: string) => {
  const { data, error } = await supabase
    .from("healing_sessions")
    .select("*")
    .eq("path_id", pathId)
    .order("order_index", { ascending: true });

  if (error) throw error;

  return data ?? [];
};

export const getMudras = async (pathId: string) => {
  const { data, error } = await supabase
    .from("mudras")
    .select("*")
    .eq("path_id", pathId)
    .order("order_index", { ascending: true });

  if (error) throw error;

  const mappedData = data?.map((mudra) => {
    const publicUrl = supabase.storage
      .from("mudras")
      .getPublicUrl(mudra.image).data.publicUrl;

    return {
      ...mudra,
      image: publicUrl,
    };
  }) ?? [];

  return mappedData;
};
