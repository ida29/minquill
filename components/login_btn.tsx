"use client";
import { signIn } from "next-auth/react";
import { ActionButton } from "@/components/action_button";
//import { css, cva } from "@/styled-system/css";

type LoginBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
};

export const LoginBtn: React.FC<LoginBtnProps> = ({
  text,
  colorVariant = "default",
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      onClick={() => signIn()}
    />
  );
};
