//app/[lang]/top/page.tsx

"use client";

import Link from "next/link";
import { Dictionary, getDictionary } from "@/app/_utils/dictionary";
import { HomePageHeader } from "@/app/_components/home_page_header";
import { useEffect, useState } from "react";
import { css, cva } from "@/styled-system/css";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FiFileText, FiHome, FiImage, FiLogIn, FiLogOut } from "react-icons/fi";

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { data: session, status } = useSession();
  const [dict, setDict] = useState<Dictionary>({});
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const dict = await getDictionary(lang);
      setDict(dict);
    })();
  }, [lang]);

  const closeWithClickOutSide = (
    e: React.MouseEvent,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
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
    <Link
      key="2"
      href="/articles/new"
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%",
      })}
    >
      <FiFileText
        className={css({
          fontSize: "1.6rem",
          paddingBottom: "0.3rem",
        })}
      />
      {dict.create_article}
    </Link>,
    <Link
      key="3"
      href="/photos/new"
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%",
      })}
    >
      <FiImage
        className={css({
          fontSize: "1.6rem",
          paddingBottom: "0.3rem",
        })}
      />
      {dict.create_photo}
    </Link>,
    <Link
      key="4"
      href="/articles"
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%",
      })}
    >
      <FiHome
        className={css({
          fontSize: "1.6rem",
          paddingBottom: "0.3rem",
        })}
      />
      {dict.home}
    </Link>,
    status === "authenticated" ? (
      <Link
        key="5"
        href=""
        onClick={() => signOut()}
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          height: "100%",
        })}
      >
        <FiLogOut
          className={css({
            fontSize: "1.6rem",
            paddingBottom: "0.3rem",
          })}
        />
        {dict.logout}
      </Link>
    ) : (
      <Link
        key="5"
        href=""
        onClick={() => signIn()}
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          height: "100%",
        })}
      >
        <FiLogIn
          className={css({
            fontSize: "1.6rem",
            paddingBottom: "0.3rem",
          })}
        />
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
          sm: { width: "90vw" },
        })}
      >
        <HomePageHeader
          dict={dict}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
        {children}

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
}

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
