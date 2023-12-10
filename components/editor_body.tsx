// components/home_page_body.tsx
"use client";
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

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <>
        <div>
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
              border: "2px solid black",
              boxShadow: "1px 1px 0 #000",
              textIndent: "0.8rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              paddingTop: "0.2rem",
              transition: "all 0.1s",
              fontSize: "1.4rem",
              marginBottom: "1.4rem",
              sm: {
                fontSize: "1.6rem",
                marginBottom: "1.6rem",
              },
              md: {
                fontSize: "1.8rem",
                marginBottom: "1.8rem",
              },
              lg: {
                fontSize: "2rem",
                marginBottom: "2rem",
              },
            })}
          />
        </div>
        <div>
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
              border: "2px solid black",
              boxShadow: "1px 1px 0 #000",
              textIndent: "1rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              paddingTop: "0.2rem",
              transition: "all 0.1s",
              fontSize: "1.4rem",
              marginBottom: "1.4rem",
              sm: {
                fontSize: "1.6rem",
                marginBottom: "1.6rem",
              },
              md: {
                fontSize: "1.8rem",
                marginBottom: "1.8rem",
              },
              lg: {
                fontSize: "2rem",
                marginBottom: "2rem",
              },
            })}
          />
        </div>
        <div
          className={css({
            marginBottom: "1.4rem",
            sm: {
              marginBottom: "1.6rem",
            },
            md: {
              marginBottom: "1.8rem",
            },
            lg: {
              marginBottom: "2rem",
            },
          })}
        >
          <label
            htmlFor="contents"
            className={css({
              fontSize: "12px",
              fontWeight: "700",
            })}
          >
            {params.dict.cover_image}
          </label>
          <UploadImgNPreview text={params.dict.upload_images} />
        </div>
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
      </>
    );
  } else if (activeTabIndex === 2) {
    activeTabItem = (
      <>
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
          })}
        >
          <UploadImgDrop
            text={params.dict.drag_n_drop_some_images_here}
            text2={params.dict.click}
          />
        </div>
      </>
    );
  } else {
    activeTabItem = (
      <>
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
        <div
          className={css({
            width: "90%",
            paddingTop: "1.4rem",
            sm: {
              paddingTop: "1.6rem",
            },
            md: {
              paddingTop: "1.8rem",
            },
            lg: {
              paddingTop: "2rem",
            },
          })}
        >
          {activeTabItem}
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            })}
          >
            {activeTabIndex === 0 ? (
              <PublishBtn
                text={params.dict.publish}
                username={params.username}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const divPanelStyle = cva({
  base: {
    border: "2px solid black",
    padding: "0.8rem",
    minHeight: "calc(100dvh - 30rem)",

    borderRadius: "10px",
    boxShadow: "1px 1px 0 #000",
    background: "white",

    position: "relative",
    zIndex: "0",
  },
});
