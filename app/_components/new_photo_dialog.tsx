// components/new_photo_dialog.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { UploadImgDrop2 } from "./upload_img_drop2";
import { css, cva } from "@/styled-system/css";

export const NewPhotoDialog = ({
  dict,
  photosValue,
  setPhotos,
}: {
  dict: Dictionary;
  photosValue: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div
      className={css({
        height: "70dvh",
        width: "90dvw",
      })}
    >
      <UploadImgDrop2
        text={dict.drag_n_drop_some_images_here}
        text2={dict.click}
        imagesValue={photosValue}
        setImages={setPhotos}
      />
    </div>
  );
};
