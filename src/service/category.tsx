import db from "@/lib/db";
import { cleanSlug } from "@/lib/utils";
import { ArticleProps } from "@/type/article";

const CategoryService = {
  /**
   * Fetches articles by category slug, new items first
   * @param slug - The slug of the category
   * @param limitStart record offset
   * @param limit limit of records to fetch
   * @param excludeFeatured whether to exclude featured articles
   * @param excludeIds array of article IDs to exclude from the results
   * @returns list of articles in the category
   */
  getPostsByCategory: async (
    slug: string,
    limitStart = 0,
    limit = 10,
    excludeFeatured = false,
    excludeIds: number[] = []
  ): Promise<ArticleProps[]> => {
    try {
      const cleanedSlug = cleanSlug(slug);
      if (!cleanedSlug) throw new Error("Category slug is required");

      if (!db) throw new Error("Database connection is not initialized");

      // fetch the category-id by slug
      const catId = await db("post_category_languages")
        .select("post_category_id")
        .where("slug", cleanedSlug)
        .first()
        .then((row) => row.post_category_id);

      if (!catId) throw new Error("Category not found");

      // fetch articles in the category, excluding specified IDs
      let fetcher = db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .join("post_category as pc", "p.id", "pc.post_id")
        .join("users as u", "p.user_id", "u.id")
        .select(
          "p.id",
          "pl.slug",
          "pl.name",
          "pl.description",
          "pl.tags",
          "p.thumbnail",
          "p.featured",
          "p.published",
          "p.published_at",
          "p.created_at",
          "p.updated_at",
          "p.featured_started_at",
          "p.featured_ended_at",
          "p.user_id as author_id",
          "u.name as author_name"
        )
        .where("pc.post_category_id", catId)
        .andWhere("p.published", 3)
        .andWhere("p.published_at", "<=", new Date().toISOString())
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi");

      if (excludeFeatured) fetcher = fetcher.andWhere("p.featured", 0);

      if (excludeIds.length > 0)
        fetcher = fetcher.andHavingNotIn("p.id", excludeIds);

      return await fetcher
        .orderBy("p.updated_at", "desc")
        .offset(limitStart)
        .limit(limit);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
    }

    return [];
  },

  getFeaturedsByCategory: async (
    slug: string,
    checkDate = true,
    limitStart = 0,
    limit = 10
  ): Promise<ArticleProps[]> => {
    try {
      const cleanedSlug = cleanSlug(slug);
      if (!cleanedSlug) throw new Error("Category slug is required");

      if (!db) throw new Error("Database connection is not initialized");

      // fetch the category-id by slug
      const catId = await db("post_category_languages")
        .select("post_category_id")
        .where("slug", cleanedSlug)
        .first()
        .then((row) => row.post_category_id);

      if (!catId) throw new Error("Category not found");

      // fetch articles in the category, excluding specified IDs
      let fetcher = db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .join("post_category as pc", "p.id", "pc.post_id")
        .join("users as u", "p.user_id", "u.id")
        .select(
          "p.id",
          "pl.slug",
          "pl.name",
          "pl.description",
          "pl.tags",
          "p.thumbnail",
          "p.featured",
          "p.published",
          "p.published_at",
          "p.created_at",
          "p.updated_at",
          "p.featured_started_at",
          "p.featured_ended_at",
          "p.user_id as author_id",
          "u.name as author_name"
        )
        .where("pc.post_category_id", catId)
        .andWhere("p.featured", 1)
        .andWhere("p.published", 3)
        .andWhere("p.published_at", "<=", new Date().toISOString());

      if (checkDate) {
        fetcher = fetcher
          .andWhere("p.featured_started_at", "<=", new Date().toISOString())
          .andWhere("p.featured_ended_at", ">=", new Date().toISOString());
      }

      return fetcher
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi")
        .orderBy("p.updated_at", "desc")
        .offset(limitStart)
        .limit(limit);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
    }

    return [];
  },

  getCategoryInfo: async (slug: string) => {
    try {
      const cleanedSlug = cleanSlug(slug);
      if (!cleanedSlug) throw new Error("Category slug is required");

      if (!db) throw new Error("Database connection is not initialized");

      // fetch the category information by slug
      const category = await db("post_category_languages as pcl")
        .join("post_categories as pc", "pc.id", "pcl.post_category_id")
        .select("pcl.slug", "pcl.name", "pcl.description", "pc.thumbnail")
        .where("pcl.slug", cleanedSlug)
        .andWhere("pcl.locale", "vi")
        .first();

      return category || null;
    } catch (error) {
      console.error("Error fetching category info:", error);
    }

    return null;
  },
};

export default CategoryService;
