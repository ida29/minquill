"use client";
import { signIn } from "next-auth/react";
import { ActionButton } from "@/app/[lang]/_components/action_button";
//import { css, cva } from "@/styled-system/css";

type SigninWithGoogleBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const SigninWithGoogleBtn: React.FC<SigninWithGoogleBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => signIn("google")}
    />
  );
};
