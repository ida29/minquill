// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPostsByUsername, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

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
        paddingTop: "4.4rem",
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
                    marginLeft: "10px",
                  })}
                >
                  <Link href={`/${post.authorId}/posts/${post.ulid}`}>
                    <article
                      className={css({
                        bg: "white",
                        fontWeight: "700",
                        padding: "1rem",
                        border: "2px solid black",
                        boxShadow: "1px 1px 0 black",
                        borderRadius: "10px",
                        display: "grid",
                        gap: "1rem .5rem",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                      })}
                    >
                      <div id="card-header" className={css({})}>
                        <Image
                          width="800"
                          height="800"
                          src={post.coverImg || ""}
                          alt="Cover Image"
                          className={css({
                            width: "100%",
                            borderRadius: "10px",
                          })}
                        />
                      </div>
                      <div
                        id="card-body"
                        className={css({
                          display: "flex",
                          flexDirection: "column",
                        })}
                      >
                        <h2
                          className={css({
                            fontSize: "1rem",
                          })}
                        >
                          {post.authorId?.split("-")[0]}
                        </h2>
                        <h1
                          className={css({
                            fontSize: "1.8rem",
                          })}
                        >
                          {post.title}
                        </h1>
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
                            <li>{post.likes?.length}</li>
                            <li>
                              <FiMessageSquare
                                className={css({
                                  fontSize: "1.5rem",
                                })}
                              />
                            </li>
                            <li>{post.comments?.length}</li>
                          </ul>
                        </div>
                      </div>
                    </article>
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
