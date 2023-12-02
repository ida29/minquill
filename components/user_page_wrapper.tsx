// components/user_page_wrapper.tsx
"use client";

import { Dictionary } from "@/app/[lang]/dictionary";
import { UserPageHeader } from "./user_page_header";
import { UserPageBody } from "./user_page_body";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { css, cva } from "@/styled-system/css";

export const UserPageWrapper = (params: {
  dict: Dictionary;
  username: string;
}) => {
  const { dict } = params;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };
  const closeWithClickOutSide = (
    e: React.MouseEvent,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    } else {
    }
  };
  const menuContents: React.ReactNode[] = [
    <div key="0">menu 1</div>,
    <div key="1">menu 2</div>,
    <div key="2">menu 3</div>,
    <div key="3">menu 4</div>,
  ];

  return (
    <>
      <UserPageHeader
        dict={dict}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />
      <UserPageBody dict={dict} />

      {isMenuOpen && (
        <div
          aria-hidden={!isMenuOpen ? "true" : "false"}
          className={outerMenuStyle()}
          onClick={(e) => closeWithClickOutSide(e, setMenuOpen)}
        >
          <div className={menuStyle()}>
            <div
              className={css({
                width: "100%",
              })}
            >
              <FiXCircle
                onClick={handleMenuClick}
                className={css({
                  marginRight: "auto",
                  fontSize: "2rem",
                  _hover: { bg: "lightgray" },
                  borderRadius: "50%",
                  margin: "14px 16px",
                })}
              />
            </div>
            <nav>
              <ul
                className={css({
                  fontSize: "1.5rem",
                })}
              >
                {menuContents.map((content, index) => (
                  <li
                    key={index}
                    className={css({
                      marginBottom: "0.8rem",
                    })}
                  >
                    {content}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

const outerMenuStyle = cva({
  base: {
    bg: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    zIndex: "100",
    position: "fixed",
  },
});

const menuStyle = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bg: "white",
    width: "80%",
    height: "100%",
    top: "0",
    right: "0",
    zIndex: "100",
    position: "fixed",
  },
});
