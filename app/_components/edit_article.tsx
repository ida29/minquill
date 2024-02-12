// components/edit_article_body.tsx
"use client";

import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import { useState, useEffect } from "react";
import { updateArticle, Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import { Tag } from "@/app/_utils/tag";
import { EditArticleHeader } from "@/app/_components/edit_article_header";
import * as Editor from "@/app/_components/Editor/index";

export const EditArticle = ({
  dict,
  user,
  article,
  isLikedByUser,
}: {
  dict: Dictionary;
  user: User;
  article: Article;
  isLikedByUser: boolean;
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editorState, setEditorState] = useState("");
  const [userValue, setUser] = useState<User>(article.author as User);

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikesCount] = useState(article.likes?.length || 0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const [articleValue, setArticleValue] = useState<Article>(article);
  const setTitle = (value: string) => {
    setArticleValue({ ...articleValue, title: value });
  };
  const setTags = (value: Tag[]) => {
    setArticleValue({ ...articleValue, tags: value });
  };
  const setContent = (value: string) => {
    setArticleValue({ ...articleValue, content: value });
  };
  const setCoverImg = (value: string) => {
    setArticleValue({ ...articleValue, coverImg: value });
  };

  const handleSave = async () => {
    try {
      const newArticle: Article = {
        title: articleValue.title,
        content: articleValue.content,
        coverImg: articleValue.coverImg,
        tags: articleValue.tags,
      };

      await updateArticle(newArticle, articleValue.ulid as string);
    } catch (error) {
      console.error(error);
    }
  };

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

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <Editor.EditTab
        dict={dict}
        handleSave={handleSave}
        setCoverImg={setCoverImg}
        setTitle={setTitle}
        setTags={setTags}
        editorState={editorState}
        setEditorState={setEditorState}
        setContent={setContent}
        article={articleValue}
      />
    );
  } else if (activeTabIndex === 1) {
    activeTabItem = (
      <Editor.PreviewTab
        dict={dict}
        userValue={userValue as User}
        handleLike={handleLike}
        isLiked={isLiked}
        likesCount={likesCount}
        article={articleValue}
      />
    );
  } else {
    activeTabItem = <Editor.HelpTab dict={dict} />;
  }

  return (
    <>
      <EditArticleHeader
        dict={dict}
        username={user.username}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        handleTabClick={handleTabClick}
      />
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
    </>
  );
};
