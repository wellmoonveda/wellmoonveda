export type HealingPathUsageRow = {
  path_id: string;
  created_at: string;
  healing_paths: {
    title: string | null;
  }[];
};

export type EditorActivityRow = {
  author_id: string;
  created_at: string;
  users: {
    name: string | null;
  }[];
};

export type SubscriptionRow = {
  created_at: string;
};
