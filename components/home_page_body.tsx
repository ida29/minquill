// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import {
  getPostsWithToken,
  getRecommendedPosts,
  Post,
} from "@/app/[lang]/post";
import { useState, useEffect } from "react";
import { FiThumbsUp, FiMessageSquare, FiFileText } from "react-icons/fi";
import Image from "next/image";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const posts: Post[] = await getRecommendedPosts(10);
      setPosts(posts);
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async (token: string) => {
    setIsLoading(true);
    try {
      const posts: Post[] = await getPostsWithToken(token, 10);
      setPosts(posts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    handleSubmit((e.target as HTMLInputElement).value);
  };

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
          width="180"
          height="180"
          className={css({
            margin: "0.5rem 1rem 0 0",
          })}
        />
        <div
          className={css({
            display: "flex",
            gap: "1rem",
          })}
        >
          <input
            type="text"
            id="full-text-search"
            name="full-text-search"
            onKeyDown={handleKeyDown}
            placeholder={params.dict.full_text_search_placeholder}
            className={css({
              color: "text1",
              bg: "bg3",
              textIndent: "1rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              paddingTop: "0.2rem",
              transition: "all 0.1s",
              fontSize: "1.4rem",
              margin: "1.2rem",
              border: "4px solid white",
              _focus: {
                border: "4px solid black",
              },
              sm: {
                fontSize: "1.4rem",
                marginBottom: "1.4rem",
                padding: "0.8rem 0.4rem 0.6rem 0",
              },
              md: {
                fontSize: "1.6rem",
                marginBottom: "1.6rem",
                padding: "0.8rem 0.4rem 0.6rem 0",
              },
              lg: {
                fontSize: "1.8rem",
                marginBottom: "1.8rem",
                padding: "0.8rem 0.4rem 0.6rem 0",
              },
            })}
          />
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
        {isLoading ? (
          <>Loading...</>
        ) : (
          posts.map((post, index) => (
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
          ))
        )}
      </div>
    </main>
  );
};
