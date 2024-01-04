"use client";
import { signIn } from "next-auth/react";
import { ActionButton } from "@/app/[lang]/components/action_button";
//import { css, cva } from "@/styled-system/css";

type LoginBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const LoginBtn: React.FC<LoginBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => signIn()}
    />
  );
};
