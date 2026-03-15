import { supabase } from "./supabaseClient";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Submit contact form message
 */
export const submitContactMessage = async (data: ContactMessageInput) => {
  const { error } = await supabase.from("messages").insert([
    {
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    },
  ]);

  if (error) {
    throw error;
  }
};

/**
 * Fetch all messages (Admin)
 */
export const fetchMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as ContactMessage[];
};
