export type HealingPathActivity = {
  user_id: string;
  content_id: string;
  content_type: "healing_path";
  last_accessed: string;
  path: {
    id: string;
    title: string;
    slug: string;
  } | null;
};

export type BlogActivity = {
  user_id: string;
  content_id: string;
  content_type: "blog_post";
  last_accessed: string;
  post: {
    id: string;
    title: string;
    slug: string;
  } | null;
};

export type HealingPathProgress = {
  user_id: string;
  path_id: string;
  last_accessed: string;
};

export type DashboardStats = {
  startedPaths: number;
  recentPath?: HealingPathProgress;
};
