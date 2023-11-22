"use client";

import { css } from "@/styled-system/css";
import { ActionButton } from "@/components/action_button";
import useLocalStorageState from "use-local-storage-state";
import React, { useRef } from "react";
import { FiX } from "react-icons/fi";

type UploadImgNPreviewProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const UploadImgNPreview: React.FC<UploadImgNPreviewProps> = ({
  text,
  colorVariant = "default",
  className,
}) => {
  const [coverImg, setCoverImg] = useLocalStorageState<string>("cover_img");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadImg = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
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
      console.log(res2_json);
      setCoverImg(`${res2_json.result.variants[0].replace(/[^/]+$/, "h=200")}`);
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
  if (coverImg != "") {
    preview = (
      <>
        <div
          className={css({
            display: "flex",
          })}
        >
          <img alt="Cover image" src={coverImg as string} />
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
          onChange={handleUploadImg}
        />
      </div>
      {preview}
    </>
  );
};
