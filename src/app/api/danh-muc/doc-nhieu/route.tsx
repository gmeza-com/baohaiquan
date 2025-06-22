import { NextRequest, NextResponse } from "next/server";
import { clean, cleanSlug, isOn } from "@/lib/utils";
import CategoryService from "@/service/category";

export async function GET(request: NextRequest) {
  try {
    let { slug, excludes, offset, limit } = await clean(request);
    if (!slug) throw new Error("Category slug is required");

    slug = cleanSlug(slug);
    if (!slug) throw new Error("Invalid category slug format");

    // Default to 0 if offset is not provided
    offset = offset || 0;
    limit = limit || 8;

    // convert excludes from string to an array of numbers
    excludes = isOn(excludes)
      ? (excludes = excludes.split(",").map((id: string) => parseInt(id, 10)))
      : [];

    // query database for posts
    const data = await CategoryService.getPostsByCategory(
      slug,
      offset,
      limit,
      false,
      excludes
    );

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
