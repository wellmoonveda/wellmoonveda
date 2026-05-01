import { useState, useRef } from "react";
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
import toast from "react-hot-toast";
import { useCategories } from "@/modules/blog/hooks/useCategories";
import { getDashboardRouteByRole } from "@/modules/auth/utils/roleRedirect";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { saveDraft, updateDraft, loading, publish, submitForReview } =
    usePostEditor();

  const { categories } = useCategories();

  const auth = useAuth();
  const user = auth?.user;
  const authorId = user?.id;
  const { role, loading: roleLoading } = useUserRole();

  const [title, setTitle] = useState("");
  const [postId, _setPostId] = useState<string | null>(null);
  const postIdRef = useRef<string | null>(null);
  const isSavingRef = useRef(false);

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

  const categoryName = categories.find((cat) => cat.id === categoryId)?.name;

  const generateSlug = (value: string) => {
    const baseSlug = value
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    return `${baseSlug}-${Date.now()}`;
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

  const setPostId = (id: string | null) => {
    postIdRef.current = id;
    _setPostId(id);
  };

  // ---------------- SAVE DRAFT ----------------

  const handleSave = async () => {
    if (!authorId) {
      toast.error("User not loaded yet");
      return;
    }

    try {
      if (!postIdRef.current) {
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
        await updateDraft(postIdRef.current, {
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

      toast.success("Draft saved");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to save draft";
      toast.error(message);
    }
  };

  // ---------------- PUBLISH ----------------
  const handlePublish = async () => {
    if (!authorId) return;
    let currentPostId = postId;

    // Ensure draft exists before publishing
    try {
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

      toast.success("Post published");

      if (roleLoading || !role) {
        toast.error("User role not ready. Please try again.");
        return;
      }

      const redirectPath = getDashboardRouteByRole(role);

      if (!redirectPath) return;

      navigate(redirectPath);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to publish post";
      toast.error(message);
    }
  };

  // ---------------- SUBMIT FOR REVIEW ----------------
  const handleSubmitReview = async () => {
    if (!authorId) return;

    let currentPostId = postId;

    try {
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

      toast.success("Submitted for review");
      const redirectPath = getDashboardRouteByRole(role);

      if (!redirectPath) return;

      navigate(redirectPath);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit for review";
      toast.error(message);
    }
  };

  // ---------------- AUTOSAVE ----------------

  const autosave = async () => {
    if (
      !authorId ||
      (!title && !contentState) ||
      previewOpen ||
      isSavingRef.current
    )
      return;

    try {
      isSavingRef.current = true;

      if (!postIdRef.current) {
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
        await updateDraft(postIdRef.current, {
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
    } finally {
      isSavingRef.current = false;
    }
  };
  const { triggerSave, status } = useAutosaveDraft(autosave, 3000);

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
            className="btn-secondary px-4 py-1 rounded text-white"
          >
            Preview
          </button>

          <button
            onClick={handleSave}
            className="btn-secondary px-4 py-1 rounded text-white"
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
                  className="btn-primary px-4 py-1 rounded text-white"
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
            onChange={(editorState, html) => {
              const json = editorState.toJSON();
              setContentState(json);
              setPreviewHtml(html);
              saveDraftBackup({
                title,
                content: json,
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
        categoryName={categoryName || ""}
        tags={tags}
        content={previewHtml}
      />
    </div>
  );
};

export default CreatePostPage;
