// app/posts/new/page.tsx
"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkBreaks from "remark-breaks";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorHeader } from "@/app/components/editor_header";
import { css, cva } from "@/styled-system/css";
import "./styles.css";

const md_syntax = `# Markdown syntax

## Headers

\`\`\`
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
\`\`\`

## Bold

\`\`\`
**Bold**
\`\`\`

## Italic

\`\`\`
**Italic**
\`\`\`

## Lists

\`\`\`
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
\`\`\`

\`\`\`
1. First
2. Second
3. Third
\`\`\`

## Links

\`\`\`
[example url](https://example.com)
\`\`\`

## Images

\`\`\`
![example image](https://picsum.photos/200/300/?blur)
\`\`\`

## Horizontal Rule

\`\`\`
---
\`\`\`

## Blockquotes

\`\`\`
> This is a blockquote.
\`\`\`

## Code

\`\`\`
\`code\`
\`\`\`

`;

const tabStrArr: string[] = ["Editor", "Preview", "Markdown Syntax"];

const initStr: string = "### Input your text";

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

export default function App() {
  const [editorContent, setEditorContent] = useState(initStr);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  let activeTabItem;
  if (activeTabIndex === 0) {
    activeTabItem = (
      <CodeMirror
        value={editorContent}
        theme={myTheme}
        basicSetup={editorSetup}
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
        ]}
        onChange={(text) => {
          setEditorContent(text);
        }}
      />
    );
  } else {
    activeTabItem = (
      <MarkdownPreview
        source={activeTabIndex === 1 ? editorContent : md_syntax}
        pluginsFilter={(type, plugins) => {
          if (type === "remark") {
            return [...plugins, remarkBreaks];
          }
          return plugins;
        }}
        rehypeRewrite={(node, index, parent) => {
          if (
            node.tagName === "a" &&
            parent &&
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
    <main className={mainStyle()}>
      <EditorHeader content={editorContent} />
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
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "1rem 2rem 2rem 2rem",
    maxWidth: "1200px",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
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
