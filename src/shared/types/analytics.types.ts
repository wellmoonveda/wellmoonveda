export interface HealingPathUsage {
  path_slug: string;
  views: number;
}

export interface EditorActivity {
  title: string;
  updated_at?: string;
  author_id?: string;
}

export interface EditorPublishingStat {
  name: string;
  posts: number;
}

export interface RecentPost {
  id: string;
  title: string;
  author_id?: string;
  created_at?: string;
}

export interface SubscriptionGrowth {
  date: string;
  subscriptions: number;
}

export type AnalyticsTimeRange = "7d" | "30d" | "90d" | "all";

export interface AdminAnalyticsData {
  subscriberCount: number | null;
  totalUsers: number | null;
  activeSubscriptions: number | null;
  healingPaths: HealingPathUsage[];
  editorActivity: number | null;
  editorPublishing: EditorPublishingStat[];
  recentPosts: RecentPost[];
  subscriptionGrowth: SubscriptionGrowth[];
  loading: boolean;
}
