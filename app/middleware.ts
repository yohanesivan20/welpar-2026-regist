import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface TokenPayload {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

function verifyToken(token: string): TokenPayload | null {
  if (!token || token.trim() === "") return null;

  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET not configured");
      return null;
    }
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    console.error(
      "Token verification failed:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";

  if (!token && !isLoginPage) {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    // ✅ Cegah browser cache halaman protected
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  }

  if (token) {
    const payload = verifyToken(token);

    if (isLoginPage && payload) {
      return NextResponse.redirect(
        new URL("/admin/participants", request.url)
      );
    }

    if (!payload) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      return response;
    }
  }

  // ✅ Semua halaman protected tidak boleh di-cache
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};