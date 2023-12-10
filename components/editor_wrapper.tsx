// components/editor_wrapper.tsx
"use client";

//import Link from "next/link";
import { Dictionary } from "@/app/[lang]/dictionary";
import { EditorHeader } from "./editor_header";
import { EditorBody } from "./editor_body";
import { useState } from "react";
import { css, cva } from "@/styled-system/css";
//import { useSession } from "next-auth/react";

export const EditorWrapper = (params: {
  dict: Dictionary;
  username: string;
}) => {
  //const { data: session, status } = useSession();
  const { dict, username } = params;
  const [isMenuOpen, setMenuOpen] = useState(false);
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
    <div
      key="0"
      className={css({
        borderRadius: "0.5rem",
        width: "100%",
        textAlign: "center",
        _hover: {
          bg: "rgba(0, 0, 0, 0.2)",
        },
      })}
    >
      dummy
    </div>,
  ];

  return (
    <div
      data-theme="normal"
      data-color-mode="light"
      className={css({
        overflow: "auto",
        bg: "bg1",
      })}
    >
      <div
        className={css({
          marginRight: "auto",
          marginLeft: "auto",
          height: "100vh",
          width: "100vw",
          sm: { width: "100vw" },
          md: { width: "95vw" },
          lg: { width: "90vw" },
        })}
      >
        <EditorHeader
          dict={dict}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
        <EditorBody dict={dict} username={username} />

        {isMenuOpen && (
          <div
            aria-hidden={!isMenuOpen ? "true" : "false"}
            className={outerMenuStyle()}
            onClick={(e) => closeWithClickOutSide(e, setMenuOpen)}
          >
            <div className={menuStyle()}>
              <nav
                className={css({
                  width: "80%",
                })}
              >
                <ul
                  className={css({
                    fontSize: "1.5rem",
                    padding: "1rem",
                    width: "100%",
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
      </div>
    </div>
  );
};

const outerMenuStyle = cva({
  base: {
    bg: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    top: "4.4rem",
    left: "0",
    zIndex: "100",
    position: "fixed",
  },
});

const menuStyle = cva({
  base: {
    borderRadius: "0 2rem 2rem 0",
    bg: "bg1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    top: "4.4rem",
    left: "0",
    zIndex: "100",
    position: "fixed",
    width: "60%",
    sm: { width: "50%" },
    md: { width: "40%" },
    lg: { width: "30%" },
  },
});
