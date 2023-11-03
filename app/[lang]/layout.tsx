// app/[lang]/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/app/[lang]/providers/NextAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinQuill",
  description:
    "A dedicated platform for miniature painting enthusiasts. Share posts, images, and avail painting services with MinQuill.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
