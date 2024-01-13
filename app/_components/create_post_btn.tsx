// components/create_post_btn.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ActionButton } from "@/app/_components/action_button";
import { css, cva } from "@/styled-system/css";
import { FiFileText, FiImage } from "react-icons/fi";

type CreatePostBtnProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
};

export const CreatePostBtn: React.FC<CreatePostBtnProps> = ({
  text,
  colorVariant = "primary",
  className,
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
      <ActionButton
        text={text}
        colorVariant={colorVariant}
        className={className}
        onClick={handleButtonClick}
      />
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
            href={`/images/new`}
            className={css({
              display: "flex",
              gap: ".5rem",
              color: "text1",
              borderRadius: "0 0 .5rem .5rem",
              padding: "1rem",
              _hover: {
                bg: "rgba(0,0,0,0.1)",
              },
            })}
            onClick={() => router.push("/images/new")}
          >
            <FiImage
              className={css({
                fontSize: "1.5rem",
              })}
            />
            Image
          </Link>
        </div>
      )}
    </>
  );
};
