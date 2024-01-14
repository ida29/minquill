// components/new_image.tsx

"use client";

import Image from "next/image";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import { UploadImgDrop } from "@/app/_components/upload_img_drop";
import useLocalStorageState from "use-local-storage-state";
//import React, { useState } from "react";
import { ActionButton } from "@/app/_components/action_button";

export const NewImage = (params: { dict: Dictionary }) => {
  //const [contentValue, setContent] = useState<string>("");
  const [contentValue, setContent] = useLocalStorageState("image_content", {
    defaultValue: "",
  });
  const [titleValue, setTitle] = useLocalStorageState("image_title", {
    defaultValue: "aaaa",
  });

  const extractImageUrls = (markdownText: string): string[] => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const urls = [];
    let match;

    while ((match = regex.exec(markdownText)) !== null) {
      urls.push(match[1]);
    }

    return urls;
  };

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        })}
      >
        <div
          className={css({
            width: "95%",
            marginBottom: "1.4rem",
            sm: {
              width: "80%",
              marginBottom: "1.6rem",
            },
            md: {
              width: "75%",
              marginBottom: "1.8rem",
            },
            lg: {
              width: "70%",
              marginBottom: "2rem",
            },
          })}
        >
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1.6rem",
            })}
          ></div>
        </div>
      </div>
    </main>
  );
};
