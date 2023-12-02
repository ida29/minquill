// components/home_page_body.tsx
"use client";
import { css, cva } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPost, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

export const PostPageBody = (params: { dict: Dictionary; unique: string }) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    (async () => {
      const post: Post = await getPost(params.unique);
      setPost(post);
    })();
  }, [params.unique]);

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "2rem",
            })}
          >
            <Image
              width="400"
              height="400"
              src={post?.coverImg || ""}
              alt="Cover Image"
              className={css({
                width: "60cqw",
                borderRadius: "20%",
                border: "1px solid black",
                marginBottom: "1rem",
                sm: { width: "50cqw" },
                md: { width: "40cqw" },
                lg: { width: "30cqw" },
              })}
            />
            <div
              className={css({
                fontSize: "3rem",
                fontWeight: "700",
              })}
            >
              {post?.title}
            </div>

            <div
              className={css({
                fontSize: "1.5rem",
                margin: ".5rem 0",
              })}
            >
              {post?.authorId?.split("-")[0]}
            </div>

            <div>
              <ul
                id="reactions"
                className={css({
                  display: "flex",
                  gap: "0.5rem",
                })}
              >
                <li>
                  <FiThumbsUp
                    className={css({
                      fontSize: "1.5rem",
                    })}
                  />
                </li>
                <li>{post?.likes?.length}</li>
                <li>
                  <FiMessageSquare
                    className={css({
                      fontSize: "1.5rem",
                    })}
                  />
                </li>
                <li>{post?.comments?.length}</li>
              </ul>
            </div>
          </div>

          <div id="markdown-preview" className={divPanelStyle()}>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
              }}
            >
              {post ? post.content : ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    bg: "white",
    display: "flex",
    justifyContent: "center",
    paddingTop: "1rem",
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
    flexDirection: "column",
    maxWidth: "1024px",
    width: "100vw",
    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});

const divPanelStyle = cva({
  base: {
    minHeight: "100vh",
    width: "100%",

    background: "white",

    position: "relative",
    zIndex: "0",
  },
});
