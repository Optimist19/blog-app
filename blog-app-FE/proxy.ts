import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("=== PROXY DEBUG ===");
  console.log("Path:", request.nextUrl.pathname);
  console.log("All cookies:", request.cookies.getAll());
  console.log("Raw cookie header:", request.headers.get("cookie"));

  const isLoggedIn = request.cookies.get("connect.sid");
  console.log("connect.sid found:", isLoggedIn);

  if (!isLoggedIn) {
    console.log("No session cookie — redirecting to login");
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