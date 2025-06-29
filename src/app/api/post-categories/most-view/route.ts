import { getCategoryTree } from "@/lib/utils";
import CategoryService from "@/service/category";
import PostService from "@/service/post";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const categories = await CategoryService.getPostCategories();

    const categoryTree = getCategoryTree(categories);

    const mostViewedByCategory = await Promise.all(
      categoryTree.map(async (category) => {
        return PostService.getMostViewedByCategory(category.id, 3);
      })
    );

    const mostViewCategories = categoryTree.map((category, index) => {
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        most_viewed: mostViewedByCategory?.[index] || [],
      };
    });

    return Response.json({ data: mostViewCategories }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
