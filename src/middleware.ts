import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const { next, rewrite } = NextResponse;

  if (path.startsWith("/storage/"))
    return rewrite(new URL(path, "https://baohaiquanvietnam.vn"));

  return next();
}

export const config = {
  matcher: [
    "/((?!static|.*\\..*|_next).*)", // Match all pages except static files
    "/storage/:path*", // Match all uploads
  ],
};
