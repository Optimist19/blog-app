import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get("connect.sid");
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: [ "/profile/:path*", "/create-blog", "/blogs"] };
