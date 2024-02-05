// app/components/photo_page.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import React, { useEffect, useState } from "react";
import { Photo, getPhoto } from "@/app/_utils/photo";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { Comment } from "@/app/_utils/comment";
import { formatDate } from "@/app/_utils/formatDate";

export const PhotoPage = ({
  dict,
  photo,
}: {
  dict: Dictionary;
  photo: Photo;
}) => {
  const { data: session, status } = useSession();
  const [photoValue, setPhoto] = useState<Photo>();
  const [commentValue, setComment] = useState("");

  useEffect(() => {
    setPhoto(photo);
  }, [photo]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (commentValue && photoValue) {
      const url = new URL(
        `/api/photos/${photoValue.ulid}/comments`,
        process.env.NEXT_PUBLIC_WEBSITE_URL,
      );
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: commentValue }),
      });

      if (res.ok) {
        const newComment: Comment = await res.json();
        setPhoto({
          ...photoValue,
          comments: [newComment, ...(photoValue.comments || [])],
        });

        setComment("");
      }
    }
  };

  return (
    <div
      data-theme="normal"
      data-color-mode="light"
      className={css({
        overflow: "auto",
        bg: "bg1",
      })}
    >
      <div
        className={css({
          marginRight: "auto",
          marginLeft: "auto",
          height: "100dvh",
          width: "100dvw",
          sm: { width: "90vw" },
        })}
      >
        <Link href={`/photos`}>
          <FiArrowLeftCircle
            className={css({
              position: "absolute",
              borderRadius: "50%",
              fontSize: "3rem",
              top: "1rem",
              left: "1.5rem",
              _hover: {
                bg: "rgba(0,0,0,0.1)",
              },
            })}
          />
        </Link>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          })}
        >
          <div
            className={css({
              display: "flex",
              flexWrap: "wrap",
              bg: "bg3",
              width: "95%",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",

              sm: { width: "95%" },
              md: { width: "90%" },
              lg: { width: "90%" },
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bg: "bg2",
                borderRadius: "10px 0 0 10px",
                width: "100%",
                lg: { width: "50%" },
              })}
            >
              {photoValue && (
                <Image
                  width="400"
                  height="400"
                  src={photoValue.url}
                  alt="photo"
                  priority={true}
                  className={css({
                    width: "100%",
                  })}
                />
              )}
            </div>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                padding: "0 1rem",
                width: "100%",
                lg: { width: "50%" },
              })}
            >
              <div
                className={css({
                  position: "sticky",
                  bg: "bg3",
                  top: "0",
                  right: "0",
                })}
              >
                <Link
                  href={`/${photoValue?.photographer?.username}`}
                  className={css({
                    display: "flex",
                    fontWeight: "700",
                    padding: "1rem 0",
                  })}
                >
                  {photoValue?.photographer && (
                    <Image
                      width="48"
                      height="48"
                      src={photoValue.photographer.image}
                      alt="User Image"
                      className={css({
                        borderRadius: "50%",
                        marginRight: ".5rem",
                      })}
                    />
                  )}
                  <div
                    className={css({
                      display: "flex",
                      flexDirection: "column",
                    })}
                  >
                    <p>{photoValue?.photographer?.name}</p>
                    <p>{photoValue?.photographer?.username}</p>
                  </div>
                </Link>
                <div
                  className={css({
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    margin: "2rem 0",
                  })}
                >
                  {photoValue?.title}
                </div>
                <div className={css({})}>
                  <h2
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                      fontWeight: "700",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "1rem",
                    })}
                  >
                    {dict.comments}
                    <div
                      className={css({
                        fontSize: "1rem",
                      })}
                    >
                      {photoValue?.comments?.length}
                    </div>
                  </h2>
                  <div
                    className={css({
                      overflow: "auto",
                      maxHeight: "calc(100vh - 20rem)",
                    })}
                  >
                    {photoValue?.comments?.map((comment: Comment, i) => (
                      <div
                        key={i}
                        className={css({
                          width: "100%",
                        })}
                      >
                        <div
                          className={css({
                            display: "flex",
                            alignItems: "flex-start",
                            paddingBlock: ".4rem",
                          })}
                        >
                          <Link href={`/${comment?.user?.username}`}>
                            <Image
                              width="40"
                              height="40"
                              src={comment.user.image}
                              alt="Comment User Image"
                              className={css({
                                borderRadius: "50%",
                                margin: ".5rem 1rem 0 .5rem",
                              })}
                            />
                          </Link>
                          <div
                            className={css({
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "1.2rem",
                              width: "100%",
                            })}
                          >
                            <div
                              className={css({
                                display: "flex",
                                gap: ".5rem",
                                alignItems: "center",
                              })}
                            >
                              <p>
                                <strong>{comment.user.name}</strong>
                              </p>
                              <div
                                className={css({
                                  fontSize: "1rem",
                                  color: "text3",
                                })}
                              >
                                <p>{formatDate(comment.createdAt)}</p>
                              </div>
                            </div>
                            <p
                              className={css({
                                wordBreak: "break-word",
                              })}
                            >
                              {comment.commentText}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={css({
                  marginTop: "auto",
                  display: "flex",
                  padding: "1rem 0 ",
                  alignItems: "center",
                  borderTop: "1px solid #ccc",
                  position: "sticky",
                  bg: "bg3",
                  bottom: "0",
                  right: "0",
                  paddingBottom: "1rem",
                })}
              >
                {session?.user && (
                  <Image
                    width="36"
                    height="36"
                    src={session.user.image}
                    alt="User Image"
                    className={css({
                      borderRadius: "50%",
                      marginRight: ".5rem",
                    })}
                  />
                )}
                <div
                  className={css({
                    height: "40px",
                    width: "100%",
                    position: "relative",
                  })}
                >
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onChange={handleCommentChange}
                    value={commentValue}
                    className={css({
                      width: "100%",
                      height: "100%",
                      border: "2px solid #ccc",
                      borderRadius: "9999px",
                      outline: "none",
                      textIndent: "1.5rem",
                      caretShape: "block",
                      padding: "1rem 0",
                      _focus: {
                        border: "2px solid",
                        borderColor: "border1",
                      },
                    })}
                  />
                  <button
                    onClick={submitComment}
                    className={css({
                      color: "text2",
                      bg: "bg2",
                      borderRadius: "50%",
                      aspectRatio: "1",
                      height: "80%",
                      position: "absolute",
                      right: "0",
                      transform: "translateX(-10%)",
                      top: "10%",
                      _hover: {
                        opacity: "0.8",
                      },
                    })}
                  >
                    <FiArrowRight
                      className={css({
                        width: "100%",
                        height: "70%",
                      })}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
