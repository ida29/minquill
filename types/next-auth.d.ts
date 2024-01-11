import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string;
      username: string;
      image: string;
      stripeCustomerId: string;
      isActive: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    name: string;
    username: string;
    image: string;
    stripeCustomerId: string;
    isActive: boolean;
  }
}
