"use client";
import { ActionButton } from "@/components/action_button";
import useLocalStorageState from "use-local-storage-state";
import { savePost } from "@/app/[lang]/post";
import { Post } from "@/app/[lang]/post";
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
  const [contentValue, setContentValue] = useLocalStorageState("contentValue");
  const [titleValue, setTitleValue] = useLocalStorageState("title");
  const [coverImg, setCoverImg] = useLocalStorageState<string>("cover_img");
  const [tagsValue, setTags] = useLocalStorageState("tags");
  const content = contentValue as string;
  const title = titleValue as string;
  const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
  const newPost: Post = {
    title: title,
    content: content,
    coverImg: coverImg,
    tags: tags as [],
  };

  const handlePublish = async (newPost: Post) => {
    try {
      router.push(`/${username}`);
      await savePost(newPost);
      setContentValue("");
      setTitleValue("");
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
      onClick={() => handlePublish(newPost)}
    />
  );
};
