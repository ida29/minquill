// components/editor_header.tsx
"use client";
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
//import { Dictionary } from "@/app/[lang]/dictionary";
import useLocalStorageState from "use-local-storage-state";
import {
  FiFeather,
  FiPlayCircle,
  FiImage,
  FiHelpCircle,
  FiSliders,
  FiArrowLeftCircle,
} from "react-icons/fi";

export const EditorHeader = (params: {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isMenuOpen, setMenuOpen } = params;
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  const tabStrArr: React.ReactNode[] = [
    <FiFeather key="0" />,
    <FiPlayCircle key="1" />,
    <FiImage key="2" />,
    <FiHelpCircle key="3" />,
  ];
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
    <header className={headerStyle()}>
      <Link
        href={"/"}
        className={css({
          fontSize: "2rem",
          _hover: { bg: "lightgray" },
          borderRadius: "50%",
        })}
      >
        <FiArrowLeftCircle />
      </Link>
      <ul className={ulStyle()}>
        {tabStrArr.map((tabName, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index)}
            className={`${liStyle()} 
                  ${index === activeTabIndex ? activeTab() : ""}`}
          >
            {tabName}
          </li>
        ))}
      </ul>
      <div
        className={css({
          fontSize: "2rem",
          _hover: { bg: "lightgray" },
          borderRadius: "50%",
        })}
      >
        <FiSliders onClick={handleMenuClick} />
      </div>
    </header>
  );
};

const headerStyle = cva({
  base: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "99",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    bg: "white",

    width: "100%",
    borderBottom: "2px solid black",

    height: "4.4rem",

    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});

const ulStyle = cva({
  base: {
    display: "flex",
    alignItems: "center",
    border: "2px solid black",
    height: "3rem",
    borderRadius: "10px",
    padding: "0 0.5rem",
  },
});

const liStyle = cva({
  base: {
    margin: "0.5rem",
    listStyle: "none",
    display: "inline-block",

    fontSize: "2rem",
    _hover: { bg: "lightgray" },
    borderRadius: "50%",
  },
});

const activeTab = cva({
  base: {
    bg: "lightgreen",

    position: "relative",
    zIndex: "1",
    _hover: { bg: "lightgreen !important" },
  },
});
