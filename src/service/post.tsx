import { cleanSlug } from "@/lib/utils";
import { ArticleProps, CategoryProps } from "@/type/article";
import db from "@/lib/db";

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
};

export default PostService;
