import type { BlogPost } from "../types/blog.types";
import type { BlogPostQuery } from "../types/blog.query";
import * as categorySupabase from "@/services/supabase/category.service";
import type { RichTextBlock } from "../types/blog.types";

import {
  getPostBySlug as getPostBySlugFromDB,
  getPublishedPostsRaw,
} from "@/services/supabase/post.service";

type UnknownRecord = Record<string, unknown>;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Normalize Supabase relation (array → object)
 */
const normalizeCategory = (categories: unknown) => {
  if (Array.isArray(categories)) return categories[0];
  return categories;
};

/**
 * Map DB → BlogPost (Single Source of Truth)
 */
const mapToBlogPost = (post: unknown): BlogPost => {
  const p = post as UnknownRecord;
  const category = normalizeCategory(p.categories);

  return {
    id: p.id as string,
    title: p.title as string,
    slug: p.slug as string,
    excerpt: extractExcerpt(p.content),
    content: normalizeContent(
      typeof p.content === "object" &&
        p.content !== null &&
        "root" in p.content
        ? ((p.content as UnknownRecord).root as UnknownRecord)?.children
        : p.content,
    ),
    contentType: "blog",
    status: "published",
    category,
    readingTime: calculateReadingTime(p.content),
    publishedAt: p.created_at as string,
    createdAt: p.created_at as string,
    featured_image: (p.featured_image as string | null) ?? null,
  };
};

export const blogService = {
  /**
   * Get posts (all / recent / featured)
   */
  async getPosts(query: BlogPostQuery): Promise<PaginatedResult<BlogPost>> {
    const rawPosts = await getPublishedPostsRaw();

    const posts: BlogPost[] = rawPosts.map(mapToBlogPost);

    // --- RECENT POSTS ---
    if (query.mode === "recent") {
      const limit = query.limit ?? 3;

      return {
        data: posts.slice(0, limit),
        total: posts.length,
        page: 1,
        pageSize: limit,
        totalPages: 1,
      };
    }

    // --- FEATURED POSTS (FIXED) ---
    if (query.mode === "featured") {
      const featured = rawPosts
        .filter((post: unknown) => {
          const p = post as UnknownRecord;
          return p.post_type === "featured";
        })
        .map(mapToBlogPost);

      return {
        data: featured,
        total: featured.length,
        page: 1,
        pageSize: featured.length,
        totalPages: 1,
      };
    }

    // --- PAGINATED POSTS ---
    if (query.mode === "all") {
      const page = query.page ?? 1;
      const pageSize = query.pageSize ?? 6;

      const total = posts.length;
      const totalPages = Math.ceil(total / pageSize);

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: posts.slice(start, end),
        total,
        page,
        pageSize,
        totalPages,
      };
    }

    // --- FALLBACK ---
    return {
      data: posts,
      total: posts.length,
      page: 1,
      pageSize: posts.length,
      totalPages: 1,
    };
  },

  /**
   * Get single post by slug + category
   */
  async getPostBySlug(
    slug: string,
  ): Promise<BlogPost | null> {
    const post = await getPostBySlugFromDB(slug);

    if (!post) return null;

    return mapToBlogPost(post);
  },
};

/**
 * Extract excerpt from Lexical content
 */
const extractExcerpt = (content: unknown): string => {
  if (!Array.isArray(content)) return "";

  const block = content.find(
    (b) =>
      typeof b === "object" &&
      b !== null &&
      "type" in b &&
      (b as UnknownRecord).type === "paragraph",
  ) as UnknownRecord | undefined;

  const text = block?.text;

  return typeof text === "string" ? text.slice(0, 120) : "";
};

/**
 * Calculate reading time
 */
const calculateReadingTime = (content: unknown): number => {
  if (!Array.isArray(content)) return 1;

  const text = content
    .map((b) =>
      typeof b === "object" && b !== null && "text" in b
        ? String((b as UnknownRecord).text ?? "")
        : ""
    )
    .join(" ");

  return Math.max(1, Math.ceil(text.split(" ").length / 200));
};

const normalizeContent = (content: unknown) => {
  if (!content) return [];

  let blocks: unknown[] = [];

  if (
    typeof content === "object" &&
    content !== null &&
    "root" in content
  ) {
    const root = (content as UnknownRecord).root as UnknownRecord;
    blocks = (root?.children as unknown[]) ?? [];
  } else if (Array.isArray(content)) {
    blocks = content;
  } else if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as unknown;

      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "root" in parsed
      ) {
        const root = (parsed as UnknownRecord).root as UnknownRecord;
        blocks = (root?.children as unknown[]) ?? [];
      } else if (Array.isArray(parsed)) {
        blocks = parsed;
      }
    } catch {
      return [];
    }
  } else {
    return [];
  }

  return blocks.map((block) => {
    if (
      typeof block === "object" &&
      block !== null &&
      "type" in block
    ) {
      const b = block as UnknownRecord;

      if (b.type === "image") {
        return {
          type: "image",
          url: b.src as string,
          caption: (b.caption as string) || "",
        };
      }

      if (b.type === "table") {
        const rows: string[][] = [];

        (b.children as unknown[])?.forEach((row) => {
          if (
            typeof row === "object" &&
            row !== null &&
            "type" in row &&
            (row as UnknownRecord).type === "tablerow"
          ) {
            const rowData: string[] = [];

            ((row as UnknownRecord).children as unknown[])?.forEach(
              (cell) => {
                if (
                  typeof cell === "object" &&
                  cell !== null &&
                  "type" in cell &&
                  (cell as UnknownRecord).type === "tablecell"
                ) {
                  const text = ((cell as UnknownRecord).children as unknown[])
                    ?.map((child) =>
                      typeof child === "object" &&
                        child !== null &&
                        "text" in child
                        ? String(
                          (child as UnknownRecord).text ?? "",
                        )
                        : ""
                    )
                    .join(" ") || "";

                  rowData.push(text);
                }
              },
            );

            rows.push(rowData);
          }
        });

        return {
          type: "table",
          rows,
        };
      }
    }

    return block;
  }) as RichTextBlock[];
};

export const createCategory = async (name: string) => {
  // Basic slug safety (avoid duplicates later if needed)
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(
      /\s+/g,
      "-",
    );

  return await categorySupabase.createCategory(name, slug);
};

export const fetchCategories = async () => {
  return await categorySupabase.getCategories();
};
