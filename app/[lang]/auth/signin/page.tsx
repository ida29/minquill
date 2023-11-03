"use client";

import { signIn } from "next-auth/react";
import { cva } from "@/styled-system/css";
import { ActionButton } from "@/components/buttons";

export default function App() {
  return (
    <main className={mainStyle()}>
      <ActionButton
        text="Sign in with Google"
        onClick={() => signIn("google")}
      />
    </main>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "1rem 2rem 2rem 2rem",
    maxWidth: "1200px",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
