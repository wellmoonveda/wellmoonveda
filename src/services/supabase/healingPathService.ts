import { supabase } from "./supabaseClient";

export interface Mudra {
  id: string;
  title: string;
  path_id: string;
  image: string;
}

export interface HealingPath {
  id: string;
  title: string;
  description: string;
  slug: string;
  matchReason?: string;
  mudras?: Mudra[];
  sessions?: {
    id: string;
    title: string;
  }[];
}

export const searchHealingPaths = async (
  query: string,
): Promise<HealingPath[]> => {
  // 1. Base healing path search
  const { data: basePaths, error: baseError } = await supabase
    .from("healing_paths")
    .select("id, title, description, slug")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(6);

  if (baseError) throw baseError;

  let results: HealingPath[] = basePaths ?? [];

  // 2. SESSION SEARCH (always run)
  const { data: sessionPaths, error: sessionError } = await supabase
    .from("healing_sessions")
    .select("id, title, path_id")
    .ilike("title", `%${query}%`)
    .limit(6);

  if (sessionError) throw sessionError;

  const sessionsByPath = new Map<string, { id: string; title: string }[]>();

  sessionPaths?.forEach((session) => {
    const existing = sessionsByPath.get(session.path_id) || [];
    sessionsByPath.set(session.path_id, [
      ...existing,
      { id: session.id, title: session.title },
    ]);
  });

  // 3. CONDITION → MUDRA SEARCH
  const { data: matchedConditions, error: conditionError } = await supabase
    .from("conditions")
    .select("id, name")
    .ilike("name", `%${query}%`)
    .limit(5);

  if (conditionError) throw conditionError;

  if (matchedConditions && matchedConditions.length > 0) {
    const conditionIds = matchedConditions.map((c) => c.id);

    // get mudra ids
    const { data: conditionMudras, error: cmError } = await supabase
      .from("condition_mudras")
      .select("mudra_id")
      .in("condition_id", conditionIds);

    if (cmError) throw cmError;

    const mudraIds = [
      ...new Set(conditionMudras.map((cm) => cm.mudra_id)),
    ];

    if (mudraIds.length > 0) {
      // fetch mudras
      const { data: mudras, error: mudraError } = await supabase
        .from("mudras")
        .select("id, title, image, path_id")
        .in("id", mudraIds)
        .limit(6);

      if (mudraError) throw mudraError;

      // fetch mudra healing path
      const { data: mudraPath, error: pathError } = await supabase
        .from("healing_paths")
        .select("id, title, description, slug")
        .eq("slug", "mudra-healing")
        .single();

      if (pathError) throw pathError;

      const exists = results.some((p) => p.id === mudraPath.id);

      const enhancedPath: HealingPath = {
        ...mudraPath,
        mudras: mudras ?? [],
        matchReason: `Matched condition: ${matchedConditions[0].name}`,
      };

      if (!exists) {
        results = [enhancedPath, ...results];
      } else {
        results = results.map((p) =>
          p.id === mudraPath.id ? { ...p, ...enhancedPath } : p
        );
      }
    }
  }

  // 4. Attach sessions to all paths
  return results.map((path) => ({
    ...path,
    sessions: sessionsByPath.get(path.id) || [],
  }));
};
