export type ArticleProps = {
  id: number;
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
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
};

export type CategoryProps = {
  id: number;
  slug: string;
  name: string;
  description: string;
  thumbnail: string | null;
};
