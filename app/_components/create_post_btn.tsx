// components/create_post_btn.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { css, cva } from "@/styled-system/css";
import { FiFileText, FiImage } from "react-icons/fi";

type CreatePostBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
};

export const CreatePostBtn: React.FC<CreatePostBtnProps> = ({
  text,
  colorVariant = "primary",
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={css({
          bg: "bg2",
          color: "text2",
          fontSize: "1rem",
          fontWeight: "700",
          padding: ".5rem 2rem",
          border: "4px solid",
          borderColor: "text2",
          borderRadius: "9999px",
          _hover: {
            cursor: "pointer",
            bg: "stone.700",
          },
        })}
      >
        {text}
      </button>
      {menuVisible && (
        <div
          ref={menuRef}
          className={css({
            position: "absolute",
            top: "90%",
            right: "1.5rem",
            width: "10rem",
            zIndex: 1,
            marginTop: "1rem",
            borderRadius: "0.5rem",
            bg: "bg3",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.2rem",
            fontWeight: "700",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
          })}
        >
          <Link
            href={`/articles/new`}
            className={css({
              display: "flex",
              gap: ".5rem",
              color: "text1",
              borderRadius: ".5rem .5rem 0 0",
              padding: "1rem",
              _hover: {
                bg: "rgba(0,0,0,0.1)",
              },
            })}
          >
            <FiFileText
              className={css({
                fontSize: "1.5rem",
              })}
            />
            Article
          </Link>
          <Link
            href={`/photos/new`}
            className={css({
              display: "flex",
              gap: ".5rem",
              color: "text1",
              borderRadius: "0 0 .5rem .5rem",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              padding: "1rem",
              _hover: {
                bg: "rgba(0,0,0,0.1)",
              },
            })}
            onClick={() => router.push("/photos/new")}
          >
            <FiImage
              className={css({
                fontSize: "1.5rem",
              })}
            />
            Photo
          </Link>
        </div>
      )}
    </>
  );
};
