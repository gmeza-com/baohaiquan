import { NextRequest, NextResponse } from "next/server";
import { clean } from "@/lib/utils";
import SearchService from "@/service/search";

export async function GET(request: NextRequest) {
  try {
    let { keyword, type, offset } = await clean(request);

    if (keyword.length < 3) throw new Error("invalid keyword");

    // set default offset
    offset = offset ? parseInt(offset) : 10;

    const { items: data } =
      type !== "video"
        ? await SearchService.articles(keyword, offset)
        : await SearchService.videos(keyword, offset);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
