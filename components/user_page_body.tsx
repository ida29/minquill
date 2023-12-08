// components/user_page_body.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getUser, User } from "@/app/[lang]/user";
import { Post } from "@/app/[lang]/post";
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
          justifyContent: "center",
          margin: "1rem .5rem 0 .5rem",
          padding: ".5rem",
          border: "3px solid black",
          borderRadius: "10px",
          bg: "bg3",
        })}
      >
        <ul
          className={css({
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: ".5rem",
            gap: ".5rem",
          })}
        >
          <li>
            <Image
              width="160"
              height="160"
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
              fontSize: "1.5rem",
              alignSelf: "flex-start",
            })}
          >
            {user?.name}
          </li>
          <li
            className={css({
              width: "100%",
            })}
          >
            <button
              className={css({
                fontSize: "1.2rem",
                width: "100%",
                border: "2px solid black",
                borderRadius: "10px",
                textAlign: "center",
              })}
            >
              {params.dict.edit_profile}
            </button>
          </li>
          <li
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              alignSelf: "flex-start",
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
              alignSelf: "flex-start",
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
        })}
      >
        <div
          className={css({
            borderLeft: "3px solid black",
            position: "relative",
            padding: "20px",
            marginLeft: "20px",
            width: "90%",
            sm: { width: "60%" },
            md: { width: "55%" },
            lg: { width: "50%" },
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
                })}
              >
                <Link href={`/${post.authorId}/posts/${post.ulid}`}>
                  <article
                    className={css({
                      bg: "bg3",
                      fontWeight: "700",
                      padding: "1rem",
                      border: "2px solid black",
                      boxShadow: "1px 1px 0 black",
                      borderRadius: "10px",
                      gap: "1rem .5rem",
                    })}
                  >
                    <div id="card-header" className={css({})}>
                      <Image
                        width="400"
                        height="400"
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
                        {post?.authorId?.split("-")[0]}
                      </h2>
                      <h1
                        className={css({
                          fontSize: "1.8rem",
                        })}
                      >
                        {post?.title}
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
                    </div>
                  </article>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
