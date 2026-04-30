import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { useSubscription } from "@/modules/dashboard/user/hooks/useSubscription";
import { useAuth } from "@/modules/auth";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { healingPaths, blogPosts, loading } = useSearch(query);

  const { user } = useAuth();

  const { isSubscribed, loading: subscriptionLoading } = useSubscription(
    user?.id,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <SearchInput />

      {loading || subscriptionLoading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <SearchResults
          healingPaths={healingPaths}
          blogPosts={blogPosts}
          loading={loading}
          isSubscribed={isSubscribed}
        />
      )}
    </div>
  );
};

export default SearchPage;
