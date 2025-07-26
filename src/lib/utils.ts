import { Category, CategoryTree } from "@/type/category";
import { IMenuItem } from "@/type/menu";
import { clsx, type ClassValue } from "clsx";
import escapeRegExp from "escape-string-regexp";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import navigateService from "./router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

export function sanitizeInput(input: string): string {
  if (!input.trim()) return "";

  // Step 1: Trim and collapse whitespace
  let clean = input.trim().replace(/\s+/g, " ");

  // Step 2: Remove boolean operators (optional: keep if needed)
  clean = clean.replace(/[+\-<>()~*"@]/g, "");

  // Step 3: Escape regex special characters
  clean = escapeRegExp(clean);

  // Step 4: Split and filter short words (<3 chars)
  const words = clean.split(" ");
  const filtered = words.filter((word) => word.length >= 3);

  return filtered.join(" ");
}

export const isSsr = (): boolean => typeof window === "undefined";

export const stripHtml = (str: string): string => str.replace(/<[^>]*>?/gm, "");

export const clean = async (request: NextRequest) => {
  const params: { [prop: string]: any } = {};

  // first, parse the searchParams (GET)
  try {
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      const val = searchParams.getAll(key);
      return (params[key] =
        Array.isArray(val) && val.length > 1 ? val : value.trim());
    });
  } catch (error) {}

  // then, parse the body (POST, PUT)
  try {
    const data = (await request.clone().formData()).entries();
    for (let [k, value] of data)
      params[k] = typeof value === "string" ? value.trim() : value;
  } catch (error) {}

  // then, parse the body json (POST, PUT)
  try {
    const body = await request.json();
    isOn(body) &&
      Object.keys(body).forEach(
        (k) =>
          (params[k] = typeof body[k] === "string" ? body[k].trim() : body[k])
      );
  } catch (error) {}

  return params;
};

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
  return tree;
}

/**
 * Extracts link from PHP serialized content
 * @param content - PHP serialized string content
 * @returns Extracted link or null if not found
 */
export function extractLink(content: string): string | null {
  try {
    if (!content) return null;

    // Fallback: Parse the serialized string directly using regex
    // Look for the link pattern in the serialized string
    const linkMatch = content.match(/s:\d+:"([^"]*link[^"]*)";s:\d+:"([^"]+)"/);
    if (linkMatch) {
      return linkMatch[2];
    }

    // Alternative pattern for different serialization formats
    const altLinkMatch = content.match(/s:\d+:"link";s:\d+:"([^"]+)"/);
    if (altLinkMatch) {
      return altLinkMatch[1];
    }

    // Try to find any URL pattern in the content
    const urlMatch = content.match(/https?:\/\/[^\s"{}]+/);
    if (urlMatch) {
      return urlMatch[0];
    }

    return null;
  } catch (error) {
    console.error("Error extracting link from content:", error);
    return null;
  }
}

/**
 * Formats a number with Vietnamese locale (dots as thousand separators)
 * @param num - Number to format
 * @returns Formatted string with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("vi-VN");
}

/**
 * Formats a number with custom thousand separator
 * @param num - Number to format
 * @param separator - Thousand separator (default: '.')
 * @returns Formatted string with custom thousand separators
 */
export function formatNumberWithSeparator(
  num: number,
  separator: string = "."
): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Formats a date to relative time in Vietnamese (e.g., "1 tháng trước", "2 giờ trước")
 * @param date - Date to format (can be Date object, string, or timestamp)
 * @returns Formatted relative time string in Vietnamese
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "vừa xong";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  } else {
    return `${diffInYears} năm trước`;
  }
}

export const cleanTextSearch = (text: string): string => {
  return text.trim();
};

export const getCategoryHref = (item: IMenuItem) => {
  if (item?.attributes?.category_type === "post") {
    return navigateService.getPostCollection(item?.attributes?.category_slug);
  }
  if (item?.attributes?.category_type === "gallery") {
    return navigateService.getGalleryCollection(
      item?.attributes?.category_slug
    );
  }
  return item?.attributes?.url;
};
