//app/_components/publish_images_btn.tsx

"use client";

import { ActionButton } from "@/app/_components/action_button";
//import { createImage } from "@/app/_utils/image";
//import { Image } from "@/app/_utils/image";
import { useRouter } from "next/navigation";

export const PublishImageBtn = ({
  text,
  colorVariant = "default",
  className,
  username,
  imagesValue,
  setImages,
  titleValue,
  setTitle,
  tagsValue,
  setTags,
}: {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  username?: string;
  imagesValue: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  titleValue: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  tagsValue: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const title = titleValue as string;
      const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
      //const newImage: Image = {
      //  title: title,
      //  image: imagesValue[0],
      //  tags: tags as [],
      //};
      router.push(`/${username}`);
      //const image = await createImage(newImage);
      //if (image === undefined) {
      //  console.error("Failed to create image");
      //  return;
      //}

      setImages([]);
      setTitle("");
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
