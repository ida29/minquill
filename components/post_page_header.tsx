// components/editor_header.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
//import { useSession } from "next-auth/react";
import {
  FiFeather,
  FiPlayCircle,
  FiHelpCircle,
  FiSliders,
  FiArrowLeftCircle,
  FiMinus,
} from "react-icons/fi";
import useLocalStorageState from "use-local-storage-state";

export const PostPageHeader = (params: {
  dict: Dictionary;
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //const { data: session, status } = useSession();
  const { isMenuOpen, setMenuOpen } = params;
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  const [activeTabIndex, setActiveTabIndex] = useLocalStorageState(
    "activeTab",
    {
      defaultValue: 0,
    },
  );
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

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
              href={"/"}
              className={css({
                fontSize: "2rem",
              })}
            >
              <FiArrowLeftCircle />
            </Link>
          </li>
          {/*}
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
          <li
            className={css({
              fontSize: "2rem",
              color: "text2",
              padding: "0.2rem",
              _hover: {
                bg: "stone.600",
              },
              borderRadius: "10px",
            })}
          >
            <FiSliders onClick={handleMenuClick} />
          </li>
			{*/}
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
