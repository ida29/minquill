// app/components/photo_page.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import React, { useEffect, useState } from "react";
import { Photo, getPhoto } from "@/app/_utils/photo";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const PhotoPage = ({
  dict,
  username,
  unique,
}: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  const { data: session, status } = useSession();
  const [photo, setPhoto] = useState<Photo>();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photo: Photo = await getPhoto(unique);
        setPhoto(photo);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPhoto();
  }, [unique]);

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
          height: "100vh",
          width: "100vw",
          sm: { width: "90vw" },
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          })}
        >
          <div
            className={css({
              display: "flex",
              bg: "bg3",
              borderRadius: "10px",
              width: "90%",
              sm: { width: "70%" },
              md: { width: "70%" },
              lg: { width: "70%" },
            })}
          >
            <div
              className={css({
                width: "50%",
              })}
            >
              {photo && (
                <Image
                  width="400"
                  height="400"
                  src={photo.url}
                  alt="photo"
                  className={css({
                    borderRadius: "10px 0 0 10px",
                  })}
                />
              )}
            </div>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                width: "50%",
              })}
            >
              <div
                className={css({
                  display: "flex",
                  fontWeight: "700",
                  marginTop: "1rem",
                })}
              >
                <Image
                  width="48"
                  height="48"
                  src={photo?.photographer?.image || ""}
                  alt="User Image"
                  className={css({
                    borderRadius: "50%",
                    marginRight: ".5rem",
                  })}
                />
                <div
                  className={css({
                    display: "flex",
                    flexDirection: "column",
                  })}
                >
                  <p>{photo?.photographer?.name}</p>
                  <p>{photo?.photographer?.username}</p>
                </div>
              </div>
              <div
                className={css({
                  fontSize: "1.6rem",
                  fontWeight: "700",
                  marginTop: "2rem",
                })}
              >
                {photo?.title}
              </div>
              <div
                className={css({
                  marginTop: "1rem",
                })}
              >
                Comments:
                {photo?.comments?.map((comment: string) => <>comment</>)}
              </div>
              <div
                className={css({
                  marginTop: "auto",
                  display: "flex",
                  padding: "1rem 0 ",
                  alignItems: "center",
                })}
              >
                <Image
                  width="36"
                  height="36"
                  src={session?.user?.image || ""}
                  alt="User Image"
                  className={css({
                    borderRadius: "50%",
                    marginRight: ".5rem",
                  })}
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className={css({
                    width: "100%",
                    height: "100%",
                    padding: "0.5rem",
                    border: "none",
                    borderRadius: "10px",
                    outline: "none",
                    fontSize: "1.2rem",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
