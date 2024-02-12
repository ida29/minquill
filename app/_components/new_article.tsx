// components/new_article.tsx
"use client";

import { css } from "@/styled-system/css";
import useLocalStorageState from "use-local-storage-state";
import { Dictionary } from "@/app/_utils/dictionary";
import { useState, useEffect } from "react";
import { createArticle, Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import { Tag } from "@/app/_utils/tag";
import { NewArticleHeader } from "@/app/_components/new_article_header";
import { useRouter } from "next/navigation";
import * as Editor from "@/app/_components/Editor/index";
import { safeJSONParse } from "@/app/_utils/safeJSONParse";

export const NewArticle = ({
  dict,
  user,
}: {
  dict: Dictionary;
  user: User;
}) => {
  const router = useRouter();

  //const [titleValue, setTitle] = useLocalStorageState("title", {
  //  defaultValue: "",
  //});
  //const [tagsValue, setTags] = useLocalStorageState("tags", {
  //  defaultValue: "",
  //});
  //const [contentValue, setContent] = useLocalStorageState("content", {
  //  defaultValue: "",
  //});
  //const [coverImg, setCoverImg] = useLocalStorageState("coverImg", {
  //  defaultValue: "",
  //});
  const [articleJson, setArticleJson] = useLocalStorageState("savedArticle4", {
    defaultValue: JSON.stringify({
      title: "",
      content: "",
      authorId: user.username,
      author: user,
      ulid: "",
      coverImg: "",
      likes: [],
      comments: [],
      tags: [],
    }),
  });
  const setTitle = (value: string) => {
    const article: Article | null = safeJSONParse(articleJson);
    if (article === null) return;
    article.title = value;
    setArticleJson(JSON.stringify(article));
  };
  const setTags = (value: Tag[]) => {
    const article: Article | null = safeJSONParse(articleJson);
    if (article === null) return;
    article.tags = value;
    setArticleJson(JSON.stringify(article));
  };
  const setContent = (value: string) => {
    const article: Article | null = safeJSONParse(articleJson);
    if (article === null) return;
    article.content = value;
    setArticleJson(JSON.stringify(article));
  };
  const setCoverImg = (value: string) => {
    const article: Article | null = safeJSONParse(articleJson);
    if (article === null) return;
    article.coverImg = value;
    setArticleJson(JSON.stringify(article));
  };

  const [userValue, setUser] = useState<User>(user);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editorState, setEditorState] = useState("");

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const article: Article | null = safeJSONParse(articleJson.trim());
  if (article === null) {
    return <>Error</>;
  }

  const handlePublish = async () => {
    try {
      const newArticle: Article = {
        title: article.title,
        content: article.content,
        coverImg: article.coverImg,
        tags: article.tags as [],
      };
      router.push(`/${user.username}`);
      const res = await createArticle(newArticle);
      if (res === undefined) {
        console.error("Failed to create article");
        return;
      }

      setArticleJson(
        JSON.stringify({
          title: "",
          content: "",
          authorId: user.username,
          author: user,
          ulid: "",
          coverImg: "",
          likes: [],
          comments: [],
          tags: [],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <Editor.EditTab
        dict={dict}
        handlePublish={handlePublish}
        setCoverImg={setCoverImg}
        setTitle={setTitle}
        setTags={setTags}
        editorState={editorState}
        setEditorState={setEditorState}
        setContent={setContent}
        article={article}
      />
    );
  } else if (activeTabIndex === 1) {
    activeTabItem = (
      <Editor.PreviewTab
        dict={dict}
        userValue={userValue as User}
        isLiked={false}
        likesCount={0}
        article={article}
      />
    );
  } else {
    activeTabItem = <Editor.HelpTab dict={dict} />;
  }

  return (
    <>
      <NewArticleHeader
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
