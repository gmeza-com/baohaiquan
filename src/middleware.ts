import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  // append the x-pathname header to the request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", path);

  // const { next, rewrite } = NextResponse;
  const { next } = NextResponse;

  // if (path.startsWith("/storage/"))
  //   return rewrite(new URL(path, "https://baohaiquanvietnam.vn"));

  return next({ headers: requestHeaders });
}

export const config = {
  matcher: [
    "/((?!static|.*\\..*|_next).*)", // Match all pages except static files
    // "/storage/:path*", // Match all uploads
  ],
};
