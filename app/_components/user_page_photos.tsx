// components/user_page_photos.tsx
"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import { User } from "@/app/_utils/user";
import { Photo } from "@/app/_utils/photo";
import Image from "next/image";
import { useState } from "react";
import { getPhotosByUsername } from "@/app/_utils/photo";
import { ActionButton } from "@/app/_components/action_button";

export const UserPagePhotos = ({
  dict,
  user,
}: {
  dict: Dictionary;
  user: User;
}) => {
  const [photos, setPhotos] = useState<Photo[]>(user?.photos || []);
  const [page, setPage] = useState(1);
  console.log(photos);

  const loadMorePhotos = async () => {
    try {
      const newPhotos: Photo[] = await getPhotosByUsername(
        user.username,
        10,
        "desc",
        page + 1,
      );
      setPhotos((photos) => [...photos, ...newPhotos]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          {photos?.map((photo: Photo, index) => (
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
                <article
                  className={css({
                    bg: "bg3",
                    fontWeight: "700",
                    borderRadius: "10px",
                    gap: "1rem .5rem",
                    marginBottom: "3rem",
                  })}
                >
                  <Link href={`/${photo.photographerId}/photos/${photo.ulid}`}>
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
                        src={photo.url || ""}
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
                  </Link>
                  <div
                    id="card-body"
                    className={css({
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    })}
                  >
                    <div
                      className={css({
                        padding: "1.6rem .8rem",
                      })}
                    >
                      <Link
                        href={`/${photo.photographerId}/photos/${photo.ulid}`}
                      >
                        <div
                          className={css({
                            height: "3rem",
                            fontSize: "1.8rem",
                          })}
                        >
                          {photo?.title}
                        </div>
                        <div
                          className={css({
                            display: "-webkit-box",
                            boxOrient: "vertical",
                            overflow: "hidden",
                            height: "10.4rem",
                            fontSize: "1.2rem",
                            marginBottom: "2.4rem",
                            color: "text3",
                          })}
                        >
                          {photo.tags &&
                            photo.tags.map((tag: { name: string }, i) => (
                              <div key={i}># {tag.name}</div>
                            ))}
                        </div>
                      </Link>
                      <Link
                        href={`/${photo.photographerId}/photos/${photo.ulid}/edit`}
                        className={css({
                          textDecoration: "none",
                          color: "text1",
                          border: "2px solid black",
                          borderRadius: "9999px",
                          padding: ".5rem 1rem",
                          cursor: "pointer",
                          "&:hover": {
                            bg: "bg1",
                          },
                        })}
                      >
                        {dict.edit_photo}
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "2rem",
            })}
          >
            <ActionButton
              text={dict.get_more_photos}
              onClick={loadMorePhotos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
