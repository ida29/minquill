import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Session, User } from "next-auth";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const auth = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.username = user.username;
      }
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}`;
    },
  },
  events: {
    createUser: async ({ user }: { user: User }) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: "user-" + uuidv4().slice(0, 6),
        },
      });
    },
  },
};
