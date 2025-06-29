import { cleanSlug, extractLink } from "@/lib/utils";
import {
  ArticleProps,
  CategoryProps,
  GalleryProps,
  IGalleryCollection,
  INewestPost,
} from "@/type/article";
import db from "@/lib/db";
import { unserialize } from "php-serialize";
import { Collection } from "@/lib/php-erialize/Collection";
import { GalleryCategory } from "@/data/category";

const PostService = {
  getPostFromSlug: async (slug: string): Promise<ArticleProps | null> => {
    try {
      slug = cleanSlug(slug);
      if (!slug) throw new Error("Post slug is required");

      return await db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .join("users as u", "p.user_id", "u.id")
        .select(
          "p.id",
          "pl.slug",
          "pl.name",
          "pl.description",
          "pl.content",
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
        .where("p.published", 3)
        .andWhere("p.published_at", "<=", new Date().toISOString())
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi")
        .andWhere("pl.slug", slug)
        .first();
    } catch (error) {
      console.error("getPostFromSlug:", error);
      return null;
    }
  },

  getGalleryFromSlug: async (slug: string): Promise<GalleryProps | null> => {
    try {
      slug = cleanSlug(slug);
      if (!slug) throw new Error("Gallery slug is required");

      const result = await db("gallery as g")
        .join("gallery_languages as gl", "gl.gallery_id", "g.id")
        .join("users as u", "u.id", "g.user_id")
        .select(
          "g.id",
          "gl.slug",
          "gl.name",
          "gl.description",
          "gl.content",
          "g.thumbnail",
          "g.featured",
          "g.published",
          "g.published_at",
          "g.created_at",
          "g.updated_at",
          "g.user_id as author_id",
          "u.name as author_name"
        )
        .where("g.published", 1)
        .andWhere("g.published_at", "<=", db.raw("NOW()"))
        .andWhere("gl.locale", "vi")
        .andWhere("gl.slug", slug)
        .first();

      return {
        ...result,
        content: unserialize(result?.content, {
          "Illuminate\\Support\\Collection": Collection,
        })?.items,
      };
    } catch (error) {
      console.error("getGalleryFromSlug:", error);
      return null;
    }
  },

  getCategoryOfPost: async (slug: string): Promise<CategoryProps | null> => {
    try {
      slug = cleanSlug(slug);
      if (!slug) throw new Error("Post slug is required");

      return await db("post_languages as pl")
        .join("post_category as pc", "pl.post_id", "pc.post_id")
        .join("post_categories as pcat", "pc.post_category_id", "pcat.id")
        .join(
          "post_category_languages as pcl",
          "pc.post_category_id",
          "pcl.post_category_id"
        )
        .select(
          "pc.post_category_id as id",
          "pcl.slug",
          "pcl.name",
          "pcl.description",
          "pcat.thumbnail"
        )
        .where("pl.slug", slug)
        .andWhere("pl.locale", "vi")
        .orderBy("pcat.id", "desc")
        .first();
    } catch (error) {
      console.error("getCategoryOfPost:", error);
      return null;
    }
  },

  getCategoryOfGallery: async (
    slug: string
  ): Promise<Omit<CategoryProps, "description"> | null> => {
    try {
      slug = cleanSlug(slug);
      if (!slug) throw new Error("Gallery slug is required");

      return await db("gallery as g")
        .join("gallery_category as gc", "gc.gallery_id", "g.id")
        .join("gallery_categories as gc2", "gc2.id", "gc.gallery_category_id")
        .join(
          "gallery_category_languages as gcl",
          "gcl.gallery_category_id",
          "gc2.id"
        )
        .join("gallery_languages as gl", "gl.gallery_id", "g.id")
        .select("gc2.id", "gcl.slug", "gcl.name", "gc2.thumbnail")
        .where("gl.slug", slug)
        .andWhere("gcl.locale", "vi")
        .orderBy("gc2.id", "desc")
        .first();
    } catch (error) {
      console.error("getCategoryOfGallery:", error);
      return null;
    }
  },

  increaseViewCount: async (postId: number): Promise<void> => {
    try {
      if (!db) throw new Error("Database connection is not initialized");
      if (!postId) throw new Error("Post ID is required");

      await db("posts").where("id", postId).increment("hits", 1);
    } catch (error) {
      console.error("increaseViewCount:", error);
    }
  },

  getNewestPosts: async (
    limit: number,
    includeCategory: boolean = false
  ): Promise<INewestPost[]> => {
    try {
      let query = db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .select("p.id", "pl.slug", "pl.name", "pl.description", "p.thumbnail")
        .where("p.published", 3)
        .andWhere("p.published_at", "<=", new Date().toISOString())
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi");

      // Nếu cần trả về category, thêm join với bảng category
      if (includeCategory) {
        query = query
          .leftJoin("post_category as pc", "p.id", "pc.post_id")
          .leftJoin("post_categories as pcat", "pc.post_category_id", "pcat.id")
          .leftJoin(
            "post_category_languages as pcl",
            "pc.post_category_id",
            "pcl.post_category_id"
          )
          .select(
            "p.id",
            "pl.slug",
            "pl.name",
            "pl.description",
            "p.thumbnail",
            "pc.post_category_id as category_id",
            "pcl.slug as category_slug",
            "pcl.name as category_name"
          )
          .andWhere("pcl.locale", "vi");
      }

      const results =
        (await query.orderBy("p.published_at", "desc").limit(limit)) || [];

      // Nếu cần trả về category, group data thành object
      if (includeCategory) {
        return results.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail,
          category: item.category_id
            ? {
                id: item.category_id,
                slug: item.category_slug,
                name: item.category_name,
              }
            : undefined,
        }));
      }

      return results;
    } catch (error) {
      console.error("getNewestPosts:", error);
      return [];
    }
  },

  getFeaturedPosts: async (limit: number): Promise<ArticleProps[]> => {
    try {
      const result = await db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .select(
          "p.id",
          "pl.slug",
          "pl.name",
          "p.thumbnail",
          "p.published_at",
          "pl.description"
        )
        .where("p.published", 3)
        .andWhere("p.featured", 1)
        .andWhere("p.published_at", "<=", new Date().toISOString())
        .andWhere("p.hide", 0)
        .andWhere("pl.locale", "vi")
        .andWhere(function () {
          this.where(function () {
            // Current featured posts: started_at <= now AND (ended_at IS NULL OR ended_at >= now)
            this.where("p.featured_started_at", "<=", db.raw("NOW()")).andWhere(
              function () {
                this.whereNull("p.featured_ended_at").orWhere(
                  "p.featured_ended_at",
                  ">=",
                  db.raw("NOW()")
                );
              }
            );
          }).orWhere(function () {
            // Expired featured posts: started_at < now AND ended_at < now
            this.where("p.featured_started_at", "<", db.raw("NOW()")).andWhere(
              "p.featured_ended_at",
              "<",
              db.raw("NOW()")
            );
          });
        })
        .orderBy("p.featured_started_at", "desc")
        .limit(limit);

      return result || [];
    } catch (error) {
      console.error("getFeaturedPosts:", error);
      return [];
    }
  },

  getMostViewedPosts: async (limit: number): Promise<ArticleProps[]> => {
    try {
      const postQuery = db("views as v")
        .join("posts as p", "v.subject_id", "p.id")
        .join("post_languages as pl", "pl.post_id", "p.id")
        .where("v.subject_type", "Modules\\News\\Models\\Post")
        .select([
          "v.count",
          "pl.name",
          "pl.slug",
          "pl.description",
          "p.thumbnail",
          "p.id",
        ]);

      const galleryQuery = db("views as v")
        .join("gallery as g", "v.subject_id", "g.id")
        .join("gallery_languages as gl", "g.id", "gl.gallery_id")
        .where("v.subject_type", "Modules\\Gallery\\Models\\Gallery")
        .select([
          "v.count",
          "gl.name",
          "gl.slug",
          "gl.description",
          "g.thumbnail",
          "g.id",
        ]);

      const finalQuery = db
        .unionAll([postQuery, galleryQuery], true) // true => wrap in parentheses (subquery)
        .as("all_views");

      const result = await db
        .select("*")
        .from(finalQuery)
        .limit(limit)
        .orderBy("count", "desc");

      return result;
    } catch (error) {
      console.error("getMostViewedPosts:", error);
      return [];
    }
  },

  getGalleryCollection: async (
    categoryId: GalleryCategory,
    limit: number
  ): Promise<IGalleryCollection[]> => {
    try {
      const result = await db("gallery as g")
        .join("gallery_languages as gl", "gl.gallery_id", "g.id")
        .join("gallery_category as gc", "gc.gallery_id", "g.id")
        .join("gallery_categories as gc2", "gc2.id", "gc.gallery_category_id")
        .select(
          "g.id",
          "g.thumbnail",
          "gl.name",
          "gl.description",
          "gl.slug",
          "gl.content",
          "g.published_at"
        )
        .where("gc2.id", categoryId)
        .andWhere("g.published", 1)
        .andWhere("gl.locale", "vi")
        .orderBy("g.published_at", "desc")
        .limit(limit);

      return result.map((item) => ({
        ...item,
        content: unserialize(item?.content, {
          "Illuminate\\Support\\Collection": Collection,
        })?.items?.link,
      }));
    } catch (error) {
      console.error("getGalleryTV:", error);
      return [];
    }
  },
};

export default PostService;
