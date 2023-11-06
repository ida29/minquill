// components/home_page_body.tsx
"use client";

import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPosts, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const posts: Post[] = await getPosts();
      setPosts(posts);
    })();
  }, []);

  return (
    <main>
      <div className={div1Style({ color: "secondary" })}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "80%",
              height: "100%",
              fontFamily: "futura",
            })}
          >
            {posts.map((post, index) => (
              <div key={index} className={contentStyle()}>
                <div>{post.title}</div>
              </div>
            ))}
            {params.dict.end}
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
    padding: "0 3rem 0 3rem",
    width: "1200px",
  },
});

const contentStyle = cva({
  base: {
    height: "10rem",
    width: "20rem",
    border: "3px solid black",
    borderRadius: "10px",
    padding: "1rem",
    margin: "1rem",
    display: "flex",
    justifyContent: "center",
    sm: { height: "10rem" },
    md: { height: "20rem" },
    lg: { height: "20rem" },
  },
});
