import PostService from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.pathname.split("/").pop();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const galleryResult = await PostService.getGalleryFromSlug(slug);

    if (!galleryResult) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: galleryResult,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
