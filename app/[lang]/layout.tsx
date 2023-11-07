// app/[lang]/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/app/[lang]/providers/NextAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinQuill",
  description:
    "A dedicated platform for miniature painting enthusiasts. Share posts, images, and avail painting services with MinQuill.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
	    <div className={css({ overflow: "hidden" })}>
          <NextAuthProvider>{children}</NextAuthProvider>
		</div>
      </body>
    </html>
  );
}
