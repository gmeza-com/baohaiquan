import { DB_DATE_TIME_FORMAT } from "@/lib/constant";
import db from "@/lib/db";
import { cleanSlug, isOn } from "@/lib/utils";
import { ArticleProps, CategoryProps } from "@/type/article";
import { Category } from "@/type/category";
import dayjs from "@/lib/dayjs";

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

      const now = dayjs().format(DB_DATE_TIME_FORMAT);

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
        .andWhere("p.published_at", "<=", now)
        .andWhere("p.hide", 0)
        .andWhere("p.status", 0)
        .andWhere("pl.locale", "vi");

      if (excludeFeatured) {
        // Lấy bài bình thường + bài featured hết hạn (loại trừ bài featured đang có hiệu lực)
        fetcher = fetcher.andWhere(function() {
          this.where("p.featured", 0) // Bài bình thường
            .orWhere(function() {
              // Bài featured hết hạn
              this.where("p.featured", 1)
                .andWhere(function() {
                  this.where(function() {
                    this.whereNotNull("p.featured_started_at")
                      .andWhere("p.featured_started_at", ">", now);
                  }).orWhere(function() {
                    this.whereNotNull("p.featured_ended_at")
                      .andWhere("p.featured_ended_at", "<", now);
                  });
                });
            });
        });
      }

      if (excludeIds.length > 0)
        fetcher = fetcher.andHavingNotIn("p.id", excludeIds);

      // Sắp xếp để ưu tiên bài featured trong thời gian hợp lệ
      // Priority 1: Bài featured trong thời gian hợp lệ
      // Priority 2: Bài featured hết hạn + bài bình thường (coi như nhau)
      const orderByClause = excludeFeatured 
        ? "" // Khi excludeFeatured, tất cả đều là bài thường nên không cần sắp xếp đặc biệt
        : `CASE 
            WHEN p.featured = 1 
            AND (p.featured_started_at IS NULL OR p.featured_started_at <= '${now}')
            AND (p.featured_ended_at IS NULL OR p.featured_ended_at >= '${now}')
            THEN 1 
            ELSE 2 
          END`;

      let query = fetcher;
      
      // Chỉ áp dụng orderByRaw khi có orderByClause
      if (orderByClause) {
        query = query.orderByRaw(orderByClause);
      }
      
      return await query
        .orderBy("p.published_at", "desc")
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

      const now = dayjs().format(DB_DATE_TIME_FORMAT);

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
        .andWhere("p.published_at", "<=", now);

      if (checkDate) {
        fetcher = fetcher
          .andWhere("p.featured_started_at", "<=", now)
          .andWhere("p.featured_ended_at", ">=", now);
      }

      return fetcher
        .andWhere("p.hide", 0)
        .andWhere("p.status", 0)
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

      const now = dayjs().format(DB_DATE_TIME_FORMAT);

      // fetch articles in the category, excluding specified IDs
      return await db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .join("post_category as pc", "p.id", "pc.post_id")
        .join("users as u", "p.user_id", "u.id")
        .join("views as v", "v.subject_id", "p.id")
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
        .andWhere("p.published_at", "<=", now)
        .andWhere("p.hide", 0)
        .andWhere("p.status", 0)
        .andWhere("pl.locale", "vi")
        .orderBy("v.count", "desc")
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

  getGalleryCategories: async (
    ids?: string[]
  ): Promise<Omit<Category, "parent_id" | "description">[]> => {
    let query = db("gallery_categories as gc")
      .select("gc.id", "gcl.name", "gcl.slug")
      .join(
        "gallery_category_languages as gcl",
        "gcl.gallery_category_id",
        "gc.id"
      )
      .where("gc.published", 1);

    // Nếu ids tồn tại và không rỗng thì filter theo danh sách id đó
    if (ids && ids.length > 0) {
      query = query.whereIn("gc.id", ids);
    }

    return await query;
  },

  getPostCategories: async (ids?: number[]): Promise<Category[]> => {
    let query = db("post_categories as pcs")
      .select(
        "pcs.id",
        "pcl.name",
        "pcl.slug",
        "pcs.parent_id",
        "pcl.description"
      )
      .join("post_category_languages as pcl", "pcl.post_category_id", "pcs.id")
      .where("pcs.published", 1);

    // Nếu ids tồn tại và không rỗng thì filter theo danh sách id đó
    if (ids && ids.length > 0) {
      query = query.whereIn("pcs.id", ids);
    }

    return await query;
  },

  getOtherCateogoryPosts: async (slug: string): Promise<ArticleProps[]> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category-id by slug
      const catId = await CategoryService.getCatIdFromSlug(slug);
      if (!catId) throw new Error("Category not found");

      // fetch articles in the category, excluding specified IDs
      const query = `
        WITH RankedPosts AS (
          SELECT
            p.id,
            p.thumbnail,
            pl.name,
            pl.slug,
            pl.description,
            ROW_NUMBER() OVER (PARTITION BY c.post_category_id ORDER BY p.published_at DESC) AS row_num,
            c.post_category_id AS category_id,
            pcl.slug AS category_slug,
            pcl.name AS category
          FROM posts AS p
          JOIN post_category AS c ON p.id = c.post_id
          JOIN post_languages AS pl ON p.id = pl.post_id
          JOIN post_categories as pc on pc.id = c.post_category_id
          JOIN post_category_languages as pcl on pcl.post_category_id = c.post_category_id
          WHERE p.published = 3
          AND pc.parent_id = 0
          AND c.post_category_id <> ${catId}
          AND p.hide = 0
          AND pl.locale = 'vi'
          AND pc.published = 1)
        SELECT *
        FROM RankedPosts
        WHERE row_num <= 4;
      `;

      const res = await db.raw(query);

      return isOn(res[0]) ? res[0] : [];
    } catch (error) {
      console.error("getOtherCateogoryPosts:", error);
      return [];
    }
  },

  getGalleryCategory: async (
    slug: string
  ): Promise<Omit<CategoryProps, "description"> | null> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");

      slug = cleanSlug(slug);
      if (!slug) throw new Error("Category slug is required");

      // fetch the category information by slug
      const category = await db("gallery_categories as gc")
        .join(
          "gallery_category_languages as gcl",
          "gcl.gallery_category_id",
          "gc.id"
        )
        .select("gc.id", "gcl.slug", "gcl.name", "gc.thumbnail")
        .where("gcl.slug", slug)
        .andWhere("gcl.locale", "vi")
        .first();

      return category || null;
    } catch (error) {
      console.error("getGalleryCategory:", error);
      return null;
    }
  },
};

export default CategoryService;
