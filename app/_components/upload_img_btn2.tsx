// component/upload_img_btn2.tsx

"use client";

//import { css } from "@/styled-system/css";
import { ActionButton } from "@/app/_components/action_button";
import React, { useState, useRef } from "react";

type UploadImgBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  imagesValue?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
};

export const UploadImgBtn2: React.FC<UploadImgBtnProps> = ({
  text,
  colorVariant = "default",
  className,
  imagesValue,
  setImages,
  multiple = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadImg = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    setIsUploading(true);

    let files = Array.from(event.target.files);

    if (!multiple) {
      files = files.slice(0, 1);
    }

    const images: string[] = imagesValue === undefined ? [] : imagesValue;
    for (const file of files) {
      const res = await fetch("/api/images/onetime_upload_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to get the upload URL");
        return;
      }
      const res_json = await res.json();

      const formData = new FormData();
      formData.append("file", file);

      const res2 = await fetch(res_json.uploadURL, {
        method: "POST",
        body: formData,
      });

      if (!res2.ok) {
        console.error("Failed to get the upload URL");
        setIsUploading(false);
        return;
      }

      const res2_json = await res2.json();
      images.push(`${res2_json.result.variants[0]}`);
    }

    setImages(images);
    setIsUploading(false);
  };

  const btnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <label>
        <ActionButton
          text={!isUploading ? text : "Uploading..."}
          colorVariant={colorVariant}
          className={className}
          onClick={btnClick}
        />
        <input
          hidden
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUploadImg}
        />
      </label>
    </>
  );
};
