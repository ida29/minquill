// components/post_page_wrapper.tsx
"use client";

import { Dictionary } from "@/app/[lang]/utils/dictionary";
import { PostPageHeader } from "./post_page_header";
import { PostPageBody } from "./post_page_body";
import { useState } from "react";
import { css, cva } from "@/styled-system/css";
//import { useSession } from "next-auth/react";

export const PostPageWrapper = (params: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  //const { data: session, status } = useSession();
  const { dict, username, unique } = params;
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
        })}
      >
        <PostPageHeader
          dict={dict}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
        <PostPageBody dict={dict} username={username} unique={unique} />

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
    width: "100vw",
    height: "100%",
    top: "4.4rem",
    left: "0",
    zIndex: "100",
    position: "fixed",
  },
});

const menuStyle = cva({
  base: {
    bg: "bg1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(60dvh - 4.4rem)",
    top: "4.4rem",
    zIndex: "100",
    position: "fixed",
    width: "100%",
  },
});
