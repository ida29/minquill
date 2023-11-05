"use client";
import { signIn } from "next-auth/react";
import { ActionButton } from "@/components/action_button";
//import { css, cva } from "@/styled-system/css";

type UploadImgBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const UploadImgBtn: React.FC<UploadImgBtnProps> = ({
  text,
  colorVariant = "primary",
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
