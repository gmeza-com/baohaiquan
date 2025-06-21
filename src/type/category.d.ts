export interface Category {
  id: number;
  name: string | null;
  slug: string | null;
  parent_id: number;
  children?: Category[];
}

export interface CategoryTree extends Category {
  children: Category[];
}
