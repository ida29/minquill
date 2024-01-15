//app/_components/publish_article_btn.tsx

"use client";

import { ActionButton } from "@/app/_components/action_button";
import { createArticle } from "@/app/_utils/article";
import { Article } from "@/app/_utils/article";
import { useRouter } from "next/navigation";

export const PublishArticleBtn = ({
  text,
  colorVariant = "default",
  className,
  username,
  contentValue,
  setContent,
  titleValue,
  setTitle,
  coverImg,
  setCoverImg,
  tagsValue,
  setTags,
}: {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  username?: string;
  contentValue: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  titleValue: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  coverImg: string;
  setCoverImg: React.Dispatch<React.SetStateAction<string>>;
  tagsValue: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const content = contentValue as string;
      const title = titleValue as string;
      const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
      const newArticle: Article = {
        title: title,
        content: content,
        coverImg: coverImg,
        tags: tags as [],
      };
      router.push(`/${username}`);
      const article = await createArticle(newArticle);
      if (article === undefined) {
        console.error("Failed to create article");
        return;
      }

      setContent("");
      setTitle("");
      setCoverImg("");
      setTags("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ActionButton
      text={text}
      colorVariant={colorVariant}
      className={className}
      onClick={() => handlePublish()}
    />
  );
};
