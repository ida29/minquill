// components/user_page_header.ts
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/app/_components/sign_in_with_google_btn";
import { Dictionary } from "@/app/_utils/dictionary";
import { useSession } from "next-auth/react";
import { FiMenu, FiXCircle } from "react-icons/fi";

export const UserPageHeader = (params: {
  dict: Dictionary;
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();
  const { isMenuOpen, setMenuOpen } = params;
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  let buttons;
  if (!session || status === "authenticated") {
    buttons = (
      <>
        <div
          onClick={handleMenuClick}
          className={css({
            fontSize: "2rem",
            _hover: {},
            borderRadius: "50%",
          })}
        >
          {!isMenuOpen ? (
            <FiMenu
              className={css({
                marginTop: "3px",
                width: "2rem",
                borderRadius: "50%",
                sm: { width: "2.2rem" },
                md: { width: "2.3rem" },
                lg: { width: "2.4rem" },
              })}
            />
          ) : (
            <FiXCircle
              className={css({
                marginTop: "3px",
                width: "2rem",
                borderRadius: "50%",
                sm: { width: "2.2rem" },
                md: { width: "2.3rem" },
                lg: { width: "2.4rem" },
              })}
            />
          )}
        </div>
      </>
    );
  } else {
    buttons = <SigninWithGoogleBtn text={params.dict.login} />;
  }

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
      <nav className={navStyle()}>
        <ul
          className={css({
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              color: "text2",
            })}
          >
            {buttons}
          </li>
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            })}
          >
            <Link href={`/articles`}>
              <div className={logoStyle()}>{params.dict.minquill}</div>
            </Link>
          </li>
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              color: "text1",
              pointerEvents: "none",
            })}
          >
            {buttons}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const navStyle = cva({
  base: {
    width: "100%",
    height: "4.4rem",
  },
});

const logoStyle = cva({
  base: {
    padding: "0.3rem 0.5rem 0.2rem 0.5rem",
    color: "text2",
    fontWeight: "700",
    fontSize: "1.4rem",
    lineHeight: "1",
    border: "4px solid",
    borderColor: "text2",
    display: "none",
    sm: { display: "block" },
  },
});
