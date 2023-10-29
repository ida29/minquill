"use client";

import { signIn, signOut } from "next-auth/react";
import { cva } from "@/styled-system/css";

export const LoginButton = (props) => {
  return (
    <button className={btnStyle({ color: "primary" })} onClick={() => signIn()}>
      {props.text}
    </button>
  );
};

export const LogoutButton = (props) => {
  return (
    <button className={btnStyle()} onClick={() => signOut()}>
      {props.text}
    </button>
  );
};

const btnStyle = cva({
  base: {
    //bg: "white",
    textDecoration: "none",
    font: "600 1rem/1 futura",
    padding: "0.8em 1em",
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px 0 #000",
    cursor: "pointer",
    _hover: { bg: "lightgray" },
    _active: {
      transform: "translate(4px, 4px)",
      boxShadow: "none",
    },
  },
  variants: {
    color: {
      light: { bg: "white", _hover: { bg: "lightgrey" } },
      primary: { bg: "blue.500", _hover: { bg: "blue.300" } },
      secondary: { bg: "grey.500", _hover: { bg: "grey.300" } },
    },
  },
  defaultVariants: {
    color: "light",
  },
});
