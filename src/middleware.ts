import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // console.debug("Middleware: ", req.cookies.getAll());
  // const token = req.cookies.get("AuthToken"); // Assuming token is stored in cookies

  // if (!token) {
  //   console.debug("No token found, redirecting to /login");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // console.debug("accessToken: ", token)
  return NextResponse.next(); // Proceed to the requested page
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard and sub-routes
};
