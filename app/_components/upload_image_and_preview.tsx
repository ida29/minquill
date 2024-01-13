"use client";

import { css } from "@/styled-system/css";
import { ActionButton } from "@/app/_components/action_button";
import React, { useRef } from "react";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";

type UploadImgNPreviewProps = {
  text: string;
  text2: string;
  coverImg: string;
  setCoverImg: (coverImg: string) => void;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const UploadImgNPreview: React.FC<UploadImgNPreviewProps> = ({
  text,
  text2,
  coverImg,
  setCoverImg,
  colorVariant = "default",
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadImg = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    console.log(text2);
    setIsUploading(true);
    if (!event.target.files || event.target.files.length === 0) {
      setIsUploading(false);
      return;
    }

    const files = Array.from(event.target.files);
    for (const file of files) {
      const res = await fetch("/api/images/onetime_upload_url", {
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
      setCoverImg(`${res2_json.result.variants[0]}`);
      setIsUploading(false);
    }
  };

  const btnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const btnClick2 = () => {
    setCoverImg("");
  };

  let preview = <></>;
  if (coverImg !== "") {
    preview = (
      <>
        <div
          className={css({
            display: "flex",
            marginBottom: "1.6rem",
          })}
        >
          <Image
            width="200"
            height="200"
            alt="Cover image preview"
            src={coverImg as string}
          />
          <FiX
            className={css({
              fontSize: "1.5rem",
              margin: "0.5rem",
              borderRadius: "50%",
              _hover: {
                bg: "lightgrey",
              },
            })}
            onClick={btnClick2}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={css({
          marginBottom: "2rem",
        })}
      >
        <ActionButton
          text={isUploading ? text2 : text}
          colorVariant={colorVariant}
          className={className}
          onClick={btnClick}
        />
        <input
          hidden
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleUploadImg(e, setIsUploading);
          }}
          onClick={(e) => {
            (e.target as HTMLInputElement).value = "";
          }}
        />
      </div>
      {preview}
    </>
  );
};
