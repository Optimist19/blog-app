import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get("connect.sid");

  if (!isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log("Session cookie found — allowing request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/create-blog", "/blogs", "/blogs/:path*"]
};
