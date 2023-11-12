// components/home_page_body.tsx
"use client";
import { css, cva } from "@/styled-system/css";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkBreaks from "remark-breaks";
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
import { UploadImgBtn } from "@/components/upload_img_btn";

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
  const initStr: string = params.dict.init_str;

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
    defaultValue: initStr,
  });
  const [editorState, setEditorState] = useLocalStorageState("editorState", {
    defaultValue: "",
  });

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <div>
        <div>
          <label
            htmlFor="title"
            className={css({
              fontSize: "12px",
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
              borderBottom: "2px solid black",
              width: "100%",
              marginBottom: "1rem",
              fontSize: "24px",
              outline: "none",
              padding: "0.2rem 0",
              transition: "all 0.1s",
              _focus: {
                borderBottom: "4px solid black",
              },
            })}
          />
        </div>
        <div>
          <label
            htmlFor="tag"
            className={css({
              fontSize: "12px",
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
              borderBottom: "2px solid black",
              width: "100%",
              marginBottom: "2rem",
              fontSize: "24px",
              outline: "none",
              padding: "0.2rem 0",
              transition: "all 0.1s",
              _focus: {
                borderBottom: "4px solid black",
              },
            })}
          />
        </div>
        <label
          htmlFor="tag"
          className={css({
            fontSize: "12px",
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
    );
  } else if (activeTabIndex === 2) {
    activeTabItem = (
      <div className={divPanelStyle()}>
        <div
          className={css({
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <UploadImgBtn text={params.dict.upload_images} />
        </div>
      </div>
    );
  } else {
    activeTabItem = (
      <div className={divPanelStyle()}>
        <MarkdownPreview
          source={activeTabIndex === 1 ? contentValue : params.dict.md_syntax}
          pluginsFilter={(type, plugins) => {
            if (type === "remark") {
              return [...plugins, remarkBreaks];
            }
            return plugins;
          }}
          rehypeRewrite={(node, index, parent) => {
            if (
              node.type === "element" &&
              node.tagName === "a" &&
              parent &&
              parent.type === "element" &&
              /^h(1|2|3|4|5|6)/.test(parent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
          wrapperElement={{ "data-color-mode": "light" }}
        />
      </div>
    );
  }

  return (
    <main
      className={css({
        padding: "4.4rem",
      })}
    >
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
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
              <PublishBtn
                text={params.dict.publish}
                username={params.username}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    bg: "white",
    display: "flex",
    justifyContent: "center",
    paddingTop: "1rem",
  },
  variants: {
    color: {
      primary: { bg: "lightslategrey" },
      secondary: { bg: "white" },
    },
  },
});

const div2Style = cva({
  base: {
    display: "flex",
    flexWrap: "wrap",
    width: "100vw",
    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});

const divPanelStyle = cva({
  base: {
    padding: "16px 16px 16px",
    minHeight: "50dvh",
    width: "100%",
    height: "100%",

    border: "2px solid black",
    borderRadius: "4px",
    boxShadow: "1px 1px 0 #000",
    background: "white",

    position: "relative",
    zIndex: "0",
  },
});
