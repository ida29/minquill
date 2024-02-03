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

export const HomePageBody2 = ({
  dict,
  photos,
}: {
  dict: Dictionary;
  photos: Photo[];
}) => {
  const [photosValue, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tags = useMemo(() => ["Tips", "Review", "Painting Guide"], []);

  useEffect(() => {
    setPhotos(photos);
  }, [photos]);

  const handleSubmit = async (token: string) => {
    setIsLoading(true);
    try {
      const articles: Photo[] =
        token === ""
          ? await getRecommendedPhotos(20, tags)
          : await getPhotosWithToken(token, 30);
      setPhotos(articles);
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
            <li className={`${liStyle()} }`}>Articles</li>
          </Link>
          <Link href={`/photos`}>
            <li className={`${liStyle()} ${activeTab()}`}>Photos</li>
          </Link>
        </ul>
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
            placeholder={dict.full_text_search_placeholder}
            autoComplete="off"
            className={css({
              color: "text1",
              bg: "bg3",
              textIndent: "1rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              padding: "1rem 0.4rem 0.6rem 0",
              transition: "all 0.1s",
              fontSize: "1.4rem",
              margin: "3rem .5rem 1rem .5rem",
              border: "4px solid white",
              _focus: {
                border: "4px solid black",
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
            })}
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
                  border: "2px solid",
                  borderColor: "text1",
                  borderRadius: "10px",
                  margin: "5px",
                  padding: "5px",
                  bg: "bg3",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease 0s",
                  _hover: {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
                  },
                })}
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={300}
                  height={300}
                  priority={true}
                  className={css({
                    width: "100%",
                    display: "block",
                    borderRadius: "5px",
                  })}
                />
                <div
                  className={css({
                    marginTop: "0.4rem",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "700",
                  })}
                >
                  {photo.title}
                </div>
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
          priority={false}
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
