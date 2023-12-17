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
import { useState, useEffect, useMemo } from "react";
import { FiThumbsUp, FiMessageSquare, FiFileText } from "react-icons/fi";
import Image from "next/image";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tags = useMemo(
    () => [params.dict.painting_guide, params.dict.tip, params.dict.review],
    [params.dict.painting_guide, params.dict.tip, params.dict.review],
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const posts: Post[] = await getRecommendedPosts(20, tags);
        setPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tags]);

  const handleSubmit = async (token: string) => {
    setIsLoading(true);
    try {
      const posts: Post[] =
        token === ""
          ? await getRecommendedPosts(20, tags)
          : await getPostsWithToken(token, 30);
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
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <div
          className={css({
            display: "flex",
            gap: "1rem",
            width: "100%",
          })}
        >
          <input
            type="search"
            id="full-text-search"
            name="full-text-search"
            onKeyDown={handleKeyDown}
            placeholder={params.dict.full_text_search_placeholder}
            autoComplete="off"
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
              margin: "1.2rem 1.2rem 0 1.2rem",
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
      {posts.length > 0
        ? tags.map((tagName) => (
            <div key={tagName}>
              {posts.filter(
                (post) =>
                  post.tags?.some(
                    (tag: { name: string }) => tag.name === tagName,
                  ),
              ).length > 0 && (
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1.6rem",
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
                    <strong>{tagName}</strong>
                  </h2>
                </div>
              )}
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                })}
              >
                {posts
                  .filter(
                    (post) =>
                      post.tags?.some(
                        (tag: { name: string }) => tag.name === tagName,
                      ),
                  )
                  .concat([...Array(5)])
                  .slice(0, 5)
                  .map((post, index) =>
                    post ? (
                      <Link
                        key={index}
                        href={`/${post.authorId}/posts/${post.ulid}`}
                      >
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
                            src={post.coverImg || "/lowpoly_whiz.png"}
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
                    ) : (
                      <div key={`dummy-${index}`}></div>
                    ),
                  )}
              </div>
            </div>
          ))
        : tags.map((tagName) => (
            <div key={tagName}>
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1.6rem",
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
                  <strong>Loading...</strong>
                </h2>
              </div>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                })}
              >
                {
                  // skelton screen
                  [...Array(5)].map((_, index) => (
                    <Link key={index} href="javascript:void(0)">
                      <article
                        className={css({
                          fontWeight: "700",
                          padding: ".8rem",
                          margin: "1rem",
                          borderRadius: "10px",
                          bg: "white",
                        })}
                      >
                        <div
                          className={css({
                            borderRadius: "10px 10px 0 0",
                            width: "200px",
                            height: "200px",
                            bg: "rgba(0, 0, 0, 0.1)",
                          })}
                        ></div>
                        <div
                          className={css({
                            borderRadius: "10px 10px 0 0",
                            width: "100%",
                          })}
                        ></div>
                        <div
                          className={css({
                            height: "100px",
                            padding: "0.3rem 0",
                          })}
                        >
                          <div
                            className={css({
                              borderRadius: "10px",
                              width: "50%",
                              height: "1rem",
                              margin: "0.3rem 0",
                              bg: "rgba(0, 0, 0, 0.1)",
                            })}
                          ></div>
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
                            <li>0</li>
                            <li>
                              <FiMessageSquare
                                className={css({
                                  fontSize: "1.5rem",
                                })}
                              />
                            </li>
                            <li>0</li>
                          </ul>
                        </div>
                      </article>
                    </Link>
                  ))
                }
              </div>
            </div>
          ))}
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <Image
          src="/lowpoly_whiz.png"
          alt="LowPoly Mage Image"
          width="250"
          height="250"
          className={css({
            margin: "1rem 0 2rem 0",
          })}
        />
      </div>
    </main>
  );
};
