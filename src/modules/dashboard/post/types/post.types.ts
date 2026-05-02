export type PostStatus =
  | "draft"
  | "review_requested"
  | "approved"
  | "published"
  | "rejected"
  | "request_revision"
  | "needs_revision";

export interface Post {
  id: string;

  title: string;
  slug: string;

  content: string;

  status: PostStatus;

  author_id: string;

  featured_image?: string | null;
  category_id?: string | null;

  tags?: string[];

  meta_title?: string;
  meta_description?: string;

  created_at: string;
  updated_at?: string | null;

  feedback?: string;
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  content: string;

  featured_image?: string | null;
  category_id?: string | null;

  tags?: string[];

  meta_title?: string;
  meta_description?: string;
}

export type AdminPost = Post & {
  role: "admin" | "editor" | "unknown";
};

export type AdminPostListItem = {
  id: string;
  title: string;
  status: PostStatus;
  author_id: string;
  created_at: string;
  role: "admin" | "editor" | "unknown";

  users?: {
    name: string;
    email: string;
  }[];
};

export type AutosaveStatus = "idle" | "typing" | "saving" | "saved" | "error";
