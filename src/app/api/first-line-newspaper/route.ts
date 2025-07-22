import { GalleryCategory } from "@/data/category";
import PostService from "@/service/post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await PostService.getGalleryCollection(
      GalleryCategory.HQ_NEWS_PAPER,
      1
    );

    console.log("res", res);

    return NextResponse.json({
      data: res,
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
