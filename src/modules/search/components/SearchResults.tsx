import type { HealingPath } from "@/services/supabase/healingPathService";
import type { SearchPostResult } from "@/services/supabase/post.service";
import HealingPathResults from "./HealingPathResults";
import BlogResults from "./BlogResults";

interface Props {
  healingPaths: HealingPath[];
  blogPosts: SearchPostResult[];
  loading: boolean;
  isSubscribed: boolean;
}

const SearchResults = ({
  healingPaths,
  blogPosts,
  loading,
  isSubscribed,
}: Props) => {
  if (loading) {
    return <p className="mt-4">Loading...</p>;
  }

  const isEmpty = healingPaths.length === 0 && blogPosts.length === 0;

  if (isEmpty) {
    return <p className="mt-4">No results found</p>;
  }

  return (
    <div className="mt-6 space-y-8">
      <HealingPathResults
        healingPaths={healingPaths}
        isSubscribed={isSubscribed}
      />
      <BlogResults blogPosts={blogPosts} />
    </div>
  );
};

export default SearchResults;
