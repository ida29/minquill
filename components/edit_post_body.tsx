// components/edit_post_body.tsx
"use client";

import Image from "next/image";
import { css, cva } from "@/styled-system/css";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { historyField } from "@codemirror/commands";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/utils/dictionary";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { UploadImgDrop } from "@/components/upload_img_drop";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { UploadImgNPreview } from "./upload_image_and_preview";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useState, useEffect, useMemo } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getPost, updatePost, Post } from "@/app/[lang]/utils/post";
import { ActionButton } from "@/components/action_button";
import rehypeRaw from "rehype-raw";

const stateFields = { history: historyField };
const editorSetup: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
};

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "white",
    backgroundImage: "",
    foreground: "black",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#8a919966",
  },
  styles: [],
});

export const EditPostBody = (params: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  const [editorState, setEditorState] = useLocalStorageState("editorState2", {
    defaultValue: "",
  });
  const [activeTabIndex] = useLocalStorageState("activeTab2", {
    defaultValue: 0,
  });

  const [titleValue, setTitle] = useState("");
  const [tagsValue, setTags] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const unique = useMemo(() => {
    return params.unique;
  }, [params.unique]);

  useEffect(() => {
    (async () => {
      const post: Post = await getPost(unique);
      setTitle(post?.title);
      setTags(
        post?.tags
          ? post.tags.map((tag: { name: string }) => tag.name).join(",")
          : "",
      );
      setContentValue(post?.content);
      setCoverImg(post.coverImg ? post.coverImg : "");
    })();
  }, [unique]);

  const handleSave = async () => {
    try {
      const content = contentValue as string;
      const title = titleValue as string;
      const tags = (tagsValue as string)?.split(",").map((part) => part.trim());
      const newPost: Post = {
        title: title,
        content: content,
        coverImg: coverImg,
        tags: tags as [],
      };

      await updatePost(newPost, unique);
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { id: 1, text: "Tips" },
    { id: 2, text: "Review" },
    { id: 3, text: "Painting Guide" },
  ];
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (tag: string) => {
    const last = tag.endsWith(",")
      ? ""
      : tag
          .split(",")
          .map((part) => part.trim())
          .slice(-1)[0];
    const filtered = options
      .filter((option) =>
        option.text.toLowerCase().includes(last.toLowerCase()),
      )
      .slice(0, 10);
    setFilteredOptions(filtered);
  };

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <>
        <div
          className={css({
            width: "95%",
            marginBottom: "1.4rem",
            sm: {
              width: "80%",
              marginBottom: "1.6rem",
            },
            md: {
              width: "75%",
              marginBottom: "1.8rem",
            },
            lg: {
              width: "70%",
              marginBottom: "2rem",
            },
          })}
        >
          <div
            className={css({
              marginTop: "1.6rem",
            })}
          >
            <UploadImgNPreview
              text={params.dict.upload_a_cover_image}
              coverImg={coverImg}
              setCoverImg={setCoverImg}
            />
          </div>
          <label
            htmlFor="title"
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {params.dict.title}
          </label>
          <input
            type="text"
            id="title"
            value={titleValue}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={params.dict.title_placeholder}
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
            {params.dict.tags}
          </label>
          <input
            type="text"
            id="tags"
            value={tagsValue}
            onChange={(e) => {
              setIsFocus(true);
              setTags((e.target as HTMLInputElement).value);
              handleChange((e.target as HTMLInputElement).value);
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder={params.dict.tags_placeholder}
            autoComplete="off"
            className={`${ulStyle()} ${
              isFocus && filteredOptions.length != 0 ? isForcusStyle() : ""
            }`}
          />
          {isFocus && filteredOptions.length != 0 && (
            <>
              <ul
                className={css({
                  fontWeight: "700",
                  bg: "bg3",
                  borderTop: "none",
                  borderLeft: "4px solid black",
                  borderRight: "4px solid black",
                  borderBottom: "4px solid black",
                  borderRadius: "0 0 10px 10px",
                  textIndent: "0.4rem",
                  sm: {
                    fontSize: "1.4rem",
                    padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  },
                  md: {
                    fontSize: "1.6rem",
                    padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  },
                  lg: {
                    fontSize: "1.8rem",
                    minHeight: "1.8rem",
                    padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  },
                })}
              >
                {filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const parts = tagsValue.split(",");
                      const tagsWithoutLast = parts.slice(0, -1).join(",");
                      const newTags =
                        tagsWithoutLast +
                        (parts.length > 1 ? "," : "") +
                        option.text;
                      setTags(newTags);
                      setIsFocus(false);
                    }}
                    className={css({
                      fontWeight: "700",
                      padding: ".5rem",
                      borderRadius: "0.5rem",
                      _hover: {
                        bg: "rgba(0, 0, 0, 0.2)",
                      },
                    })}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div
            className={css({
              marginTop: "1.6rem",
              marginBottom: "1.6rem",
            })}
          >
            <label
              htmlFor="contents"
              className={css({
                fontSize: "12px",
                fontWeight: "700",
              })}
            >
              {params.dict.contents}
            </label>
            <div
              className={css({
                border: "4px solid",
                borderColor: "bg3",
                padding: "0.8rem",
                minHeight: "calc(100dvh - 10rem)",

                borderRadius: "10px",
                bg: "bg3",

                position: "relative",
                zIndex: "0",
                _focusWithin: {
                  border: "4px solid black",
                },
              })}
            >
              <CodeMirror
                value={contentValue}
                initialState={
                  editorState
                    ? {
                        json: JSON.parse(editorState || ""),
                        fields: stateFields,
                      }
                    : undefined
                }
                theme={myTheme}
                basicSetup={editorSetup}
                extensions={[
                  html(),
                  EditorView.lineWrapping,
                  markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                  }),
                ]}
                onChange={(value, viewUpdate) => {
                  setContentValue(value);

                  const state = viewUpdate.state.toJSON(stateFields);
                  setEditorState(JSON.stringify(state));
                }}
              />
            </div>
          </div>
          <label
            htmlFor="upload_images"
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {params.dict.upload_images}
          </label>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1.6rem",
            })}
          >
            <UploadImgDrop
              text={params.dict.drag_n_drop_some_images_here}
              text2={params.dict.click}
            />
          </div>
          <div
            className={css({
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.6rem",
            })}
          >
            <ActionButton
              text={params.dict.save_changes}
              onClick={() => handleSave()}
            />
          </div>
        </div>
      </>
    );
  } else if (activeTabIndex === 1) {
    activeTabItem = (
      <>
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          })}
        >
          <div
            className={css({
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              bg: "bg2",
              sm: { paddingTop: "calc(80vh - 4.4rem)" },
              md: { paddingTop: "calc(70vh - 4.4rem)" },
              lg: { paddingTop: "calc(60vh - 4.4rem)" },
            })}
          >
            <Image
              width="400"
              height="400"
              src={coverImg || ""}
              alt="Cover Image"
              className={css({
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: "0.4",
                filter: "blur(3px)",
                top: "0",
                left: "0",
                objectFit: "cover",
                objectPosition: "center",
              })}
            />
            <div
              className={css({
                textAlign: "center",
                padding: "1rem 1rem .5rem 1rem",
                border: "2px solid",
                color: "text2",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontWeight: "700",
                fontSize: "2.2rem",
                width: "90%",
                sm: { fontSize: "2.4rem", width: "auto" },
                md: { fontSize: "2.6rem", width: "auto" },
                lg: { fontSize: "2.8rem", width: "auto" },
              })}
            >
              {titleValue}
            </div>
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: ".5rem",
            width: "90%",
            sm: { width: "70%" },
            md: { width: "70%" },
            lg: { width: "70%" },
          })}
        >
          <div
            className={css({
              margin: ".5rem 0",
              fontSize: "1rem",
              sm: { fontSize: "1.2rem" },
              md: { fontSize: "1.4rem" },
              lg: { fontSize: "1.6rem" },
            })}
          >
            {params.username}
          </div>
          <div
            className={css({
              marginBottom: ".5rem",
            })}
          >
            <ul
              id="reactions"
              className={css({
                display: "flex",
                gap: "1rem",
                fontSize: "1rem",
                sm: { fontSize: "1.2rem" },
                md: { fontSize: "1.4rem" },
                lg: { fontSize: "1.6rem" },
              })}
            >
              <li>
                <FiThumbsUp
                  className={css({
                    marginTop: "0.2rem",
                  })}
                />
              </li>
              <li>0</li>
              <li>
                <FiMessageSquare
                  className={css({
                    marginTop: "0.2rem",
                  })}
                />
              </li>
              <li>0</li>
            </ul>
          </div>
          <div
            className={css({
              display: "flex",
              gap: "1rem",
              fontSize: "1.2rem",
              marginBottom: "2rem",
            })}
          >
            {tagsValue &&
              tagsValue
                .split(",")
                .map((tagName: string) => <div key={tagName}>#{tagName}</div>)}
          </div>
          <div
            className={css({
              width: "100%",
            })}
          >
            <div
              id="markdown-preview2"
              className={css({
                padding: "0.8rem",
                minHeight: "calc(100dvh - 10rem)",

                borderRadius: "10px",
                bg: "bg1",

                position: "relative",
                zIndex: "0",
              })}
            >
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                components={{
                  code(props) {
                    const { className, children } = props;
                    const value = String(children).replace(/\n$/, "");
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";

                    if (language === "X" || language === "x") {
                      return <TwitterTweetEmbed tweetId={value} />;
                    }

                    if (language === "Youtube" || language === "youtube") {
                      return <YouTubeEmbed videoid={value} />;
                    }

                    return <code>{value}</code>;
                  },
                  p: ({ children }) => (
                    <p style={{ marginBottom: "1em" }}>{children}</p>
                  ),
                }}
              >
                {contentValue}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    activeTabItem = (
      <>
        <div
          className={css({
            margin: "1.6rem 0",
            width: "90%",
            sm: {
              width: "80%",
            },
            md: {
              width: "75%",
            },
            lg: {
              width: "70%",
            },
          })}
        >
          <label
            htmlFor="help"
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {params.dict.help}
          </label>
          <div
            id="markdown-preview"
            className={css({
              border: "4px solid",
              borderColor: "bg3",
              padding: "0.8rem",
              minHeight: "calc(100dvh - 10rem)",

              borderRadius: "10px",
              bg: "bg3",

              position: "relative",
              zIndex: "0",
              _focusWithin: {
                border: "4px solid black",
              },
            })}
          >
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
              }}
              rehypePlugins={[rehypeRaw]}
            >
              {params.dict.help_text}
            </ReactMarkdown>
          </div>
        </div>
      </>
    );
  }

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

const isForcusStyle = cva({
  base: {
    borderTop: "4px solid black",
    borderLeft: "4px solid black",
    borderRight: "4px solid black",
    borderBottom: "4px solid black",
    borderRadius: "10px 10px 0 0",
  },
});
