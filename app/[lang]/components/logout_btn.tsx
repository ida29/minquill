"use client";
import { signOut } from "next-auth/react";
import { ActionButton } from "@/app/[lang]/components/action_button";
//import { css, cva } from "@/styled-system/css";

type LogoutBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const LogoutBtn: React.FC<LogoutBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => signOut()}
    />
  );
};
