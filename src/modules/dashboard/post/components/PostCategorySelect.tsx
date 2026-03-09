import { useCategories } from "../hooks/useCategories";

interface Props {
  value?: string;
  onChange: (categoryId: string) => void;
}

const PostCategorySelect = ({ value, onChange }: Props) => {
  const { categories, loading } = useCategories();

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-main">Category</h3>

      {loading ? (
        <div className="h-8 bg-soft animate-pulse rounded"></div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-main border px-2 py-2 rounded w-full"
        >
          <option value="">Select category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PostCategorySelect;
