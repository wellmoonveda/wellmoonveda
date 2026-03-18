import { useState } from "react";
import Editor from "@/editor-system/lexical/Editor";
import { usePostEditor } from "../hooks/usePostEditor";
import { saveDraftBackup } from "../utils/draftRecovery";
import PostFeaturedImage from "../components/PostFeaturedImage";
import PostTagsInput from "../components/PostTagsInput";
import PostSEOFields from "../components/PostSEOFields";
import PostCategorySelect from "../components/PostCategorySelect";
import PostPreviewModal from "../components/PostPreviewModal";
import { useAuth } from "@/modules/auth";
import { useAutosaveDraft } from "../hooks/useAutosaveDraft";
import { loadDraftBackup, clearDraftBackup } from "../utils/draftRecovery";
import { useUserRole } from "@/modules/auth/hooks/useUserRole";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { saveDraft, updateDraft, loading, publish, submitForReview } =
    usePostEditor();

  const auth = useAuth();
  const user = auth?.user;
  const authorId = user?.id;
  const { role, loading: roleLoading } = useUserRole();

  const [title, setTitle] = useState("");
  const [postId, setPostId] = useState<string | null>(null);
  const [postType, setPostType] = useState<"normal" | "featured">("normal");

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

    triggerSave();
  };

  const handleFeaturedImageChange = (url: string | null) => {
    setFeaturedImage(url);
    triggerSave();
  };

  // ---------------- SAVE DRAFT ----------------

  const handleSave = async () => {
    if (!authorId) {
      console.error("User not loaded yet");
      return;
    }

    if (!postId) {
      const post = await saveDraft(title, contentState, authorId, slug, {
        post_type: postType,
        featured_image: featuredImage || undefined,
        tags,
        meta_title: metaTitle,
        meta_description: metaDescription,
        category_id: categoryId,
      });

      if (post?.id) setPostId(post.id);
    } else {
      await updateDraft(postId, {
        title,
        content: contentState,
        slug,
        post_type: postType,
        featured_image: featuredImage || undefined,
        tags,
        meta_title: metaTitle,
        meta_description: metaDescription,
        category_id: categoryId,
      });
    }
  };

  // ---------------- PUBLISH ----------------
  const handlePublish = async () => {
    if (!authorId) return;
    let currentPostId = postId;
    // Ensure draft exists before publishing
    if (!currentPostId) {
      const post = await saveDraft(title, contentState, authorId, slug, {
        post_type: postType,
        featured_image: featuredImage || undefined,
        tags,
        meta_title: metaTitle,
        meta_description: metaDescription,
        category_id: categoryId,
      });
      if (post?.id) {
        setPostId(post.id);
        currentPostId = post.id;
      }
    }
    if (!currentPostId) return;
    await publish(currentPostId);

    // Optional UX improvement
    navigate("/dashboard/posts/create");
  };

  // ---------------- SUBMIT FOR REVIEW ----------------
  const handleSubmitReview = async () => {
    if (!authorId) return;

    let currentPostId = postId;

    if (!currentPostId) {
      const post = await saveDraft(title, contentState, authorId, slug, {
        post_type: postType,
        featured_image: featuredImage || undefined,
        tags,
        meta_title: metaTitle,
        meta_description: metaDescription,
        category_id: categoryId,
      });
      if (post?.id) {
        setPostId(post.id);
        currentPostId = post.id;
      }
    }
    if (!currentPostId) return;
    await submitForReview(currentPostId);
  };

  // ---------------- AUTOSAVE ----------------

  const autosave = async () => {
    if (!authorId) return;
    if (!title && !contentState) return;
    if (previewOpen) return;

    try {
      if (!postId) {
        const post = await saveDraft(title, contentState, authorId, slug, {
          post_type: postType,
          featured_image: featuredImage || undefined,
          tags,
          meta_title: metaTitle,
          meta_description: metaDescription,
          category_id: categoryId,
        });

        if (post?.id) {
          setPostId(post.id);
        }
      } else {
        await updateDraft(postId, {
          title,
          content: contentState,
          slug,
          featured_image: featuredImage || undefined,
          tags,
          meta_title: metaTitle,
          meta_description: metaDescription,
          category_id: categoryId,
        });
      }
    } catch (error) {
      console.error("Autosave failed:", error);
    }
  };
  const { triggerSave, status } = useAutosaveDraft(autosave, 20000);

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  // ---------------- DRAFT RECOVERY ----------------

  useEffect(() => {
    const backup = loadDraftBackup();

    if (!backup) return;

    const restore = confirm(
      "We found unsaved content from your previous session. Restore draft?",
    );

    if (restore) {
      setTitle(backup.title || "");
      setContentState(backup.content || null);
      setPreviewHtml(backup.html || "");
      setFeaturedImage(backup.featuredImage || null);
      setTags(backup.tags || []);
      setCategoryId(backup.categoryId);
      setMetaTitle(backup.metaTitle || "");
      setMetaDescription(backup.metaDescription || "");
      setSlug(backup.slug || "");
    }

    clearDraftBackup();
  }, []);

  return (
    <div className="dashboard-theme space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-main">Create Post</h1>

        <div className="flex items-center gap-4">
          {/* autosave indicator */}

          <div className="text-sm text-muted min-w-[90px]">
            {status === "typing" && "Typing..."}
            {status === "saving" && "Saving..."}
            {status === "saved" && "Saved ✓"}
            {status === "error" && "Autosave failed"}
          </div>

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

          {/* ROLE BASED BUTTONS */}

          {roleLoading ? (
            <div className="text-sm text-muted">Loading role...</div>
          ) : (
            <>
              {role === "admin" && (
                <button
                  onClick={handlePublish}
                  className="btn-prime px-4 py-2 rounded text-white"
                >
                  {" "}
                  Publish{" "}
                </button>
              )}

              {role !== "admin" && (
                <button
                  onClick={handleSubmitReview}
                  className="btn-prime px-4 py-2 rounded text-white"
                >
                  {" "}
                  Submit for Review{" "}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT EDITOR */}

        <div className="col-span-2 card p-6 space-y-4">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="text-xl font-semibold outline-none w-full resize-none leading-tight line-clamp-2"
          />

          <Editor
            onChange={(state, html) => {
              setContentState(state);
              setPreviewHtml(html);

              saveDraftBackup({
                title,
                content: state,
                html,
                featuredImage,
                tags,
                categoryId,
                metaTitle,
                metaDescription,
                slug,
              });

              triggerSave();
            }}
          />
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-4">
          <div className="card p-4">
            <label className="block text-sm font-medium mb-2">Post Type</label>

            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as any)}
              className="w-full border-main rounded px-3 py-2"
            >
              <option value="normal">Normal Post</option>
              <option value="featured">Featured Post</option>
            </select>
          </div>
          <PostFeaturedImage
            value={featuredImage || undefined}
            onChange={handleFeaturedImageChange}
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
