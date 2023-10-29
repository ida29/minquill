// app/components/header.tsx
"use client";
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import {
  LoginButton,
  LogoutButton,
  PostButton,
  PublishButton,
  BackButton,
} from "@/app/components/buttons";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { /*data: session,*/ status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  let buttons;
  if (status === "authenticated") {
    buttons = (
      <div
        className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}
      >
        <PostButton text="Post" />
        <LogoutButton text="Logout" />
      </div>
    );
  } else {
    buttons = <LoginButton text="Login" />;
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

export const EditorHeader = () => {
  const { /*data: session,*/ status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  let buttons;
  if (status === "authenticated") {
    buttons = (
      <div
        className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}
      >
        <PublishButton text="Publish" />
      </div>
    );
  } else {
    buttons = <LoginButton text="Login" />;
  }

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        <BackButton text="Back" />
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
