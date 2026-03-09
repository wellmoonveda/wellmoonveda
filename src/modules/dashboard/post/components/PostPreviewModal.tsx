interface Props {
  open: boolean;
  onClose: () => void;

  title: string;
  featuredImage?: string | null;
  categoryName?: string;
  tags?: string[];
  content?: any;
}

const PostPreviewModal = ({
  open,
  onClose,
  title,
  featuredImage,
  categoryName,
  tags,
  content,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card w-[800px] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        {/* Header */}

        <div className="flex justify-between items-center p-4 border-b border-main">
          <h2 className="font-semibold text-main">Post Preview</h2>

          <button
            onClick={onClose}
            className="btn-secondary px-3 py-1 rounded text-white"
          >
            Close
          </button>
        </div>

        {/* Content */}

        <div className="p-6 space-y-6">
          {/* Title */}

          <h1 className="text-3xl font-bold text-main">{title}</h1>

          {/* Featured Image */}

          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full rounded-md"
            />
          )}

          {/* Category */}

          {categoryName && (
            <p className="text-sm text-sub">
              Category: <strong>{categoryName}</strong>
            </p>
          )}

          {/* Tags */}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-soft px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}

          <div className="prose max-w-none text-main">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewModal;
