// components/back_btn.tsx
"use client";

import { ActionButton } from "@/app/_components/action_button";
import { useRouter } from "next/navigation";

type BackBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const BackBtn: React.FC<BackBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  const router = useRouter();

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => router.push("/")}
    />
  );
};
