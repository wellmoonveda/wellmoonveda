import { useEffect, useState } from "react";
import * as blogservice from "../api/blog.service";
import type { Category } from "../types/blog.types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(false);

    try {
      const data = await blogservice.fetchCategories();
      setCategories((data ?? []) as Category[]);
    } catch (error: unknown) {
      console.log("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const newCategory = await blogservice.createCategory(name);

      setCategories((prev) => [
        newCategory as Category,
        ...prev,
      ]);

      return newCategory as Category;
    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    addCategory,
    refetch: fetchCategories,
  };
};
