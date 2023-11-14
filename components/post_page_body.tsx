// components/home_page_body.tsx
"use client";
import { css, cva } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPost, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

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
        padding: "4.4rem",
      })}
    >
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div className={divPanelStyle()}>
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
    flexWrap: "wrap",
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
    padding: "16px 16px 16px",
    minHeight: "100vh",
    width: "100%",

    background: "white",

    position: "relative",
    zIndex: "0",
  },
});
