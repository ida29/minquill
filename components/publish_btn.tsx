"use client";
import { ActionButton } from "@/components/action_button";
import useLocalStorageState from "use-local-storage-state";
import { savePost } from "@/app/[lang]/post";
import { Post } from "@/app/[lang]/post";
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
  const [contentValue, setContentValue] = useLocalStorageState("contentValue");
  const content = contentValue as string;
  const newPost: Post = {
    title: content ? content.split("\n")[0].replace(/^#+\s*/, "") : "",
    content: content,
  };

  const handlePublish = async (newPost: Post) => {
    try {
      await savePost(newPost);
      setContentValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => handlePublish(newPost)}
    />
  );
};
