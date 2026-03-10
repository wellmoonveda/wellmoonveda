import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Editor from "@/editor-system/lexical/Editor";

import {
  getPostById,
  submitPostForReview,
} from "@/services/supabase/post.service";
import { usePostEditor } from "../hooks/usePostEditor";
import { useAuthUser } from "@/modules/auth/hooks/useAuthUser";

import PostFeaturedImage from "../components/PostFeaturedImage";
import PostTagsInput from "../components/PostTagsInput";
import PostSEOFields from "../components/PostSEOFields";
import PostCategorySelect from "../components/PostCategorySelect";
import PostPreviewModal from "../components/PostPreviewModal";

const EditPostPage = () => {
  const { id } = useParams();

  const { updateDraft, loading } = usePostEditor();
  const { user } = useAuthUser();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [contentState, setContentState] = useState<any>(null);
  const [previewHtml, setPreviewHtml] = useState("");

  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);

  const [initialContent, setInitialContent] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const post = await getPostById(id);

        setTitle(post.title);
        setSlug(post.slug);

        setInitialContent(post.content);

        setFeaturedImage(post.featured_image ?? null);
        setTags(post.tags ?? []);

        setCategoryId(post.category_id ?? undefined);

        setMetaTitle(post.meta_title ?? "");
        setMetaDescription(post.meta_description ?? "");
      } catch (error) {
        console.error("Failed to load post", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    if (!id) return;

    await updateDraft(id, {
      title,
      slug,
      content: contentState,
      featured_image: featuredImage,
      tags,
      category_id: categoryId,
      meta_title: metaTitle,
      meta_description: metaDescription,
    });
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!id) return;

    await submitPostForReview(id);
  };

  return (
    <div className="dashboard-theme space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-main">Edit Post</h1>

        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            className="btn-secondary px-4 py-2 rounded text-white"
          >
            Preview
          </button>

          <button
            onClick={handleUpdate}
            className="btn-secondary px-4 py-2 rounded text-white"
          >
            {loading ? "Saving..." : "Update Draft"}
          </button>

          <button
            onClick={handleSubmitReview}
            className="btn-prime px-4 py-2 rounded text-white"
          >
            Submit for Review
          </button>
        </div>
      </div>

      {/* Layout */}

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT EDITOR */}

        <div className="col-span-2 card p-6 space-y-4">
          <input
            type="text"
            value={title}
            placeholder="Post title..."
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold outline-none"
          />

          {initialContent !== null && (
            <Editor
              initialContent={initialContent}
              onChange={(state, html) => {
                setContentState(state);
                setPreviewHtml(html);
              }}
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-4">
          <PostFeaturedImage
            value={featuredImage}
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

      {/* Preview Modal */}

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

export default EditPostPage;
