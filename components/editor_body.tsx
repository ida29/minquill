// components/home_page_body.tsx
"use client";

import Image from "next/image";
import { css, cva } from "@/styled-system/css";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { historyField } from "@codemirror/commands";
import useLocalStorageState from "use-local-storage-state";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { PublishBtn } from "@/components/publish_btn";
import { UploadImgDrop } from "@/components/upload_img_drop";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { UploadImgNPreview } from "./upload_image_and_preview";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

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

export const EditorBody = (params: { dict: Dictionary; username: string }) => {
  const [title, setTitle] = useLocalStorageState("title", {
    defaultValue: "",
  });
  const [tag, setTag] = useLocalStorageState("", {
    defaultValue: "",
  });
  const [activeTabIndex] = useLocalStorageState("activeTab", {
    defaultValue: 0,
  });
  const [contentValue, setContentValue] = useLocalStorageState("contentValue", {
    defaultValue: "",
  });
  const [editorState, setEditorState] = useLocalStorageState("editorState", {
    defaultValue: "",
  });
  const [coverImg] = useLocalStorageState<string>("cover_img");

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <>
        <div
          className={css({
            width: "90%",
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
            <UploadImgNPreview text={params.dict.upload_a_cover_image} />
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            htmlFor="tag"
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {params.dict.tags}
          </label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={css({
              bg: "bg3",
              textIndent: "1rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              paddingTop: "0.2rem",
              transition: "all 0.1s",
              fontSize: "1.4rem",
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
          <div
            className={css({
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
            <div className={divPanelStyle()}>
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
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.6rem",
            })}
          >
            <PublishBtn text={params.dict.publish} username={params.username} />
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
                borderRadius: "0.5rem",
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
              {title}
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
            {params.username.split("-")[0]}
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
            <p>#tag1 #tag2 #tag3</p>
          </div>
          <div id="markdown-preview" className={divPanelStyle2()}>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
              }}
            >
              {contentValue}
            </ReactMarkdown>
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
            htmlFor={activeTabIndex === 1 ? "preview" : "help"}
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {activeTabIndex === 1 ? params.dict.preview : params.dict.help}
          </label>
          <div id="markdown-preview" className={divPanelStyle()}>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
              }}
            >
              {activeTabIndex === 1 ? contentValue : params.dict.help_text}
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

const divPanelStyle = cva({
  base: {
    border: "4px solid white",
    padding: "0.8rem",
    minHeight: "calc(100dvh - 10rem)",

    borderRadius: "10px",
    background: "white",

    position: "relative",
    zIndex: "0",
    _focusWithin: {
      border: "4px solid black",
    },
  },
});

const divPanelStyle2 = cva({
  base: {
    minHeight: "100vh",

    bg: "bg1",

    position: "relative",
    zIndex: "0",
    alignSelf: "flex-start",
  },
});
