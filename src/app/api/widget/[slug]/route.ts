import WidgetService from "@/service/widget";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ slug: string }> }>
) {
  try {
    const slug = (await params).slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const res = await WidgetService.getServiceBySlug(slug);

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error fetching widget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
