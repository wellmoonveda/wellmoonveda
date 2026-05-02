const STORAGE_KEY = "veda-draft-backup";

type DraftBackup = {
  title: string;
  content: string;
  html: string;
  featuredImage: string | null;
  tags: string[];
  categoryId?: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
};

export const saveDraftBackup = (data: DraftBackup) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Draft backup failed", err);
  }
};

export const loadDraftBackup = (): DraftBackup | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed: unknown = JSON.parse(data);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "title" in parsed &&
      "content" in parsed &&
      "html" in parsed
    ) {
      const draft = parsed as {
        title: unknown;
        content: unknown;
        html: unknown;
        featuredImage?: unknown;
        tags?: unknown;
        categoryId?: unknown;
        metaTitle?: unknown;
        metaDescription?: unknown;
        slug?: unknown;
      };

      if (
        typeof draft.title === "string" &&
        typeof draft.content === "string" &&
        typeof draft.html === "string"
      ) {
        return {
          title: draft.title,
          content: draft.content,
          html: draft.html,
          featuredImage: typeof draft.featuredImage === "string" ||
              draft.featuredImage === null
            ? draft.featuredImage ?? null
            : null,
          tags: Array.isArray(draft.tags)
            ? draft.tags.filter((t): t is string => typeof t === "string")
            : [],
          categoryId: typeof draft.categoryId === "string"
            ? draft.categoryId
            : undefined,
          metaTitle: typeof draft.metaTitle === "string" ? draft.metaTitle : "",
          metaDescription: typeof draft.metaDescription === "string"
            ? draft.metaDescription
            : "",
          slug: typeof draft.slug === "string" ? draft.slug : "",
        };
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const clearDraftBackup = () => {
  localStorage.removeItem(STORAGE_KEY);
};
