export type GetMediaParams = {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export type MediaItem = {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
};
