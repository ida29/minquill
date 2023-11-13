"use client";

//import { css } from "@/styled-system/css";
import useLocalStorageState from "use-local-storage-state";
import { DragEvent, useState } from "react";
import { css, cva } from "@/styled-system/css";
import { FiArrowDownCircle } from "react-icons/fi";

type UploadImgDropProps = {
  text: string;
};

export const UploadImgDrop: React.FC<UploadImgDropProps> = ({ text }) => {
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
      </div>
    </div>
  );
};

const dragAreaStyle = cva({
  base: {
    textDecoration: "none",
    fontSize: "1.6rem",
    lineHeight: "1",
    padding: "0.8em 1em",
    border: "2px solid black",
    borderRadius: "10px",
    boxShadow: "2px 2px 0 #000",
    cursor: "pointer",
    height: "30dvh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  variants: {
    dragIsOver: {
      over: { border: "4px solid black", bg: "lightgrey" },
      leave: { border: "2px solid black" },
    },
  },
});
