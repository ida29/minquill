import NextAuth from "next-auth";
import { auth } from "@/app/auth";
const handler = NextAuth(auth);
export { handler as GET, handler as POST };
