import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedPage = pathname.startsWith("/transactions") || pathname.startsWith("/transfer");
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/transfer/:path*", "/transactions/:path*"],
};
