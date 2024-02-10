// components/article_page_body.tsx
"use client";

//import Link from "next/link";
import { css } from "@/styled-system/css";
import "./styles.css";
import { Dictionary } from "@/app/_utils/dictionary";
import { Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import * as Editor from "@/app/_components/Editor/index";

export const ArticlePageBody = ({
  dict,
  article,
}: {
  dict: Dictionary;
  article: Article;
}) => {
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
    />
  );

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
        {activeTabItem}
      </div>
    </main>
  );
};
