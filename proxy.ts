import { locales, defaultLocale } from "./i18n";

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  url.pathname = `/${defaultLocale}${pathname}`;
  return Response.redirect(url, 307);
}
export const config = {
  matcher: [
    "/((?!_next|api|images|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
