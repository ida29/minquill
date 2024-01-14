"use client";
import { ActionButton } from "@/app/_components/action_button";
import useLocalStorageState from "use-local-storage-state";
import { createArticle } from "@/app/_utils/article";
import { Article } from "@/app/_utils/article";
import { useRouter } from "next/navigation";

type PublishBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  username?: string;
};

export const PublishBtn: React.FC<PublishBtnProps> = ({
  text,
  colorVariant = "default",
  className,
  username,
}) => {
  const router = useRouter();
  const [contentValue, setContent] = useLocalStorageState("article_content");
  const [titleValue, setTitle] = useLocalStorageState("article_title");
  const [coverImg, setCoverImg] = useLocalStorageState<string>("cover_img");
  const [tagsValue, setTags] = useLocalStorageState("tags");
  const content = contentValue as string;
  const title = titleValue as string;
  const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
  const newArticle: Article = {
    title: title,
    content: content,
    coverImg: coverImg,
    tags: tags as [],
  };

  const handlePublish = async (newArticle: Article) => {
    try {
      router.push(`/${username}`);
      await createArticle(newArticle);
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
      onClick={() => handlePublish(newArticle)}
    />
  );
};
