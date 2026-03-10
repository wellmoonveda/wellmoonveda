import { supabase } from "./supabaseClient";

const BUCKET = "media";

export const getMedia = async ({
  search = "",
  category = "",
  page = 1,
  limit = 12,
}) => {
  let query = supabase.from("media").select("*", { count: "exact" });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    media: data ?? [],
    total: count ?? 0,
  };
};

//upload media file and insert record in db
export const uploadMedia = async (
  file: File,
  title: string,
  category: string,
) => {
  const filePath = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  const { error: insertError } = await supabase.from("media").insert({
    title,
    category,
    url: data.publicUrl,
  });

  if (insertError) throw insertError;

  return data.publicUrl;
};

//delete media by id and file path
export const deleteMedia = async (id: string, filePath: string) => {
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([filePath]);

  if (storageError) throw storageError;

  const { error: dbError } = await supabase.from("media").delete().eq("id", id);

  if (dbError) throw dbError;
};
