import { supabase } from "./supabaseClient";

export async function getUserDashboardData(userId: string) {
  const { data: progress, error } = await supabase
    .from("healing_path_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  const startedPaths = progress?.length || 0;

  const recentPath = progress?.sort(
    (a, b) =>
      new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime(),
  )[0];

  return {
    startedPaths,
    recentPath,
  };
}
