// components/user_page_wrapper.tsx
"use client";

import Link from "next/link";
import { Dictionary } from "@/app/[lang]/dictionary";
import { UserPageHeader } from "./user_page_header";
import { UserPageBody } from "./user_page_body";
import { useState } from "react";
import { css, cva } from "@/styled-system/css";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export const UserPageWrapper = (params: {
  dict: Dictionary;
  username: string;
}) => {
  const { data: session, status } = useSession();
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
    <Link key="0" href={`/${session?.user?.username}`}>
      {session?.user?.username.split("-")[0]}
    </Link>,
    status === "authenticated" ? (
      <Link key="1" href="javascript: void(0);" onClick={() => signOut()}>
        {dict.logout}
      </Link>
    ) : (
      <Link key="1" href="javascript: void(0);" onClick={() => signIn()}>
        {dict.login}
      </Link>
    ),
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
        <UserPageHeader
          dict={dict}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
        <UserPageBody dict={dict} username={username} />

        {isMenuOpen && (
          <div
            aria-hidden={!isMenuOpen ? "true" : "false"}
            className={outerMenuStyle()}
            onClick={(e) => closeWithClickOutSide(e, setMenuOpen)}
          >
            <div className={menuStyle()}>
              <nav
                className={css({
                  width: "98%",
                })}
              >
                <ul
                  className={css({
                    fontSize: "1.5rem",
                    padding: "0.5rem 1rem",
                  })}
                >
                  {menuContents.map((content, index) => (
                    <li
                      key={index}
                      className={css({
                        marginBottom: "0.8rem",
                        width: "100%",
                        padding: "0.5rem 1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "0.5rem",
                        _hover: {
                          bg: "rgba(0, 0, 0, 0.2)",
                        },
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
    bg: "bg1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    top: "4.4rem",
    left: "0",
    zIndex: "100",
    position: "fixed",
    width: "250px",
  },
});
