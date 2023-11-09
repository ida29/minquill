// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPostsByUsername, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";

export const UserPageBody = (params: {
  dict: Dictionary;
  username: string;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const posts: Post[] = await getPostsByUsername(
        params.username,
        20,
        "asc",
      );
      setPosts(posts);
    })();
  }, [params]);

  return (
    <main>
      <div className={div1Style({ color: "secondary" })}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
              height: "100%",
              fontFamily: "futura",
            })}
          >
            {posts.map((post, index) => (
              <div key={index} className={contentStyle()}>
                <Link href={`/${post.authorId}/posts/${post.ulid}`}>
                  {post.title}
                </Link>
              </div>
            ))}
            <div>{params.dict.end}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    height: "80vh",
    bg: "lightslategrey",
    display: "flex",
    justifyContent: "center",
    borderTop: "3px solid black",
  },
  variants: {
    color: {
      primary: { bg: "lightslategrey" },
      secondary: { bg: "white" },
    },
  },
});

const div2Style = cva({
  base: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 0.8rem 0 0.8rem",
    width: "100vw",
    sm: { width: "100vw", padding: "1rem 1rem 2rem 1rem" },
    md: { width: "95vw", padding: "1rem 2rem 2rem 2rem" },
    lg: { width: "90vw", padding: "1rem 2rem 2rem 2rem" },
  },
});

const contentStyle = cva({
  base: {
    height: "100%",
    width: "100%",
    border: "3px solid black",
    borderRadius: "10px",
    margin: "1rem 0 1rem 0",
    display: "flex",
    justifyContent: "center",
    sm: { height: "10rem" },
    md: { height: "20rem" },
    lg: { height: "20rem" },
  },
});
