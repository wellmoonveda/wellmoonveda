interface Props {
  metaTitle: string;
  metaDescription: string;
  slug: string;

  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onSlugChange: (v: string) => void;
}

const PostSEOFields = ({
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
}: Props) => {
  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-main">SEO</h3>

      <div>
        <label className="text-xs text-muted">Meta Title</label>
        <input
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          className="border-main border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label className="text-xs text-muted">Meta Description</label>
        <textarea
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          className="border-main border px-2 py-1 rounded w-full"
          rows={3}
        />
      </div>

      <div>
        <label className="text-xs text-muted">Slug</label>
        <input
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          className="border-main border px-2 py-1 rounded w-full"
        />
      </div>
    </div>
  );
};

export default PostSEOFields;
