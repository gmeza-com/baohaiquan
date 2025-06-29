import { ArticleProps, CategoryProps } from "./article";

export interface Category extends CategoryProps {
  parent_id: number;
  children?: Category[];
}

export interface CategoryTree extends Category {
  children: Category[];
}

export type MostViewCategory = Pick<Category, "id" | "name" | "slug"> & {
  most_viewed: ArticleProps[];
};
