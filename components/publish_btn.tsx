"use client";
import { ActionButton } from "@/components/action_button";
import useLocalStorageState from "use-local-storage-state";
//import { css, cva } from "@/styled-system/css";

type PublishBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const PublishBtn: React.FC<PublishBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  const [contentValue] = useLocalStorageState("contentValue");
  const content = contentValue as string;

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => handlePublish(content)}
    />
  );
};

async function handlePublish(content: string) {
  try {
    await savePost(content);
  } catch (error) {
    console.error(error);
  }
}

async function savePost(content: string) {
  const response = await fetch("/api/protected/posts", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "title",
      content: content.slice(0, 2000),
    }),
  });

  if (response.ok) {
    await response.json();
  } else {
    console.error("Failed to publish:", response);
  }
}
