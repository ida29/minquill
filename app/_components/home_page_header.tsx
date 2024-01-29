// components/home_page_header.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { CreatePostBtn } from "@/app/_components/create_post_btn";
import { Dictionary } from "@/app/_utils/dictionary";
import { useSession } from "next-auth/react";
import { FiMenu, FiXCircle } from "react-icons/fi";
import { LoginBtn } from "@/app/_components/login_btn";

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
  let buttons2;
  let logo;
  if (status === "authenticated") {
    buttons = (
      <>
        <div
          onClick={handleMenuClick}
          className={css({
            fontSize: "2rem",
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
        <div
          className={css({
            bg: "bg2",
            color: "text1",
            fontSize: "1rem",
            fontWeight: "700",
            padding: ".5rem 2rem",
            border: "4px solid",
            borderColor: "text1",
            borderRadius: "9999px",
            userSelect: "none",
          })}
        >
          {params.dict.create_post}
        </div>
      </>
    );
    buttons2 = (
      <>
        <div
          onClick={handleMenuClick}
          className={css({
            fontSize: "2rem",
            borderRadius: "50%",
            pointerEvents: "none",
            color: "text1",
          })}
        >
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
        </div>
        <CreatePostBtn text={params.dict.create_post} />
      </>
    );
    logo = <div className={logoStyle()}>{params.dict.minquill}</div>;
  } else if (status === "loading") {
    buttons = <></>;
    buttons2 = <></>;
    logo = <div className={logoStyle()}>Loading...</div>;
  } else {
    buttons = (
      <>
        <LoginBtn text={params.dict.login} />
      </>
    );
    buttons2 = (
      <>
        <LoginBtn text={params.dict.login} />
      </>
    );
    logo = <div className={logoStyle()}>{params.dict.minquill}</div>;
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
        >
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
            })}
          >
            <Link href={`/`}>{logo}</Link>
          </li>
          <li
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "text2",
            })}
          >
            {buttons2}
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
