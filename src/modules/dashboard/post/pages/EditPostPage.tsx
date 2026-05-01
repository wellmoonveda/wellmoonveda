import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Editor from "@/editor-system/lexical/Editor";
import { getPostById } from "@/services/supabase/post.service";
import { usePostEditor } from "../hooks/usePostEditor";
import { useAuth } from "@/modules/auth";
import { useUserRole } from "@/modules/auth/hooks/useUserRole";

import PostFeaturedImage from "../components/PostFeaturedImage";
import PostTagsInput from "../components/PostTagsInput";
import PostSEOFields from "../components/PostSEOFields";
import PostCategorySelect from "../components/PostCategorySelect";
import PostPreviewModal from "../components/PostPreviewModal";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateDraft, loading, submitForReview, publish } = usePostEditor();

  const auth = useAuth();
  const user = auth?.user;
  const { role, loading: roleLoading } = useUserRole();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<String>("draft");

  const [contentState, setContentState] = useState<any>(null);
  const [previewHtml, setPreviewHtml] = useState("");

  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);

  const [initialContent, setInitialContent] = useState<any>(null);
  const [postType, setPostType] = useState<"normal" | "featured">("normal");

  // ---------------- FETCH POST ----------------
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const post = await getPostById(id);

        setTitle(post.title);
        setSlug(post.slug);
        setStatus(post.status);

        setInitialContent(post.content);

        setFeaturedImage(post.featured_image ?? null);
        setTags(post.tags ?? []);

        setCategoryId(post.category_id ?? undefined);

        setMetaTitle(post.meta_title ?? "");
        setMetaDescription(post.meta_description ?? "");
        setPostType(post.post_type ?? "normal");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to load post";
        toast.error(message);
      }
    };

    fetchPost();
  }, [id]);

  if (roleLoading) return null;

  // ---------------- UPDATE ----------------

  const handleUpdate = async () => {
    if (!id) return;

    try {
      await updateDraft(id, {
        title,
        slug,
        content: contentState,
        featured_image: featuredImage,
        tags,
        category_id: categoryId,
        meta_title: metaTitle,
        meta_description: metaDescription,
        post_type: postType,
      });

      toast.success("Draft updated");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update draft";
      toast.error(message);
    }
  };

  // ---------------- SMART ACTION ----------------
  const handleSmartAction = async () => {
    if (!id) return;

    try {
      // EDITOR FLOW
      if (role !== "admin") {
        if (status === "draft") {
          await submitForReview(id);
          setStatus("review_requested");
          toast.success("Submitted for review");
        }
        return;
      }

      // ADMIN FLOW
      if (role === "admin") {
        if (status === "approved") {
          await publish(id);
          setStatus("published");
          toast.success("Post Published");

          //optional redirect
          navigate("/dashboard/posts");
        } else if (status === "review_requested") {
          navigate("/dashboard/review");
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Action Failed";
      toast.error(message);
    }
  };

  // ---------------- BUTTON LABEL ----------------

  const getActionLabel = () => {
    if (role !== "admin") {
      if (status === "draft") return "Submit for Review";
      if (status === "review_requested") return "Under Review";
      if (status === "approved") return "Approved";
      if (status === "published") return "Published";
    }
    if (role === "admin") {
      if (status === "review_requested") return "Review Post";
      if (status === "approved") return "Publish";
      if (status === "published") return "Published";
    }
    return "No Action";
  };
  const isActionDisabled = () => {
    if (role !== "admin") {
      return status !== "draft";
    }
    if (role === "admin") {
      return status === "published";
    }
    return true;
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <div className="dashboard-theme space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-main">
          Edit Post
          <span className="ml-3 text-xs px-2 py-1 rounded bg-muted">
            {" "}
            {status}{" "}
          </span>
        </h1>

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

          {/* SMART ACTION BUTTON */}
          <button
            onClick={handleSmartAction}
            disabled={isActionDisabled()}
            className={`px-4 py-2 rounded text-white ${isActionDisabled() ? "btn-secondary opacity-50 cursor-not-allowed" : "btn-prime"}`}
          >
            {" "}
            {getActionLabel()}{" "}
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
            className="text-xl font-semibold outline-none w-full resize-none leading-tight"
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
