//app/_components/publish_photos_btn.tsx

"use client";

import { ActionButton } from "@/app/_components/action_button";
import { Photo, createPhoto } from "@/app/_utils/photo";
import { useRouter } from "next/navigation";

export const PublishPhotoBtn = ({
  text,
  colorVariant = "default",
  className,
  username,
  photosValue,
  setPhotos,
  titleValue,
  setTitle,
  tagsValue,
  setTags,
}: {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  username?: string;
  photosValue: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
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
      const newPhoto: Photo = {
        title: title,
        url: photosValue[0],
        tags: tags as [],
      };
      router.push(`/photos`);
      const photo = await createPhoto(newPhoto);
      if (photo === undefined) {
        console.error("Failed to create photo");
        return;
      }

      setPhotos([]);
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
