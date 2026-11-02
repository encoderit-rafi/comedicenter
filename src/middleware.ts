import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|logo.png).*)",
  ],
};

type UserRole =
  | "Patient"
  | "User"
  | "ClinicAdmin"
  | "Staff"
  | "Clinic"
  | "Doctor";

const PUBLIC_ROUTES = new Set([
  "/",
  "/terms-conditions",
  "/about",
  "/dental",
  "/aesthetic",
  "/for-providers",
  "/cmc-cares",
  "/subscription",
  "/privacy-policy",
  "/faq",
  "/featured-providers",
  "/contact",
  "/meals-and-nutrition",
  "/our-providers",
  "/all-reviews",
]);

const AUTH_ROUTES = new Set(["/auth/signin", "/auth/signup"]);
const STATIC_ASSET_EXTENSIONS = new Set([
  ".svg",
  ".png",
  ".webm",
  ".jpg",
  "webp",
  ".jpeg",
  ".gif",
  ".ico",
  ".mp4",
]);
const ADMIN_ROLES = new Set(["Clinic", "ClinicAdmin", "Doctor", "Staff"]);

const isPublicRoute = (pathname: string) => {
  return (
    PUBLIC_ROUTES.has(pathname) ||
    pathname.startsWith("/auth") ||
    PUBLIC_ROUTES.has(pathname.split("/")[1])
  );
};

const isStaticAsset = (pathname: string) => {
  return STATIC_ASSET_EXTENSIONS.has(
    pathname.substring(pathname.lastIndexOf(".")),
  );
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();
  const isLoggedIn = !!session;
  const userRole = session?.user?.role as UserRole | undefined;

  if (
    isLoggedIn &&
    AUTH_ROUTES.has(pathname) &&
    !pathname.startsWith("/auth/email-verification") &&
    !pathname.startsWith("/auth/verification")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (
    isLoggedIn &&
    session.error === "RefreshAccessTokenError" &&
    pathname !== "/redirect-login"
  ) {
    return NextResponse.redirect(new URL("/redirect-login", request.url));
  }

  if (isLoggedIn) {
    if (pathname === "/users" && userRole && ADMIN_ROLES.has(userRole)) {
      return NextResponse.next();
    }

    if (pathname === "/users" && (!userRole || !ADMIN_ROLES.has(userRole))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(
      `/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`,
      request.url,
    ),
  );
}
