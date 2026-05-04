import { useNavigate } from "react-router-dom";
import type { SearchPostResult } from "@/services/supabase/post.service";

interface Props {
  blogPosts: SearchPostResult[];
}

const BlogResults = ({ blogPosts }: Props) => {
  const navigate = useNavigate();

  if (blogPosts.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Blog Posts</h2>

      <div className="space-y-3">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogResults;
