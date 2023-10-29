"use client";
import { useSession } from "next-auth/react";
import { css } from "@/styled-system/css";
import { Header } from "@/app/components/header";
import { LoginButton, LogoutButton } from "@/app/components/buttons";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main>
      <Header />
      {status == "authenticated" ? <p>ログイン</p> : <p>ログアウト</p>}
      <div>
        <LoginButton />
        <LogoutButton />
      </div>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        Hello 🐼!
      </h1>
    </main>
  );
}
