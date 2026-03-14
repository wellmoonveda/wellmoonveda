export type ReviewPost = {
  id: string;
  title: string;
  created_at: string;
  author_id: string;

  users: {
    name: string;
    email: string;
  }[];
};
