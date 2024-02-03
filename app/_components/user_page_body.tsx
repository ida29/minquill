// components/user_page_body.tsx
"use client";

import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import { User } from "@/app/_utils/user";
import { FiFileText, FiImage, FiUsers } from "react-icons/fi";
import Image from "next/image";
import { UserPageArticles } from "@/app/_components/user_page_articles";
import { UserPagePhotos } from "@/app/_components/user_page_photos";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const UserPageBody = ({
  dict,
  user,
}: {
  dict: Dictionary;
  user: User;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "articles";

  let content = null;
  if (currentTab === "articles") {
    content = <UserPageArticles dict={dict} user={user} />;
  } else if (currentTab === "photos") {
    content = <UserPagePhotos dict={dict} user={user} />;
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleTabClick = (pathname: string, tab: string) => {
    router.push(`${pathname}?${createQueryString("tab", tab)}`);
  };

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            borderBottom: "3px solid black",
            bg: "bg3",
            paddingTop: ".5rem",
            width: "100%",
          })}
        >
          <ul
            className={css({
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              margin: ".5rem",
              gap: ".5rem",
            })}
          >
            <li>
              <Image
                width="180"
                height="180"
                src={user?.image || ""}
                alt="User Image"
                className={css({
                  border: "3px solid black",
                  borderRadius: "50%",
                })}
              />
            </li>
            <li
              className={css({
                fontSize: "1.6rem",
              })}
            >
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <strong>{user?.name}</strong>
                {user?.username}
              </div>
            </li>
            <li
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              })}
            >
              <FiFileText
                className={css({
                  fontSize: "1.5rem",
                })}
              />
              {user?.articles.length} Articles
            </li>
            <li
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              })}
            >
              <FiImage
                className={css({
                  fontSize: "1.5rem",
                })}
              />
              {user?.photos.length} Photos
            </li>
            <li
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              })}
            >
              <FiUsers
                className={css({
                  fontSize: "1.5rem",
                })}
              />
              {user?.followers?.length} Followers {user?.followings?.length}{" "}
              Followings
            </li>
          </ul>
          <ul
            className={css({
              display: "flex",
              color: "text1",
              fontWeight: "700",
              fontSize: "1rem",
              lineHeight: "1",
              marginTop: "3rem",

              gap: "0 3rem",
              sm: { fontSize: "1.1rem", gap: "0 3.5rem" },
              md: { fontSize: "1.2rem", gap: "0 4rem" },
              lg: { fontSize: "1.3rem", gap: "0 4.5rem" },
            })}
          >
            <li
              onClick={() => handleTabClick(pathname, "articles")}
              className={`${liStyle()} ${
                currentTab == "articles" ? activeTab() : ""
              }`}
            >
              Articles
            </li>
            <li
              onClick={() => handleTabClick(pathname, "photos")}
              className={`${liStyle()} ${
                currentTab == "photos" ? activeTab() : ""
              }`}
            >
              Photos
            </li>
          </ul>
        </div>
        {content}
      </div>
    </main>
  );
};

const liStyle = cva({
  base: {
    paddingBottom: "0.6rem",
    listStyle: "none",
    color: "text3",
    cursor: "pointer",
  },
});

const activeTab = cva({
  base: {
    color: "text1",
  },
});
