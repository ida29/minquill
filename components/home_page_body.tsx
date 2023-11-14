// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPostsByUsername, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(params);

  useEffect(() => {
    (async () => {
      const posts: Post[] = await getPostsByUsername("", 10, "desc");
      setPosts(posts);
    })();
  }, []);

  return (
    <main
      className={css({
        padding: "4.4rem",
      })}
    >
      <div className={div1Style({ color: "secondary" })}>
        <div className={div2Style()}>
          <div
            className={css({
              borderLeft: "4px solid black",
              position: "relative",
              padding: "20px",
            })}
          >
            {posts.map((post, index) => (
              <div
                key={index}
                className={css({
                  marginBottom: "20px",
                  position: "relative",
                })}
              >
                <div
                  className={css({
                    width: "20px",
                    height: "20px",
                    bg: "white",
                    border: "4px solid black",
                    position: "absolute",
                    left: "-32px",
                    top: "15px",
                  })}
                ></div>
                <div
                  className={css({
                    bg: "white",
                    borderRadius: "5px",
                    padding: "20px",
                    marginLeft: "10px",
                  })}
                >
                  <Link href={`/${post.authorId}/posts/${post.ulid}`}>
                    <div
                      className={css({
                        bg: "white",
                        margin: "-20px -20px 20px -20px",
                        padding: "14px",
                        fontWeight: "700",
                        border: "2px solid black",
                        boxShadow: "1px 1px 0 black",
                        borderRadius: "10px",
                        width: "80vw",
                        height: "30vh",
                      })}
                    >
                      {post.title}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
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
    maxWidth: "1024px",
    width: "90vw",
    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});
