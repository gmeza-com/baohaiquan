import PostService from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const p = request.nextUrl.searchParams;
    const slug = p.get("slug");
    const limit = Number(p.get("limit")) || 4;

    if (!slug) throw new Error("Slug is required");

    const result = await PostService?.getRelativePosts(slug, limit);

    return NextResponse.json({ data: result, success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
