import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getCategoryTree } from "@/lib/utils";
import { Category } from "@/type/category";

export async function GET(request: NextRequest) {
  try {
    const categories = await db("post_categories as pcs")
      .select("pcs.id", "pcl.name", "pcl.slug", "pcs.parent_id")
      .join("post_category_languages as pcl", "pcl.post_category_id", "pcs.id");

    // Convert to tree structure
    const categoryTree = getCategoryTree(categories as Category[]);

    return Response.json(
      {
        data: categoryTree,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
