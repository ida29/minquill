// app/components/header.tsx
"use client";
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ActionButton } from "@/app/components/buttons";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { /*data: session,*/ status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  let buttons;
  if (status === "authenticated") {
    buttons = (
      <div
        className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}
      >
        <ActionButton
          text="CreatePost"
          colorVariant="primary"
          onClick={() => router.push("/posts/new")}
        />
        <ActionButton text="Logout" onClick={() => signOut()} />
      </div>
    );
  } else {
    buttons = (
      <ActionButton
        text="login"
        colorVariant="primary"
        onClick={() => signIn()}
      />
    );
  }

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        MinQuill
      </Link>
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>{buttons}</li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = cva({
  base: {
    //bg: "grey",
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "1.6rem",
    //border: "1px solid black",
    //borderRadius: "10px",
    //boxShadow: "4px 4px 0 #000",
    marginBottom: "1.6rem",
  },
});

const logoStyle = cva({
  base: {
    font: "600 2rem/1 futura",
  },
});

const navStyle = cva({
  base: {
    display: "flex",
  },
});
