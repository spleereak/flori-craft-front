import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  const { pathname } = request.nextUrl;

  if (isAuthenticated === "true" && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isAuthenticated !== "true" && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/(main)/profile/:path*", "/auth/:path*"],
};
