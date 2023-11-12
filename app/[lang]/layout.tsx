// app/[lang]/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Hind } from "next/font/google";
import NextAuthProvider from "@/app/[lang]/providers/NextAuth";

export const hind = Hind({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fira-code",
});

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
      <body className={hind.className}>
        <div>
          <NextAuthProvider>{children}</NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
