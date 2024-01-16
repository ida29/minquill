"use client";

import { DragEvent, useState } from "react";
import { css, cva } from "@/styled-system/css";
import { FiArrowDownCircle } from "react-icons/fi";
import { UploadImgBtn2 } from "@/app/_components/upload_img_btn2";

type UploadImgDropProps = {
  text: string;
  text2: string;
  imagesValue?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
};

export const UploadImgDrop2: React.FC<UploadImgDropProps> = ({
  text,
  text2,
  imagesValue,
  setImages,
  multiple = false,
}) => {
  const [dragIsOver, setDragIsOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
    setIsUploading(true);

    let files = Array.from(event.dataTransfer.files);

    if (!multiple) {
      files = files.slice(0, 1);
    }

    const images: string[] = imagesValue === undefined ? [] : imagesValue;
    for (const file of files) {
      const res = await fetch("/api/onetime_upload_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to get the upload URL");
        setIsUploading(false);
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

  return (
    <div
      className={css({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={dragAreaStyle({ dragIsOver: dragIsOver ? "over" : "leave" })}
      >
        {!isUploading ? (
          <>
            <FiArrowDownCircle
              className={css({
                fontSize: "1.6rem",
                margin: "0 0.3rem 0.3rem 0",
              })}
            />
            {text}
            <div
              className={css({
                fontSize: "1.6rem",
                margin: "0 0 0.6rem 0.6rem",
              })}
            >
              <UploadImgBtn2
                text={text2}
                imagesValue={imagesValue}
                setImages={setImages}
              />
            </div>
          </>
        ) : (
          <>Uploading...</>
        )}
      </div>
    </div>
  );
};

const dragAreaStyle = cva({
  base: {
    bg: "bg3",
    textDecoration: "none",
    fontSize: "1rem",
    lineHeight: "1",
    padding: "0.8em 1em",
    borderRadius: "10px",
    cursor: "pointer",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    sm: {
      fontSize: "1.2rem",
    },
    md: {
      fontSize: "1.4rem",
    },
    lg: {
      fontSize: "1.6rem",
    },
  },
  variants: {
    dragIsOver: {
      over: { border: "4px solid black", bg: "lightgrey" },
      leave: { border: "4px dotted lightgrey" },
    },
  },
});
