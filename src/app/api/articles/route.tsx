import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const options = await db("post_languages as pl")
      .join("posts as p", "pl.post_id", "p.id")
      .join("users as u", "p.user_id", "u.id")
      .select(
        "pl.id",
        "pl.name",
        "pl.slug",
        "pl.description",
        "p.created_at",
        "u.name as author"
      )
      .limit(20);

    return NextResponse.json({ data: options }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
