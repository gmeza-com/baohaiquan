import { GalleryCategory } from "@/data/category";
import PostService from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const [mostViewedPosts, newestPosts, hqNewsPaperContent] =
      await Promise.all([
        PostService.getMostViewedPosts(8),
        PostService.getNewestPosts(14, true),
        PostService.getGalleryCollection(GalleryCategory.HQ_NEWS_PAPER, 1),
      ]);

    return NextResponse.json({
      data: { mostViewedPosts, newestPosts, hqNewsPaperContent },
      success: true,
    });
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
