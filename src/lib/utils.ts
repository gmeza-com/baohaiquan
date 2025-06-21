import { Category, CategoryTree } from "@/type/category";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSsr = (): boolean => typeof window === "undefined";

export function isOn(el: any | undefined): boolean {
  let elType = typeof el;
  if (elType === "undefined" || el === null) return false;

  // string check
  if (el instanceof String) elType = "string";

  switch (elType) {
    case "string":
      return el.length > 0;
    case "object": // array | object
      return Array.isArray(el) ? el.length > 0 : !isEmpty(el);
    default:
      return true;
  }
}

export function isEmpty(el: any): boolean {
  for (const prop in el) if (Object.hasOwn(el, prop)) return false;

  return true;
}

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};

/**
 * Converts a flat array of categories to a hierarchical tree structure
 * @param categories - Flat array of categories with parent_id references
 * @returns Array of root categories with their children nested
 */
export function convertToCategoryTree(categories: Category[]): CategoryTree[] {
  // Create a map for quick lookup
  const categoryMap = new Map<number, CategoryTree>();

  // Initialize all categories with empty children array
  categories.forEach((category) => {
    categoryMap.set(category.id, {
      ...category,
      children: [],
    });
  });

  const rootCategories: CategoryTree[] = [];

  // Build the tree structure
  categories.forEach((category) => {
    const categoryWithChildren = categoryMap.get(category.id)!;

    if (category.parent_id === 0 || category.parent_id === null) {
      // This is a root category
      rootCategories.push(categoryWithChildren);
    } else {
      // This is a child category
      const parent = categoryMap.get(category.parent_id);
      if (parent) {
        parent.children.push(categoryWithChildren);
      }
    }
  });

  return rootCategories;
}

/**
 * Recursively sorts categories by name (null values last)
 * @param categories - Array of categories to sort
 * @returns Sorted array of categories
 */
export function sortCategoryTree(categories: CategoryTree[]): CategoryTree[] {
  return categories
    .sort((a, b) => {
      // Handle null names
      if (a.id === null && b.id === null) return 0;
      if (a.id === null) return 1;
      if (b.id === null) return -1;

      return a.id - b.id;
    })
    .map((category) => ({
      ...category,
      children: sortCategoryTree(category.children as CategoryTree[]),
    }));
}

/**
 * Converts flat categories to sorted tree structure
 * @param categories - Flat array of categories
 * @returns Sorted hierarchical tree structure
 */
export function getCategoryTree(categories: Category[]): CategoryTree[] {
  const tree = convertToCategoryTree(categories);
  return sortCategoryTree(tree);
}
