export { default } from "next-auth/middleware";

export const config = {
  matcher: ['/app/api/protected/:path*', '/app/protected/:path*'],
};
