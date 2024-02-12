// app/[lang]/_components/article_page.tsx
"use client";

//import Link from "next/link";
import { css } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/_utils/dictionary";
import { Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import * as Editor from "@/app/_components/Editor/index";
import { useState } from "react";
import { ArticlePageHeader } from "@/app/_components/article_page_header";

export const ArticlePage = ({
  dict,
  article,
  isLikedByUser,
}: {
  dict: Dictionary;
  article: Article;
  isLikedByUser: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikesCount] = useState(article.likes?.length);

  const handleLike = async () => {
    if (article) {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      const oldLikesCount = likesCount;
      setLikesCount(oldLikesCount + (newIsLiked ? 1 : -1));

      const url = new URL(
        `/api/articles/${article.ulid}/likes`,
        process.env.NEXT_PUBLIC_WEBSITE_URL,
      );
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: newIsLiked }),
      });

      if (!res.ok) {
        setIsLiked(!newIsLiked);
        setLikesCount(oldLikesCount);
        return;
      }
    }
  };

  const activeTabItem = (
    <Editor.PreviewTab
      dict={dict}
      userValue={article.author as User}
      coverImg={article.coverImg ? article.coverImg : ""}
      titleValue={article.title}
      tagsValue={
        article?.tags
          ? article.tags.map((tag: { name: string }) => tag.name).join(",")
          : ""
      }
      contentValue={article?.content}
      handleLike={handleLike}
      isLiked={isLiked}
      likesCount={likesCount}
    />
  );

  return (
    <div
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
        })}
      >
        <ArticlePageHeader dict={dict} />
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
            {activeTabItem}
          </div>
        </main>
      </div>
    </div>
  );
};
