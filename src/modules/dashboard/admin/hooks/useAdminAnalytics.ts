import { useEffect, useState } from "react";
import {
  getSubscriberCount,
  getHealingPathUsage,
  getEditorActivity,
  getActiveSubscriptionsCount,
  getEditorPublishingActivity,
  getRecentPublishedPosts,
  getTotalUsers,
  getSubscriptionGrowth,
} from "@/services/supabase/analytics.service";

import type {
  HealingPathUsage,
  EditorActivity,
  EditorPublishingStat,
  RecentPost,
  AdminAnalyticsData,
  SubscriptionGrowth,
  AnalyticsTimeRange,
} from "@/shared/types/analytics.types";

const analyticsCache: Record<string, AdminAnalyticsData> = {};
let lastFetchTime = 0;

const CACHE_DURATION = 60 * 1000; // 60 seconds

export const useAdminAnalytics = (
  timeRange: AnalyticsTimeRange = "30d",
): AdminAnalyticsData => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState<number | null>(
    null,
  );
  const [subscriptionGrowth, setSubscriptionGrowth] = useState<
    SubscriptionGrowth[]
  >([]);
  const [healingPaths, setHealingPaths] = useState<HealingPathUsage[]>([]);
  const [editorActivity, setEditorActivity] = useState<EditorActivity[]>([]);
  const [editorPublishing, setEditorPublishing] = useState<
    EditorPublishingStat[]
  >([]);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    const now = Date.now();

    let startDate: string | undefined = undefined;

    if (timeRange !== "all") {
      const days = {
        "7d": 7,
        "30d": 30,
        "90d": 90,
      }[timeRange];

      const date = new Date();
      date.setDate(date.getDate() - days);

      startDate = date.toISOString();
    }

    const cacheKey = timeRange;

    if (analyticsCache[cacheKey] && now - lastFetchTime < CACHE_DURATION) {
      const cached = analyticsCache[cacheKey];

      setSubscriberCount(cached.subscriberCount);
      setTotalUsers(cached.totalUsers);
      setActiveSubscriptions(cached.activeSubscriptions);
      setHealingPaths(cached.healingPaths);
      setEditorActivity(cached.editorActivity);
      setEditorPublishing(cached.editorPublishing);
      setRecentPosts(cached.recentPosts);
      setSubscriptionGrowth(cached.subscriptionGrowth);

      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [
        subs,
        paths,
        activity,
        activeSubs,
        publishingStats,
        posts,
        usersCount,
        growth,
      ] = await Promise.all([
        getSubscriberCount(),
        getHealingPathUsage(startDate),
        getEditorActivity(startDate),
        getActiveSubscriptionsCount(startDate),
        getEditorPublishingActivity(startDate),
        getRecentPublishedPosts(),
        getTotalUsers(),
        getSubscriptionGrowth(startDate),
      ]);

      setSubscriberCount(subs);
      setHealingPaths(paths);
      setEditorActivity(activity ?? []);
      setActiveSubscriptions(activeSubs);
      setEditorPublishing(publishingStats);
      setRecentPosts(posts);
      setTotalUsers(usersCount);
      setSubscriptionGrowth(growth);

      analyticsCache[cacheKey] = {
        subscriberCount: subs,
        totalUsers: usersCount,
        activeSubscriptions: activeSubs,
        healingPaths: paths,
        editorActivity: activity ?? [],
        editorPublishing: publishingStats,
        recentPosts: posts,
        subscriptionGrowth: growth,
        loading: false,
      };

      lastFetchTime = Date.now();
    } catch (error) {
      console.error("Analytics error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return {
    subscriberCount,
    healingPaths,
    editorActivity,
    loading,
    activeSubscriptions,
    editorPublishing,
    recentPosts,
    totalUsers,
    subscriptionGrowth,
  };
};
