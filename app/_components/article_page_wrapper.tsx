// components/article_page_wrapper.tsx
"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { ArticlePageHeader } from "@/app/_components/article_page_header";
import { ArticlePageBody } from "@/app/_components/article_page_body";
import { css, cva } from "@/styled-system/css";
import { Article } from "@/app/_utils/article";

export const ArticlePageWrapper = ({
  dict,
  article,
}: {
  dict: Dictionary;
  article: Article;
}) => {
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
        })}
      >
        <ArticlePageHeader dict={dict} />
        <ArticlePageBody dict={dict} article={article} />
      </div>
    </div>
  );
};
