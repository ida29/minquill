// components/new_image.tsx

"use client";

import Image from "next/image";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import useLocalStorageState from "use-local-storage-state";
import { FiXCircle } from "react-icons/fi";
import { PublishImageBtn } from "@/app/_components/publish_image_btn";

export const NewImageBody = ({
  dict,
  imagesValue,
  setImages,
}: {
  dict: Dictionary;
  imagesValue: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [titleValue, setTitle] = useLocalStorageState("image_title", {
    defaultValue: "",
  });
  const [tagsValue, setTags] = useLocalStorageState("image_tags", {
    defaultValue: "",
  });

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
        <div
          className={css({
            height: "100%",
            width: "95%",
            marginBottom: "1.4rem",
            sm: {
              width: "90%",
              marginBottom: "1.6rem",
            },
            md: {
              width: "60%",
              marginBottom: "1.8rem",
            },
            lg: {
              width: "50%",
              marginBottom: "2rem",
            },
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "100%",
              marginTop: "2rem",
              marginBottom: "2rem",
            })}
          >
            <Image
              src={imagesValue[0]}
              alt={imagesValue[0]}
              width={300}
              height={300}
              className={css({
                borderRadius: "0.4rem",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
              })}
            />
            <FiXCircle
              onClick={() => {
                setImages([]);
                setTitle("");
                setTags("");
              }}
              className={css({
                fontSize: "2.4rem",
                borderRadius: "50%",
                _hover: {
                  bg: "rgba(0, 0, 0, 0.1)",
                },
              })}
            />
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "1.6rem",
            })}
          >
            <label
              htmlFor="title"
              className={css({
                fontSize: "12px",
                fontWeight: "700",
              })}
            >
              {dict.title}
            </label>
            <input
              type="text"
              id="title"
              value={titleValue}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={dict.title_placeholder}
              autoComplete="off"
              className={css({
                bg: "bg3",
                textIndent: "0.8rem",
                borderRadius: "10px",
                width: "100%",
                fontWeight: "700",
                outline: "none",
                padding: "0.5rem",
                transition: "all 0.1s",
                fontSize: "1.2rem",
                marginBottom: "1.2rem",
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
            <label
              htmlFor="tags"
              className={css({
                fontSize: "12px",
                fontWeight: "700",
              })}
            >
              {dict.tags}
            </label>
            <input
              type="text"
              id="tags"
              value={tagsValue}
              onChange={(e) => {
                setTags((e.target as HTMLInputElement).value);
              }}
              placeholder={dict.tags_placeholder}
              autoComplete="off"
              className={`${ulStyle()}`}
            />
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "2rem",
                fontWeight: "700",
                margin: "2rem 0",
              })}
            >
              {tagsValue &&
                tagsValue
                  .split(",")
                  .map((tagName: string) => (
                    <div key={tagName}>#{tagName}</div>
                  ))}
            </div>
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                width: "100%",
              })}
            >
              <PublishImageBtn
                text={dict.publish}
                imagesValue={imagesValue}
                setImages={setImages}
                titleValue={titleValue}
                setTitle={setTitle}
                tagsValue={tagsValue}
                setTags={setTags}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ulStyle = cva({
  base: {
    bg: "bg3",
    textIndent: "1rem",
    borderRadius: "10px",
    width: "100%",
    fontWeight: "700",
    outline: "none",
    paddingTop: "0.2rem",
    transition: "all 0.1s",
    fontSize: "1.4rem",
    minHeight: "1.4rem",
    border: "4px solid white",
    sm: {
      fontSize: "1.4rem",
      padding: "0.8rem 0.4rem 0.4rem 0.4rem",
    },
    md: {
      fontSize: "1.6rem",
      padding: "0.8rem 0.4rem 0.4rem 0.4rem",
    },
    lg: {
      fontSize: "1.8rem",
      minHeight: "1.8rem",
      padding: "0.8rem 0.4rem 0.4rem 0.4rem",
    },
    _focus: {
      borderTop: "4px solid black",
      borderLeft: "4px solid black",
      borderRight: "4px solid black",
      borderBottom: "4px solid black",
    },
  },
});
