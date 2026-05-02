import { supabase } from "./supabaseClient";
import type {
  GetMediaParams,
  MediaItem,
} from "@/modules/dashboard/media/types/media.types";

const BUCKET = "media";

/* FETCH MEDIA */

export const getMedia = async ({
  search = "",
  category = "",
  page = 1,
  limit = 12,
}: GetMediaParams = {}): Promise<{
  media: MediaItem[];
  total: number;
}> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("media")
    .select("id,title,url,category,created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    media: data ?? [],
    total: count ?? 0,
  };
};

/* UPLOAD MEDIA */

export const uploadMedia = async (
  file: File,
  title: string,
  category: string,
  uploadedBy?: string,
) => {
  const filePath = `${Date.now()}-${file.name}`;

  /* Upload file to storage */

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  /* Get public URL */

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  const publicUrl = data.publicUrl;

  /* Insert metadata */

  const { error: insertError } = await supabase.from("media").insert({
    title,
    category,
    url: publicUrl,
    uploaded_by: uploadedBy ?? null,
    size: file.size,
  });

  if (insertError) throw insertError;

  return publicUrl;
};

/* DELETE MEDIA */

export const deleteMedia = async (id: string, url: string) => {
  /* CHECK IF MEDIA IS USED IN POSTS */

  const { data: usedInPosts } = await supabase
    .from("posts")
    .select("id")
    .eq("featured_image", url)
    .limit(1);

  if (usedInPosts && usedInPosts.length > 0) {
    throw new Error("This image is used in a post and cannot be deleted.");
  }

  /* DELETE FROM STORAGE */

  const filePath = url.split("/").pop();

  if (!filePath) throw new Error("Invalid file path");

  const { error: storageError } = await supabase.storage
    .from("media")
    .remove([filePath]);

  if (storageError) throw storageError;

  /* DELETE FROM DATABASE */

  const { error: dbError } = await supabase.from("media").delete().eq("id", id);

  if (dbError) throw dbError;
};
