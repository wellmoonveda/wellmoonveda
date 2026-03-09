import { useState } from "react";
import Editor from "@/editor-system/lexical/Editor";
import { usePostEditor } from "../hooks/usePostEditor";

import PostFeaturedImage from "../components/PostFeaturedImage";
import PostTagsInput from "../components/PostTagsInput";
import PostSEOFields from "../components/PostSEOFields";
import PostCategorySelect from "../components/PostCategorySelect";
import PostPreviewModal from "../components/PostPreviewModal";
import { $generateHtmlFromNodes } from "@lexical/html";

const CreatePostPage = () => {
  const { saveDraft, loading } = usePostEditor();

  const authorId = "TEMP_USER_ID";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [contentState, setContentState] = useState<any>(null);
  const [previewHtml, setPreviewHtml] = useState("");

  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState<string | undefined>();

  const [tags, setTags] = useState<string[]>([]);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [slug, setSlug] = useState("");

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    await saveDraft(title, content, authorId, slug, {
      featured_image: featuredImage || undefined,
      tags,
      meta_title: metaTitle,
      meta_description: metaDescription,
      category_id: categoryId,
    });
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <div className="dashboard-theme space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-main">Create Post</h1>

        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            className="btn-secondary px-4 py-2 rounded text-white"
          >
            Preview
          </button>

          <button
            onClick={handleSave}
            className="btn-prime px-4 py-2 rounded text-white"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT EDITOR */}

        <div className="col-span-2 card p-6 space-y-4">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="text-xl font-semibold outline-none"
          />

          <Editor
            onChange={(state, html) => {
              setContentState(state);
              setPreviewHtml(html);
            }}
          />
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-4">
          <PostFeaturedImage
            value={featuredImage || undefined}
            onChange={setFeaturedImage}
          />

          <PostCategorySelect value={categoryId} onChange={setCategoryId} />

          <PostTagsInput value={tags} onChange={setTags} />

          <PostSEOFields
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            slug={slug}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
            onSlugChange={setSlug}
          />
        </div>
      </div>

      <PostPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={title}
        featuredImage={featuredImage}
        categoryName={categoryId}
        tags={tags}
        content={previewHtml}
      />
    </div>
  );
};

export default CreatePostPage;
