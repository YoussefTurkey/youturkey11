import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ لو الراوت الأساسي "/" سيبه زي ما هو
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ✅ لو مفيش locale في بداية الـ path (زي /about)
  const pathnameHasLocale = /^\/(en|ar)(\/|$)/.test(pathname);

  if (!pathnameHasLocale) {
    // هنا تقدر تختار تضيف /en أو تخليها زي ما هي
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
