"use client";
import { signIn } from "next-auth/react";
import { ActionButton } from "@/components/action_button";
//import { css, cva } from "@/styled-system/css";

type SigninWithGoogleBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
};

export const SigninWithGoogleBtn: React.FC<SigninWithGoogleBtnProps> = ({
  text,
  colorVariant = "default",
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      onClick={() => signIn("google")}
    />
  );
};
