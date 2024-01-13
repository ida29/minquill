// components/post_page_body.tsx
"use client";

//import Link from "next/link";
import { css } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/_utils/dictionary";
import { getPost, Post } from "@/app/[lang]/_utils/post";
import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { YouTubeEmbed } from "@next/third-parties/google";

export const PostPageBody = (params: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  const [post, setPost] = useState<Post>();
  const unique = useMemo(() => {
    return params.unique;
  }, [params.unique]);

  useEffect(() => {
    (async () => {
      const post: Post = await getPost(unique);
      setPost(post);
    })();
  }, [unique]);

  const activeTabItem = (
    <>
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        })}
      >
        <div
          className={css({
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            bg: "bg2",
            sm: { paddingTop: "calc(80vh - 4.4rem)" },
            md: { paddingTop: "calc(70vh - 4.4rem)" },
            lg: { paddingTop: "calc(60vh - 4.4rem)" },
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
              opacity: "0.8",
              filter: "blur(3px)",
              top: "0",
              left: "0",
              objectFit: "cover",
              objectPosition: "center",
            })}
          />
          <div
            className={css({
              textAlign: "center",
              padding: "1rem 1rem .5rem 1rem",
              border: "6px solid",
              color: "text2",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontWeight: "700",
              fontSize: "2.2rem",
              width: "90%",
              sm: { fontSize: "2.4rem", width: "auto" },
              md: { fontSize: "2.6rem", width: "auto" },
              lg: { fontSize: "2.8rem", width: "auto" },
            })}
          >
            {post?.title}
          </div>
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: ".5rem",
          width: "90%",
          sm: { width: "70%" },
          md: { width: "70%" },
          lg: { width: "70%" },
        })}
      >
        <div
          className={css({
            display: "flex",
            paddingTop: ".5rem",
            alignItems: "center",
            fontSize: "1rem",
            sm: { fontSize: "1.2rem" },
          })}
        >
          <Image
            width="48"
            height="48"
            src={post?.author?.image || ""}
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
              fontWeight: "700",
            })}
          >
            <p>{post?.author?.name}</p>
            <p>{post?.author?.username}</p>
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            gap: "1rem",
            fontSize: "1.2rem",
            margin: "2rem 0",
          })}
        >
          {post?.tags &&
            post?.tags.map((tag: { name: string }) => (
              <div key={tag.name}>#{tag.name}</div>
            ))}
        </div>
        <div
          className={css({
            width: "100%",
          })}
        >
          <div
            id="markdown-preview2"
            className={css({
              minHeight: "calc(100dvh - 10rem)",

              borderRadius: "10px",
              bg: "bg1",

              position: "relative",
              zIndex: "0",
            })}
          >
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                code(props) {
                  const { className, children } = props;
                  const value = String(children).replace(/\n$/, "");
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";

                  if (language === "X" || language === "x") {
                    return <TwitterTweetEmbed tweetId={value} />;
                  }

                  if (language === "Youtube" || language === "youtube") {
                    return <YouTubeEmbed videoid={value} />;
                  }

                  return <code>{value}</code>;
                },
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
              }}
            >
              {post?.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );

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
        {activeTabItem}
      </div>
    </main>
  );
};
