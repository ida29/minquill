"use client";

import { signIn, signOut } from "next-auth/react";
import { cva } from "@/styled-system/css";
import { useRouter } from "next/navigation";

type ButtonProps = {
  text: string;
};

export const LoginButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className={btnStyle({ color: "primary" })} onClick={() => signIn()}>
      {text}
    </button>
  );
};

export const LogoutButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className={btnStyle()} onClick={() => signOut()}>
      {text}
    </button>
  );
};

export const PostButton: React.FC<ButtonProps> = ({ text }) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push("/posts/new");
  };
  return (
    <button
      className={btnStyle({ color: "primary" })}
      onClick={handlePostClick}
    >
      {text}
    </button>
  );
};

export const PublishButton: React.FC<ButtonProps> = ({ text }) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push("/posts/new");
  };
  return (
    <button
      className={btnStyle({ color: "primary" })}
      onClick={handlePostClick}
    >
      {text}
    </button>
  );
};

export const BackButton: React.FC<ButtonProps> = ({ text }) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push("/");
  };
  return (
    <button className={btnStyle()} onClick={handlePostClick}>
      {text}
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
    transition: "all 0.1s",
    _hover: { bg: "lightgray" },
    _active: {
      transform: "translate(4px, 4px)",
      boxShadow: "none",
    },
  },
  variants: {
    color: {
      light: { bg: "white", _hover: { bg: "lightgrey" } },
      primary: { bg: "blue.300", _hover: { bg: "blue.200" } },
      secondary: { bg: "grey.300", _hover: { bg: "grey.200" } },
    },
  },
  defaultVariants: {
    color: "light",
  },
});
