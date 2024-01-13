"use client";

//import { css } from "@/styled-system/css";
import { ActionButton } from "@/app/[lang]/_components/action_button";
import useLocalStorageState from "use-local-storage-state";
import React, { useRef } from "react";

type UploadImgBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const UploadImgBtn: React.FC<UploadImgBtnProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [contentValue, setContentValue] =
    useLocalStorageState<string>("contentValue");

  const handleUploadImg = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(event.target.files[i]);
    }

    let content = contentValue;
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
        return;
      }

      const res2_json = await res2.json();
      content += `\n\n![${res2_json.result.filename}](${res2_json.result.variants[0]})`;
    }

    setContentValue(content);
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
          text={text}
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
