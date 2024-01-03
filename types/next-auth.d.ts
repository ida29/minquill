import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      username: string;
      stripeCustomerId: string;
      isActive: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    username: string;
    stripeCustomerId: string;
    isActive: boolean;
  }
}
