"use client";
import { signOut } from "next-auth/react";
import { ActionButton } from "@/components/action_button";
//import { css, cva } from "@/styled-system/css";

type LogoutBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
};

export const LogoutBtn: React.FC<LogoutBtnProps> = ({
  text,
  colorVariant = "default",
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      onClick={() => signOut()}
    />
  );
};
