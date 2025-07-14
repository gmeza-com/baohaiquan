import PostService from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ slug: string }> }>
) {
  try {
    const { slug } = await params;

    const catId = request.nextUrl.searchParams.get("catId");

    if (!slug || !catId) {
      return NextResponse.json(
        { error: "Slug and catId are required" },
        { status: 400 }
      );
    }

    if (Number.isNaN(Number(catId))) {
      return NextResponse.json(
        { error: "CatId must be a number" },
        { status: 400 }
      );
    }

    const galleryResult = await PostService.getGalleryFromSlug(
      slug,
      Number(catId)
    );

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
