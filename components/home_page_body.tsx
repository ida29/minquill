// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getRecommendedPosts, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import { FiThumbsUp, FiMessageSquare, FiFileText } from "react-icons/fi";
import Image from "next/image";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const posts: Post[] = await getRecommendedPosts(10);
      setPosts(posts);
    })();
  }, []);

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
        <Image
          src="/lowpoly_whiz.png"
          alt="LowPoly Mage Image"
          width="400"
          height="400"
          className={css({
            paddingRight: "2.1rem",
          })}
        />
        <div
          className={css({
            fontWeight: "700",
            fontSize: "4.6rem",
          })}
        >
          {params.dict.minquill}
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        <FiFileText
          className={css({
            fontSize: "2rem",
            marginLeft: "1rem",
            padding: "0 0 .4rem 0",
          })}
        />
        <h2
          className={css({
            fontSize: "1.2rem",
            marginLeft: ".1rem",
          })}
        >
          <strong>{params.dict.painting_guide}</strong>
        </h2>
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        })}
      >
        {posts.map((post, index) => (
          <Link key={index} href={`/${post.authorId}/posts/${post.ulid}`}>
            <article
              className={css({
                fontWeight: "700",
                padding: ".8rem",
                margin: "1rem",
                borderRadius: "10px",
                bg: "white",
              })}
            >
              <Image
                width="200"
                height="200"
                src={post?.coverImg || ""}
                alt="Cover Image"
                className={css({
                  borderRadius: "10px 10px 0 0",
                  width: "100%",
                })}
              />
              <div
                className={css({
                  height: "100px",
                  padding: "0.3rem 0",
                })}
              >
                {post?.title}
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
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};
