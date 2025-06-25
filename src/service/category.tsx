import db from "@/lib/db";
import { cleanSlug } from "@/lib/utils";
import { ArticleProps, CategoryProps } from "@/type/article";
import { Category } from "@/type/category";

const CategoryService = {
  getCatIdFromSlug: async (slug: string): Promise<number | null> => {
    try {
      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      return await db("post_category_languages")
        .select("post_category_id")
        .where("slug", slug)
        .first()
        .then((row) => row.post_category_id);
    } catch (error) {
      console.error("getCatIdFromSlug:", error);
      return null;
    }
  },

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
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category-id by slug
      const catId = await CategoryService.getCatIdFromSlug(slug);
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
      console.error("getPostsByCategory:", error);
      return [];
    }
  },

  getFeaturedsByCategory: async (
    slug: string,
    checkDate = true,
    limitStart = 0,
    limit = 10
  ): Promise<ArticleProps[]> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category-id by slug
      const catId = await CategoryService.getCatIdFromSlug(slug);
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
      console.error("getFeaturedsByCategory:", error);
      return [];
    }
  },

  getMostReadByCategory: async (
    slug: string,
    limitStart = 0,
    limit = 8
  ): Promise<ArticleProps[]> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category-id by slug
      const catId = await CategoryService.getCatIdFromSlug(slug);
      if (!catId) throw new Error("Category not found");

      // fetch articles in the category, excluding specified IDs
      return await db("posts as p")
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
        .andWhere("p.published_at", "<=", new Date().toISOString())
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi")
        .orderBy("p.hits", "desc")
        .offset(limitStart)
        .limit(limit);
    } catch (error) {
      console.error("getMostReadByCategory:", error);
      return [];
    }
  },

  getCategoryInfo: async (slug: string): Promise<CategoryProps | null> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category information by slug
      const category = await db("post_category_languages as pcl")
        .join("post_categories as pc", "pc.id", "pcl.post_category_id")
        .select(
          "pc.id",
          "pcl.slug",
          "pcl.name",
          "pcl.description",
          "pc.thumbnail"
        )
        .where("pcl.slug", slug)
        .andWhere("pcl.locale", "vi")
        .first();

      return category || null;
    } catch (error) {
      console.error("getCategoryInfo:", error);
      return null;
    }
  },

  getGalleryCategories: async (): Promise<
    Omit<Category, "parent_id" | "description">[]
  > => {
    return await db("gallery_categories as gc")
      .select("gc.id", "gcl.name", "gcl.slug")
      .join(
        "gallery_category_languages as gcl",
        "gcl.gallery_category_id",
        "gc.id"
      )
      .where("gc.published", 1);
  },

  getPostCategories: async (): Promise<Category[]> => {
    return await db("post_categories as pcs")
      .select(
        "pcs.id",
        "pcl.name",
        "pcl.slug",
        "pcs.parent_id",
        "pcl.description"
      )
      .join("post_category_languages as pcl", "pcl.post_category_id", "pcs.id")
      .where("pcs.published", 1);
  },
};

export default CategoryService;
