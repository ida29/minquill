// components/editor_header.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/_utils/dictionary";
//import { useSession } from "next-auth/react";
import { FiArrowLeftCircle } from "react-icons/fi";

export const PostPageHeader = (params: { dict: Dictionary }) => {
  //const { data: session, status } = useSession();

  return (
    <header
      className={css({
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "99",
        width: "100%",
        height: "4.4rem",
        padding: "0 0.5rem",
        bg: "bg2",
        borderBottom: "1px solid",
        borderColor: "border1",
        sm: { padding: "0 1rem" },
        md: { padding: "0 1.5rem" },
        lg: { padding: "0 2rem" },
      })}
    >
      <nav
        className={css({
          color: "text2",
          width: "100%",
          height: "4.4rem",
        })}
      >
        <ul
          className={css({
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderRadius: "10px",
            padding: "0 0.5rem",
          })}
        >
          <li
            className={css({
              padding: "0.2rem",
              fontSize: "2rem",
              _hover: {
                bg: "stone.600",
              },
              borderRadius: "10px",
            })}
          >
            <Link
              href={"/"}
              className={css({
                fontSize: "2rem",
              })}
            >
              <FiArrowLeftCircle />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
