import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@/editor-system/lexical/Editor";
import { usePostEditor } from "../hooks/usePostEditor";
import {
  getPostById,
  submitPostForReview,
} from "@/services/supabase/post.service";

const EditPostPage = () => {
  const { id } = useParams();

  const { updateDraft, loading } = usePostEditor();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);
  const [initialContent, setInitialContent] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const post = await getPostById(id);

        setTitle(post.title);
        setInitialContent(post.content);
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
      content,
    });
  };

  const handleSubmitReview = async () => {
    if (!id) return;

    await submitPostForReview(id);
  };

  return (
    <div className="space-y-6 dashboard-theme">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-main">Edit Post</h1>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="btn-secondary px-4 py-2 rounded-md text-white"
          >
            {loading ? "Saving..." : "Update Draft"}
          </button>

          <button
            onClick={handleSubmitReview}
            className="btn-prime px-4 py-2 rounded-md text-white"
          >
            Submit for Review
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-semibold outline-none"
        />

        {initialContent !== null && (
          <Editor initialContent={initialContent} onChange={setContent} />
        )}
      </div>
    </div>
  );
};

export default EditPostPage;
