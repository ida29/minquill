// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getPostsByUsername, Post } from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

export const UserPageBody = (params: {
  dict: Dictionary;
  username: string;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const posts: Post[] = await getPostsByUsername(
        params.username,
        20,
        "desc",
      );
      setPosts(posts);
    })();
  }, [params]);

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div
        className={css({
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        })}
      >
        {posts.map((post, index) => (
          <Link key={index} href={`/${post.authorId}/posts/${post.ulid}`}>
            <article
              className={css({
                fontWeight: "700",
                padding: "1rem",
                margin: ".3rem",
                border: "2px solid black",
                boxShadow: "1px 1px 0 black",
                borderRadius: "10px",
              })}
            >
              <Image
                width="200"
                height="200"
                src={post?.coverImg || ""}
                alt="Cover Image"
                className={css({
                  borderRadius: "10px",
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
