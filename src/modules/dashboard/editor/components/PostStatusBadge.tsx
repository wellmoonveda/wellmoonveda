import type { PostStatus } from "../../post/types/post.types";

interface Props {
  status: PostStatus;
}

const PostStatusBadge = ({ status }: Props) => {
  const base =
    "inline-block px-2 py-1 text-xs rounded-full font-medium capitalize";

  const styles: Record<PostStatus, string> = {
    draft: "bg-soft text-main",
    review_requested: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    published: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const label = status.replace("_", " ");

  return <span className={`${base} ${styles[status]}`}>{label}</span>;
};

export default PostStatusBadge;
