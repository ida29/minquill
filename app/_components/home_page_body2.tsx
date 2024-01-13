// components/home_page_body2.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import {
  getPostsWithToken,
  getRecommendedPosts,
  Post,
} from "@/app/_utils/post";
import { useState, useEffect, useMemo } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

export const HomePageBody2 = (params: { dict: Dictionary }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <ul
          className={css({
            display: "flex",
            color: "text1",
            fontWeight: "700",
            fontSize: "1rem",
            lineHeight: "1",
            marginTop: "3rem",

            padding: "0 1rem",
            gap: "0 2rem",
            sm: { fontSize: "1.2rem", gap: "0 4rem" },
            md: { fontSize: "1.4rem", gap: "0 6rem" },
            lg: { fontSize: "1.6rem", gap: "0 8rem" },
          })}
        >
          <Link href={`/posts`}>
            <li className={`${liStyle()} }`}>Posts</li>
          </Link>
          <Link href={`/images`}>
            <li className={`${liStyle()} ${activeTab()}`}>Images</li>
          </Link>
        </ul>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <Image
          src="/lowpoly_whiz.png"
          alt="LowPoly Mage Image"
          width="250"
          height="250"
          className={css({
            margin: "1rem 0 2rem 0",
          })}
        />
      </div>
    </main>
  );
};

const liStyle = cva({
  base: {
    paddingBottom: "0.8rem",
    listStyle: "none",
  },
});

const activeTab = cva({
  base: {
    borderBottom: "4px solid",
    color: "text1",
  },
});
