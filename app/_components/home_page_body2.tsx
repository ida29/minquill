// components/home_page_body2.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import {
  getRecommendedPhotos,
  getPhotosWithToken,
  Photo,
} from "@/app/_utils/photo";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FiMessageCircle, FiHeart } from "react-icons/fi";

export const HomePageBody2 = ({
  dict,
  photos,
}: {
  dict: Dictionary;
  photos: Photo[];
}) => {
  const [photosValue, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPhotos(photos);
  }, [photos]);

  const handleSubmit = async (token: string) => {
    setIsLoading(true);
    try {
      if (token !== "") {
        const searchedPhotos = await getPhotosWithToken(token, 30);
        setPhotos(searchedPhotos);
      } else {
        setPhotos(photos);
      }
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
          marginBottom: "2.6rem",
        })}
      >
        <ul
          className={css({
            display: "flex",
            color: "text1",
            fontWeight: "700",
            fontSize: "1rem",
            lineHeight: "1",
            marginTop: "3rem",

            padding: "0 1rem",
            gap: "0 2rem",
            sm: { fontSize: "1.2rem", gap: "0 4rem" },
            md: { fontSize: "1.4rem", gap: "0 6rem" },
            lg: { fontSize: "1.6rem", gap: "0 8rem" },
          })}
        >
          <Link href={`/articles`}>
            <li className={`${liStyle()}`}>{dict.articles}</li>
          </Link>
          <Link href={`/photos`}>
            <li className={`${liStyle()} ${activeTab()}`}>{dict.photos}</li>
          </Link>
        </ul>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
          })}
        >
          <input
            type="search"
            id="full-text-search"
            name="full-text-search"
            onKeyDown={handleKeyDown}
            placeholder={dict.full_text_search_placeholder}
            autoComplete="off"
            className={inputStyle({})}
          />
        </div>
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          360: 2,
          640: 3,
          768: 4,
          1024: 5,
          1280: 6,
          1536: 7,
        }}
      >
        <Masonry>
          {photosValue.map((photo, i) => (
            <Link
              key={i}
              href={`/${photo.photographerId}/photos/${photo.ulid}`}
            >
              <div
                className={css({
                  borderColor: "text1",
                  borderRadius: "10px",
                  margin: "5px",
                  bg: "bg3",
                  position: "relative",
                  "&:hover #photo_content": {
                    opacity: 1,
                  },
                })}
              >
                <div
                  id="photo_content"
                  className={css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    padding: "1rem",
                    bg: "rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    transition: "all 0.2s",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0 .5rem",
                    color: "text2",
                  })}
                >
                  <FiHeart
                    className={css({
                      fontSize: "1.4rem",
                    })}
                  />
                  <div
                    className={css({
                      fontSize: "1rem",
                    })}
                  >
                    {photo.likes?.length}
                  </div>
                  <FiMessageCircle
                    className={css({
                      fontSize: "1.4rem",
                    })}
                  />
                  <div
                    className={css({
                      fontSize: "1rem",
                    })}
                  >
                    {photo.comments?.length}
                  </div>
                </div>
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={300}
                  height={300}
                  priority={true}
                  className={css({
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  })}
                />
              </div>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
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
          priority={true}
          className={css({
            margin: "1rem 0 2rem 0",
          })}
        />
      </div>
    </main>
  );
};

const liStyle = cva({
  base: {
    padding: "0.8rem 0.4rem",
    listStyle: "none",
    _hover: {
      bg: "rgba(0, 0, 0, 0.1)",
    },
  },
});

const activeTab = cva({
  base: {
    borderBottom: "4px solid",
    color: "text1",
  },
});

const inputStyle = cva({
  base: {
    bg: "bg3",
    textIndent: "1rem",
    borderRadius: "10px",
    width: "42rem",
    fontWeight: "700",
    outline: "none",
    padding: ".8rem .4rem .6rem 0",
    transition: "all 0.1s",
    fontSize: "1.4rem",
    margin: "2rem .5rem 1rem .5rem",
    border: "4px solid white",
    _focus: {
      border: "4px solid",
      borderColor: "text1",
    },
    sm: {
      fontSize: "1.4rem",
    },
    md: {
      fontSize: "1.6rem",
    },
    lg: {
      fontSize: "1.8rem",
    },
  },
});
