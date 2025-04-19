import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token; // Check if the user is authenticated
  const isLoginPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";

  // If the user is authenticated and they try to visit the login/signup page, redirect to the home page
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated and they try to visit any page except login/signup, redirect to the login page
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: ["/", "/login", "/signup"], // Apply middleware to these paths
};
