import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let suported_locales = ["en", "ja"];
let default_locale = "en";

function getLocale(headers: Negotiator.Headers) {
  let languages = new Negotiator({ headers }).languages();
  return match(languages, suported_locales, default_locale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathname_is_missing_locale = suported_locales.every(function (locale) {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });
  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
  };
  const locale = getLocale(headers);

  if (pathname_is_missing_locale) {
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
