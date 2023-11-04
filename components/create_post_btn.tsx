// components/create_post_btn.tsx
"use client";

import { useRouter } from "next/navigation";
import { ActionButton } from "@/components/action_button";
//import { css, cva } from "@/styled-system/css";

type CreatePostBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
};

export const CreatePostBtn: React.FC<CreatePostBtnProps> = ({
  text,
  colorVariant = "primary",
}) => {
  const router = useRouter();

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      onClick={() => router.push("/protected/posts/new")}
    />
  );
};
