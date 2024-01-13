// components/user_page_body.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/_utils/dictionary";
import { getUser, User } from "@/app/[lang]/_utils/user";
import { Post } from "@/app/[lang]/_utils/post";
import { useState, useEffect } from "react";
import {
  FiFileText,
  FiThumbsUp,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";
import Image from "next/image";

export const UserPageBody = (params: {
  dict: Dictionary;
  username: string;
}) => {
  const [user, setUser] = useState<User | null>(null);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //setIsLoading(true);
    (async () => {
      try {
        const user = await getUser(params.username);
        setUser(user);
      } catch (err) {
        //setError("データの取得に失敗しました。");
      } finally {
        //setIsLoading(false);
      }
    })();
  }, [params.username]);

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
          width: "100%",
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            borderBottom: "3px solid black",
            bg: "bg3",
            padding: ".5rem",
            width: "100%",
          })}
        >
          <ul
            className={css({
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              margin: ".5rem",
              gap: ".5rem",
            })}
          >
            <li>
              <Image
                width="180"
                height="180"
                src={user?.image || ""}
                alt="User Image"
                className={css({
                  border: "3px solid black",
                  borderRadius: "50%",
                })}
              />
            </li>
            <li
              className={css({
                fontSize: "1.6rem",
              })}
            >
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <strong>{user?.name}</strong>
                {user?.username}
              </div>
            </li>
            <li
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              })}
            >
              <FiFileText
                className={css({
                  fontSize: "1.5rem",
                })}
              />
              {user?.posts?.length} Posts
            </li>
            <li
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              })}
            >
              <FiUsers
                className={css({
                  fontSize: "1.5rem",
                })}
              />
              {user?.followers?.length} Followers {user?.followings?.length}{" "}
              Followings
            </li>
          </ul>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "calc(90% - 40px)",
            sm: {
              width: "calc(80% - 40px)",
            },
            md: {
              width: "calc(70% - 40px)",
            },
            lg: {
              width: "calc(60% - 40px)",
            },
          })}
        >
          <div
            className={css({
              borderLeft: "3px solid black",
              position: "relative",
              padding: "20px 0 20px 20px",
              width: "100%",
            })}
          >
            {user?.posts?.map((post: Post, index) => (
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
                    bg: "bg3",
                    border: "3px solid black",
                    position: "absolute",
                    left: "-32px",
                    top: "15px",
                  })}
                ></div>
                <div
                  className={css({
                    borderRadius: "5px",
                    marginLeft: "10px",
                    width: "100%",
                  })}
                >
                  <Link href={`/${post.authorId}/posts/${post.ulid}`}>
                    <article
                      className={css({
                        bg: "bg3",
                        fontWeight: "700",
                        borderRadius: "10px",
                        gap: "1rem .5rem",
                      })}
                    >
                      <div
                        id="card-header"
                        className={css({
                          position: "relative",
                          paddingTop: "70%",
                        })}
                      >
                        <Image
                          width="400"
                          height="400"
                          src={post.coverImg || "/lowpoly_whiz.png"}
                          alt="Cover Image"
                          className={css({
                            borderRadius: "10px 10px 0 0",
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
                      <div
                        id="card-body"
                        className={css({
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        })}
                      >
                        <div
                          className={css({
                            padding: ".8rem",
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
                        <Link
                          href={`/${post.authorId}/posts/${post.ulid}/edit`}
                        >
                          <div
                            className={css({
                              fontSize: "1rem",
                              border: "4px solid black",
                              borderRadius: "9999px",
                              padding: ".5rem 1.5rem",
                              marginTop: "3rem",
                              marginBottom: "2rem",
                            })}
                          >
                            {params.dict.edit_post}
                          </div>
                        </Link>
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
