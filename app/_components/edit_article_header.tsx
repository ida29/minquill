// components/edit_article_header.tsx
"use client";
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
//import { useSession } from "next-auth/react";
import {
  FiFeather,
  FiPlayCircle,
  FiHelpCircle,
  FiArrowLeftCircle,
  FiMinus,
} from "react-icons/fi";

export const EditArticleHeader = (params: {
  dict: Dictionary;
  username: string;
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  handleTabClick: (index: number) => void;
}) => {
  const tabStrArr: React.ReactNode[] = [
    <FiFeather key="0" />,
    <FiPlayCircle key="1" />,
    <FiHelpCircle key="2" />,
  ];

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
              href={`/${params.username}`}
              className={css({
                fontSize: "2rem",
              })}
            >
              <FiArrowLeftCircle />
            </Link>
          </li>
          <li>
            <div
              className={css({
                fontSize: "2rem",
                transform: "rotate(90deg)",
              })}
            >
              <FiMinus />
            </div>
          </li>
          {tabStrArr.map((tabName, index) => (
            <li
              key={index}
              onClick={() => params.handleTabClick(index)}
              className={`${liStyle()} 
                  ${index === params.activeTabIndex ? activeTab() : ""}`}
            >
              {tabName}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const liStyle = cva({
  base: {
    margin: "0.5rem",
    padding: "0.2rem",
    listStyle: "none",
    display: "inline-block",

    fontSize: "2rem",
    _hover: {
      bg: "stone.600",
    },
    borderRadius: "10px",
  },
});

const activeTab = cva({
  base: {
    color: "text1",
    bg: "yellow",

    position: "relative",
    zIndex: "1",
    _hover: { bg: "yellow !important" },
  },
});
