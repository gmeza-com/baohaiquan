import PostService from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const limit = request?.nextUrl?.searchParams?.get("limit") || 8;

    const res = await PostService.getMostViewedPosts(Number(limit));

    return NextResponse.json({ data: res, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
