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
import { useState } from "react";
import "./styles.css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { FiFeather, FiPlayCircle, FiHelpCircle } from "react-icons/fi";

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

export const EditorBody = (params: { dict: Dictionary }) => {
  const initStr: string = params.dict.init_str;
  const tabStrArr: React.ReactNode[] = [
    <FiFeather key="0" />,
    <FiPlayCircle key="1" />,
    <FiHelpCircle key="2" />,
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [contentValue, setContentValue] = useLocalStorageState("contentValue", {
    defaultValue: initStr,
  });
  const [editorState, setEditorState] = useLocalStorageState("editorState", {
    defaultValue: "",
  });

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
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
    );
  } else {
    activeTabItem = (
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
    );
  }

  return (
    <main>
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
              minHeight: "100vh",
              //marginRight: "auto",
            })}
          >
            <ul className={ulStyle()}>
              {tabStrArr.map((tabName, index) => (
                <li
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`${liStyle()} 
                  ${index === activeTabIndex ? activeTab() : ""}`}
                >
                  {tabName}
                </li>
              ))}
            </ul>
            <div className={divPanelStyle()}>{activeTabItem}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    bg: "lightslategrey",
    display: "flex",
    justifyContent: "center",
    borderTop: "2px solid black",
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
    padding: "0 1.5rem 0 1.5rem",
    width: "100vw",
    sm: { padding: "0 2rem 0 2rem", width: "100vw" },
    md: { padding: "0 2.5rem 0 2.5rem", width: "95vw" },
    lg: { padding: "0 3rem 0 3rem", width: "90vw" },
  },
});

const ulStyle = cva({
  base: {
    margin: "0",
    padding: "0",
  },
});

const liStyle = cva({
  base: {
    height: "2.6rem",
    font: "600 1.4rem/1 futura",
    textAlign: "center",

    margin: "0",
    padding: "8px 20px",
    listStyle: "none",
    display: "inline-block",

    border: "2px solid black",
    bg: "lightgrey",

    marginRight: "-2px",
    _hover: { bg: "darkgrey" },
  },
});

const divPanelStyle = cva({
  base: {
    padding: "16px 16px 16px",
    minHeight: "100vh",
    width: "100%",

    border: "2px solid black",
    background: "white",

    marginTop: "-0.55rem",
    position: "relative",
    zIndex: "0",
  },
});

const activeTab = cva({
  base: {
    bg: "white",
    border: "2px solid black",
    borderBottom: "none",

    position: "relative",
    zIndex: "1",
    _hover: { bg: "white !important" },
  },
});
