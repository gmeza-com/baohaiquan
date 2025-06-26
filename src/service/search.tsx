import { sanitizeInput } from "@/lib/utils";
import { ArticleProps } from "@/type/article";
import db from "@/lib/db";

type SearchResults = {
  items: ArticleProps[] | null;
  count: number;
};

const SearchService = {
  articles: async (
    keyword: string,
    offset: number = 0
  ): Promise<SearchResults> => {
    try {
      keyword = sanitizeInput(keyword);
      if (!keyword || keyword.length < 3) throw new Error("invalid keyword");

      // fulltext search the keyword in the posts and post_languages tables
      const items = await db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
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
          "u.name as author_name",
          db.raw(
            `MATCH(pl.name, pl.content) AGAINST(? IN BOOLEAN MODE) AS match_index`,
            [keyword]
          ) // Match index
        )
        .whereRaw(`MATCH(pl.name, pl.content) AGAINST(? IN BOOLEAN MODE) > 8`, [
          keyword,
        ])
        .orderBy("match_index", "desc")
        .offset(offset)
        .limit(10);

      // Count the number of results
      const fetcher = await db("posts as p")
        .join("post_languages as pl", "p.id", "pl.post_id")
        .whereRaw(`MATCH(pl.name, pl.content) AGAINST(? IN BOOLEAN MODE) > 8`, [
          keyword,
        ])
        .count({ count: "*" })
        .first();

      return { items, count: parseInt(`${fetcher?.count ?? 0}`) };
    } catch (error) {}
    return { items: null, count: 0 };
  },

  videos: async (
    keyword: string,
    offset: number = 0
  ): Promise<SearchResults> => {
    try {
    } catch (error) {}
    return { items: null, count: 0 };
  },
};

export default SearchService;
