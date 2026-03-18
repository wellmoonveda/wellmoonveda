import { useParams } from "react-router-dom";
import { blogService } from "@/modules/blog/api/blog.service";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/modules/blog/types/blog.types";
import { useAuth } from "@/modules/auth";
import { useUserActivity } from "@/modules/dashboard/user/hooks/useUserActivity";

export default function BlogPostPage() {
  const { categorySlug, slug } = useParams();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug || !slug) return;

    blogService
      .getPostBySlug(categorySlug, slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [categorySlug, slug]);

  if (loading) return null;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-semibold">Post not found</h1>
      </div>
    );
  }

  const auth = useAuth();
  const user = auth?.user;

  useUserActivity(user?.id, "blog_post", post?.id);

  return (
    <main className="bg-background pt-30">
      <article className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        {/* Title */}
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight">{post.title}</h1>

          <p className="text-muted-foreground">{post.readingTime} min read</p>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {post.content.map((block, index) => {
            switch (block.type) {
              case "heading":
                switch (block.level) {
                  case 1:
                    return (
                      <h1 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h1>
                    );
                  case 2:
                    return (
                      <h2 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h2>
                    );
                  case 3:
                    return (
                      <h3 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h3>
                    );
                  case 4:
                    return (
                      <h4 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h4>
                    );
                  case 5:
                    return (
                      <h5 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h5>
                    );
                  case 6:
                    return (
                      <h6 key={index} className="font-semibold mt-8">
                        {block.text}
                      </h6>
                    );
                  default:
                    return null;
                }

              case "paragraph":
                return (
                  <p key={index} className="text-lg leading-relaxed">
                    {block.text}
                  </p>
                );

              case "image":
                return (
                  <figure key={index} className="space-y-3">
                    <img
                      src={block.url}
                      alt={block.caption ?? ""}
                      className="rounded-2xl"
                    />
                    {block.caption && (
                      <figcaption className="text-sm text-muted-foreground">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              case "list":
                const ListTag = block.style === "ordered" ? "ol" : "ul";
                return (
                  <ListTag key={index} className="pl-6 space-y-2 list-disc">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ListTag>
                );

              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 pl-6 italic text-muted-foreground"
                  >
                    {block.text}
                    {block.author && (
                      <footer className="mt-2 text-sm">— {block.author}</footer>
                    )}
                  </blockquote>
                );

              default:
                return null;
            }
          })}
        </div>
      </article>
    </main>
  );
}
