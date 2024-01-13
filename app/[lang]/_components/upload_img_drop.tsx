"use client";

//import { css } from "@/styled-system/css";
import useLocalStorageState from "use-local-storage-state";
import { DragEvent, useState } from "react";
import { css, cva } from "@/styled-system/css";
import { FiArrowDownCircle } from "react-icons/fi";
import { UploadImgBtn } from "@/app/[lang]/_components/upload_img_btn";

type UploadImgDropProps = {
  text: string;
  text2: string;
};

export const UploadImgDrop: React.FC<UploadImgDropProps> = ({
  text,
  text2,
}) => {
  const [contentValue, setContentValue] =
    useLocalStorageState<string>("contentValue");
  const [dragIsOver, setDragIsOver] = useState(false);

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

    let content = contentValue;
    const files = Array.from(event.dataTransfer.files);
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

  return (
    <div
      className={css({
        width: "100%",
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
          <UploadImgBtn text={text2} />
        </div>
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
    height: "20dvh",
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
