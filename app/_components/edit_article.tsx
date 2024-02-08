// components/edit_article_body.tsx
"use client";

import { css } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import { useState, useEffect } from "react";
import { updateArticle, Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import { EditArticleHeader } from "@/app/_components/edit_article_header";
import * as Editor from "@/app/_components/Editor/index";

export const EditArticle = ({
  dict,
  user,
  article,
}: {
  dict: Dictionary;
  user: User;
  article: Article;
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [editorState, setEditorState] = useState("");
  const [titleValue, setTitle] = useState("");
  const [userValue, setUser] = useState<User>();
  const [tagsValue, setTags] = useState("");
  const [contentValue, setContent] = useState("");
  const [coverImg, setCoverImg] = useState("");

  useEffect(() => {
    (async () => {
      setTitle(article?.title);
      setUser(article?.author);
      setTags(
        article?.tags
          ? article.tags.map((tag: { name: string }) => tag.name).join(",")
          : "",
      );
      setContent(article?.content);
      setCoverImg(article.coverImg ? article.coverImg : "");
    })();
  }, [article]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleSave = async () => {
    try {
      const content = contentValue as string;
      const title = titleValue as string;
      const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
      const newArticle: Article = {
        title: title,
        content: content,
        coverImg: coverImg,
        tags: tags as [],
      };

      if (article.ulid) {
        await updateArticle(newArticle, article.ulid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <Editor.EditTab
        dict={dict}
        handleSave={handleSave}
        coverImg={coverImg}
        setCoverImg={setCoverImg}
        titleValue={titleValue}
        setTitle={setTitle}
        tagsValue={tagsValue}
        setTags={setTags}
        editorState={editorState}
        setEditorState={setEditorState}
        contentValue={contentValue}
        setContent={setContent}
      />
    );
  } else if (activeTabIndex === 1) {
    activeTabItem = (
      <Editor.PreviewTab
        dict={dict}
        userValue={userValue as User}
        coverImg={coverImg}
        titleValue={titleValue}
        tagsValue={tagsValue}
        contentValue={contentValue}
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
