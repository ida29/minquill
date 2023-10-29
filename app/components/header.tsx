// app/components/header.tsx
"use client";
import Link from "next/link";
//import { css } from "@/styled-system/css";
import { Stack } from "@/styled-system/jsx";

export const Header = () => {
  return (
    <Stack gap="6">
      <header className="panda-header">
        <div className="container">
          <Link href="/">MyWebsite</Link>
          <nav>
            <ul className="nav">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <Link href="/about">私たちについて</Link>
              </li>
              <li>
                <Link href="/contact">お問い合わせ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </Stack>
  );
};
