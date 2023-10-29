// app/components/header.tsx
"use client";
import Link from "next/link";
import { cva } from "@/styled-system/css";
import { LoginButton /*LogoutButton*/ } from "@/app/components/buttons";

export const Header = () => {
  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        MinQuill
      </Link>
      <nav className={navStyle()}>
        <ul>
          <li>
            <LoginButton text="Login" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = cva({
  base: {
    bg: "white",
    border: "3px solid black",
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "4.6rem",
    borderRadius: "10px",
    boxShadow: "4px 4px 0 #000",
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
    width: "6rem",
  },
});
