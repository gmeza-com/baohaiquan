import { CategoryProps } from "./article";

export interface Category extends CategoryProps {
  parent_id: number;
  children?: Category[];
}

export interface CategoryTree extends Category {
  children: Category[];
}
