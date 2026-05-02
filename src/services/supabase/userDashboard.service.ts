import { supabase } from "./supabaseClient";
import type { HealingPathProgress } from "@/shared/types/users.types";

export async function getUserDashboardData(userId: string) {
  const { data: progress, error } = await supabase
    .from("healing_path_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  const typedProgress: HealingPathProgress[] = progress ?? [];

  const startedPaths = typedProgress.length;

  const recentPath = typedProgress.sort(
    (a, b) =>
      new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime(),
  )[0];

  return {
    startedPaths,
    recentPath,
  };
}
