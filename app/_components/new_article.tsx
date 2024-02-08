// components/new_article.tsx
"use client";

import { css } from "@/styled-system/css";
import useLocalStorageState from "use-local-storage-state";
import { Dictionary } from "@/app/_utils/dictionary";
import { useState, useEffect } from "react";
import { createArticle, Article } from "@/app/_utils/article";
import { User } from "@/app/_utils/user";
import { NewArticleHeader } from "@/app/_components/new_article_header";
import { useRouter } from "next/navigation";
import * as Editor from "@/app/_components/Editor/index";

export const NewArticle = ({
  dict,
  user,
}: {
  dict: Dictionary;
  user: User;
}) => {
  const router = useRouter();

  const [titleValue, setTitle] = useLocalStorageState("title", {
    defaultValue: "",
  });
  const [tagsValue, setTags] = useLocalStorageState("tags", {
    defaultValue: "",
  });
  const [contentValue, setContent] = useLocalStorageState("content", {
    defaultValue: "",
  });
  const [coverImg, setCoverImg] = useLocalStorageState("coverImg", {
    defaultValue: "",
  });

  const [userValue, setUser] = useState<User>(user);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editorState, setEditorState] = useState("");

  //useEffect(() => {
  //  (async () => {
  //    setTitle(article?.title);
  //    setUser(article?.author);
  //    setTags(
  //      article?.tags
  //        ? article.tags.map((tag: { name: string }) => tag.name).join(",")
  //        : "",
  //    );
  //    setContent(article?.content);
  //    setCoverImg(article.coverImg ? article.coverImg : "");
  //  })();
  //}, [article]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const handlePublish = async () => {
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
      router.push(`/${user.username}`);
      const article = await createArticle(newArticle);
      if (article === undefined) {
        console.error("Failed to create article");
        return;
      }

      setTitle("");
      setTags("");
      setContent("");
      setCoverImg("");
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
