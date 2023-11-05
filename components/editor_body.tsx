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

const stateFields = { history: historyField };
const tabStrArr: string[] = ["Editor", "Preview", "Markdown Syntax"];
const initStr: string = `### Input your text`;
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
  const [activeTabIndex, setActiveTabIndex] = useLocalStorageState(
    "activTabIndex",
    { defaultValue: 0 },
  );
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
      <div
        className={css({
          display: "flex",
          //flexWrap: "wrap",
          alignContent: "center",
          gap: "1rem",
        })}
      >
        <div
          className={css({
            width: "70%",
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
        <div
          className={css({
            width: "30%",
            font: "600 0.8rem/1 futura",
            border: "3px solid black",
            borderRadius: "10px",
            padding: "1rem 2rem 2rem 2rem",
            marginTop: "1.8rem",
          })}
        ></div>
      </div>
    </main>
  );
};

const ulStyle = cva({
  base: {
    margin: "0",
    padding: "0",
  },
});

const liStyle = cva({
  base: {
    width: "12rem",
    height: "2rem",
    font: "600 0.8rem/1 futura",
    textAlign: "center",

    margin: "0",
    padding: "8px 20px",
    listStyle: "none",
    display: "inline-block",

    border: "3px solid black",
    borderRadius: "10px 10px 0 0",
    bg: "lightgrey",

    marginRight: "-3px",
    _hover: { bg: "darkgrey" },
  },
});

const divPanelStyle = cva({
  base: {
    padding: "16px 16px 16px",
    minHeight: "100vh",

    border: "3px solid black",
    borderRadius: "0 10px 10px 10px",
    background: "white",

    marginTop: "-0.2rem",
    position: "relative",
    zIndex: "0",
  },
});

const activeTab = cva({
  base: {
    bg: "white",
    border: "3px solid black",
    borderBottom: "none",

    position: "relative",
    zIndex: "1",
    _hover: { bg: "white !important" },
  },
});
