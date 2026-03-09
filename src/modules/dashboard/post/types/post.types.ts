export type PostStatus =
  | "draft"
  | "review_requested"
  | "approved"
  | "published"
  | "rejected";

export interface Post {
  id: string;

  title: string;
  slug: string;

  content: any;

  status: PostStatus;

  author_id: string;

  featured_image?: string;
  category_id?: string;

  tags?: string[];

  meta_title?: string;
  meta_description?: string;

  created_at: string;
  updated_at?: string;

  feedback?: string;
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  content: any;

  featured_image?: string;
  category_id?: string;

  tags?: string[];

  meta_title?: string;
  meta_description?: string;
}
