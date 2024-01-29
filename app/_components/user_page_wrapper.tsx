// components/user_page_wrapper.tsx
"use client";

import Link from "next/link";
import { Dictionary } from "@/app/_utils/dictionary";
import { UserPageHeader } from "./user_page_header";
import { UserPageBody } from "./user_page_body";
import { useState } from "react";
import { css, cva } from "@/styled-system/css";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { User } from "@/app/_utils/user";

export const UserPageWrapper = ({
  dict,
  user,
}: {
  dict: Dictionary;
  user: User;
}) => {
  const { data: session, status } = useSession();
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
    <Link
      key="0"
      href={`/${session?.user?.username}`}
      className={css({ width: "100%", height: "100%" })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        <Image
          width="48"
          height="48"
          src={session?.user?.image || ""}
          alt="User Image"
          className={css({
            borderRadius: "50%",
            marginRight: ".5rem",
          })}
        />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
          })}
        >
          <p>{session?.user?.name}</p>
          <p>{session?.user?.username}</p>
        </div>
      </div>
    </Link>,
    status === "authenticated" ? (
      <Link
        key="1"
        href=""
        onClick={() => signOut()}
        className={css({ width: "100%", height: "100%" })}
      >
        {dict.logout}
      </Link>
    ) : (
      <Link
        key="1"
        href=""
        onClick={() => signIn()}
        className={css({ width: "100%", height: "100%" })}
      >
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
        <UserPageBody dict={dict} user={user} />

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
                    fontSize: "1.2rem",
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
                          color: "text2",
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
    bg: "bg2",
    color: "text3",
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
