// components/home_page_body.tsx
"use client";
import { css, cva } from "@/styled-system/css";
import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkBreaks from "remark-breaks";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPost, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";

export const PostPageBody = (params: { dict: Dictionary; unique: string }) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    (async () => {
      const post: Post = await getPost(params.unique);
      setPost(post);
    })();
  }, [params.unique]);

  return (
    <main>
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
              padding: "0 0 1rem 0",
            })}
          ></div>
          <div
            className={css({
              width: "100%",
              minHeight: "100vh",
              //marginRight: "auto",
            })}
          >
            <div className={divPanelStyle()}>
              <MarkdownPreview
                source={post ? post.content : ""}
                pluginsFilter={(type, plugins) => {
                  if (type === "remark") {
                    return [...plugins, remarkBreaks];
                  }
                  return plugins;
                }}
                rehypeRewrite={(node, index, parent) => {
                  if (
                    node.type === "element" &&
                    node.tagName === "a" &&
                    parent &&
                    parent.type === "element" &&
                    /^h(1|2|3|4|5|6)/.test(parent.tagName)
                  ) {
                    parent.children = parent.children.slice(1);
                  }
                }}
                wrapperElement={{ "data-color-mode": "light" }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    bg: "lightslategrey",
    display: "flex",
    justifyContent: "center",
    borderTop: "3px solid black",
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
    padding: "0 3rem 0 3rem",
    width: "100vw",
    sm: { width: "100vw" },
    md: { width: "95vw" },
    lg: { width: "90vw" },
  },
});

const divPanelStyle = cva({
  base: {
    padding: "16px 16px 16px",
    minHeight: "100vh",
    width: "100%",

    border: "3px solid black",
    borderRadius: "0 10px 10px 10px",
    background: "white",

    marginTop: "-0.2rem",
    position: "relative",
    zIndex: "0",
  },
});