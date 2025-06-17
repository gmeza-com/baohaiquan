import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const options = await db
      .select("id", "name", "value")
      .from("options")
      .where("id", "<", "20");

    return NextResponse.json({ data: options }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
