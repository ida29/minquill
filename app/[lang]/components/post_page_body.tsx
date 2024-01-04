// components/post_page_body.tsx
"use client";

//import Link from "next/link";
import { css } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/utils/dictionary";
import { getPost, Post } from "@/app/[lang]/utils/post";
import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
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
              opacity: "0.4",
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
              border: "2px solid",
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
            fontSize: "1rem",
            sm: { fontSize: "1.2rem" },
            md: { fontSize: "1.4rem" },
            lg: { fontSize: "1.6rem" },
          })}
        >
          {params.username}
        </div>
        <div
          className={css({
            marginBottom: ".5rem",
          })}
        >
          <ul
            id="reactions"
            className={css({
              display: "flex",
              gap: "1rem",
              fontSize: "1rem",
              sm: { fontSize: "1.2rem" },
              md: { fontSize: "1.4rem" },
              lg: { fontSize: "1.6rem" },
            })}
          >
            <li>
              <FiThumbsUp
                className={css({
                  marginTop: "0.2rem",
                })}
              />
            </li>
            <li>0</li>
            <li>
              <FiMessageSquare
                className={css({
                  marginTop: "0.2rem",
                })}
              />
            </li>
            <li>0</li>
          </ul>
        </div>
        <div
          className={css({
            display: "flex",
            gap: "1rem",
            fontSize: "1.2rem",
            marginBottom: "2rem",
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
              padding: "0.8rem",
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
