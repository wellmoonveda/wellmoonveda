import { useEffect, useState } from "react";
import {
  requestPostDeletion,
  getDeletionRequests,
} from "@/services/supabase/post.service";

interface DeletionRequest {
  id: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  posts: {
    id: string;
    title: string;
  }[];
}

export const useDeletionRequests = (authorId: string) => {
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    if (!authorId) return;

    setLoading(true);

    try {
      const data = await getDeletionRequests(authorId);
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch deletion requests", error);
    } finally {
      setLoading(false);
    }
  };

  const submitDeletionRequest = async (postId: string, reason: string) => {
    try {
      await requestPostDeletion(postId, reason, authorId);
      await fetchRequests();
    } catch (error) {
      console.error("Deletion request failed", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [authorId]);

  return {
    requests,
    loading,
    submitDeletionRequest,
    refreshRequests: fetchRequests,
  };
};
