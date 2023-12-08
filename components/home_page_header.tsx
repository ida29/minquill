// components/home_page_header.tsx
"use client";

import { css, cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { CreatePostBtn } from "@/components/create_post_btn";
import { Dictionary } from "@/app/[lang]/dictionary";
import { useSession } from "next-auth/react";
import { FiMenu, FiXCircle } from "react-icons/fi";

export const HomePageHeader = (params: {
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
  if (!session) {
    buttons = <>Now Loading...</>;
  } else if (status === "authenticated") {
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
                color: "text2",
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
                color: "text2",
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
        <CreatePostBtn text={params.dict.create_post} />
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
        sm: { padding: "0 1rem" },
        md: { padding: "0 1.5rem" },
        lg: { padding: "0 2rem" },
      })}
    >
      <nav className={navStyle()}>
        <ul
          className={css({
            height: "100%",
          })}
        >
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "auto",
              gap: "0.8rem",
              height: "100%",
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
