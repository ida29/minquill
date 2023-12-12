// components/post_page_body.tsx
"use client";

//import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPost, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

export const PostPageBody = (params: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    (async () => {
      const post: Post = await getPost(params.unique);
      setPost(post);
    })();
  }, [params.unique]);

  console.log(params.username);

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
        })}
      >
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
          })}
        >
          <div
            className={css({
              width: "90%",
              position: "relative",
              paddingTop: "100%",
              sm: { width: "80%", paddingTop: "calc(60vh - 4.4rem)" },
              md: { width: "80%", paddingTop: "calc(60vh - 4.4rem)" },
              lg: { width: "80%", paddingTop: "calc(60vh - 4.4rem)" },
            })}
          >
            <Image
              width="400"
              height="400"
              src={post?.coverImg || ""}
              alt="Cover Image"
              className={css({
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                objectFit: "cover",
                objectPosition: "center",
              })}
            />
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: ".5rem",
            width: "90%",
            sm: { width: "70%" },
            md: { width: "70%" },
            lg: { width: "70%" },
          })}
        >
          <div
            className={css({
              margin: ".5rem 0",
              alignSelf: "flex-start",
              fontSize: "1.4rem",
              sm: { fontSize: "1.6rem" },
              md: { fontSize: "1.8rem" },
              lg: { fontSize: "2rem" },
            })}
          >
            {post?.authorId?.split("-")[0]}
          </div>
          <div
            className={css({
              width: "100%",
              marginBottom: ".5rem",
            })}
          >
            <ul
              id="reactions"
              className={css({
                display: "flex",
                gap: "1rem",
                alignSelf: "flex-start",
                fontSize: "1.2rem",
                sm: { fontSize: "1.4rem" },
                md: { fontSize: "1.6rem" },
                lg: { fontSize: "1.8rem" },
              })}
            >
              <li>
                <FiThumbsUp
                  className={css({
                    marginTop: "0.2rem",
                  })}
                />
              </li>
              <li>{post?.likes?.length}</li>
              <li>
                <FiMessageSquare
                  className={css({
                    marginTop: "0.2rem",
                  })}
                />
              </li>
              <li>{post?.comments?.length}</li>
            </ul>
          </div>
          <div
            className={css({
              marginBottom: ".5rem",
              alignSelf: "flex-start",
              fontWeight: "700",
              fontSize: "2rem",
              sm: { fontSize: "2.1rem" },
              md: { fontSize: "2.2rem" },
              lg: { fontSize: "2.3rem" },
            })}
          >
            {post?.title}
          </div>
          <div
            className={css({
              display: "flex",
              gap: "1rem",
              alignSelf: "flex-start",
              fontSize: "1.2rem",
              marginBottom: "2rem",
            })}
          >
            <p>#tag1 #tag2 #tag3</p>
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

const divPanelStyle = cva({
  base: {
    minHeight: "100vh",

    bg: "bg1",

    position: "relative",
    zIndex: "0",
  },
});
