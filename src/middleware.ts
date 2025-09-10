import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = /^\/[a-z]{2}/.test(pathname);

  if (!pathnameHasLocale) {
    // 👇 لو عاوز دايمًا يحول للإنجليزي
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  // 👇 لو عاوز يسيب الـ routes زي ما هي من غير أي تحويل
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
