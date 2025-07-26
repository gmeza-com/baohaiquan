export type ArticleProps = {
  id: number;
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  thumbnail_vertical?: string;
  tags: string | null;
  featured: 0 | 1;
  content?: string;
  published_at: string;
  published: number;
  created_at: string;
  updated_at: string;
  featured_started_at: string | null;
  featured_ended_at: string | null;
  author_id: number;
  author_name: string;
  view_count: number;
  quote: string | null;
  note: string | null;
  prefix: string | null;
};

// TODO: add type for this
export type GalleryContentType = any;

export type GalleryType = "video" | "audio" | "album" | "longform" | "content";

export type GalleryProps = Pick<
  ArticleProps,
  | "id"
  | "slug"
  | "name"
  | "description"
  | "thumbnail"
  | "published_at"
  | "published"
  | "created_at"
  | "updated_at"
  | "author_id"
  | "author_name"
> & {
  content: GalleryContentType;
  post_content: string | null;
  prefix: string | null;
  note: string | null;
  quote: string | null;
  view_count: number;
  type: GalleryType;
};

export type CategoryProps = {
  id: number;
  slug: string;
  name: string;
  description: string;
  thumbnail: string | null;
};

export type INewestPost = Pick<
  ArticleProps,
  "id" | "slug" | "name" | "description" | "thumbnail"
> & {
  category?: Pick<CategoryProps, "id" | "slug" | "name">;
};

export type IPodcastCategory = {
  name: string;
  icon: string;
};

export type IGalleryCollection = Pick<
  ArticleProps,
  | "id"
  | "thumbnail"
  | "name"
  | "description"
  | "slug"
  | "published_at"
  | "featured"
> & {
  content: string | null;
  post_content: string | null;
  podcast_category?: IPodcastCategory;
};

export type IGalleryCollectionWithViewCount = IGalleryCollection & {
  view_count: number;
};

export type IGalleryCollectionList = IGalleryCollectionWithViewCount & {
  type: GalleryType;
};

export type IMediaBox = Pick<
  ArticleProps,
  "id" | "published_at" | "thumbnail" | "slug" | "name" | "description"
> & {
  category_slug: string;
  is_featured_now: number;
  category_name: string;
};
