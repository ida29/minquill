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
  user,
  isLikedByUser,
}: {
  dict: Dictionary;
  article: Article;
  user?: User;
  isLikedByUser?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser || false);
  const [likesCount, setLikesCount] = useState(article.likes?.length || 0);

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
      userValue={user}
      handleLike={handleLike}
      isLiked={isLiked}
      likesCount={likesCount}
      article={article}
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
