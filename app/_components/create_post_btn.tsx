// components/create_post_btn.tsx
"use client";

import { useRouter } from "next/navigation";
import { ActionButton } from "@/app/_components/action_button";
//import { css, cva } from "@/styled-system/css";

type CreatePostBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const CreatePostBtn: React.FC<CreatePostBtnProps> = ({
  text,
  colorVariant = "primary",
  className,
}) => {
  const router = useRouter();

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => router.push("/posts/new")}
    />
  );
};
