import { useEffect, useState } from "react";
import { fetchMessages } from "@/services/supabase/contact.service";
import type { ContactMessage } from "@/services/supabase/contact.service";

interface UseMessagesReturn {
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
  refreshMessages: () => Promise<void>;
}

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMessages();
      setMessages(data);
    } catch (err: unknown) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    refreshMessages: loadMessages,
  };
};
