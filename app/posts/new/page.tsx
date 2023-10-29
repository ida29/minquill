"use client";
import CodeMirror from "@uiw/react-codemirror";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorHeader } from "@/app/components/headers";
import { css, cva } from "@/styled-system/css";
import "./styles.css";

const code = `# Title

## Headers
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

## Emphasis
*Italic* or _Italic_
**Bold** or __Bold__
**_Bold and Italic_** or *__Bold and Italic__*

## Lists
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
1. First
2. Second
3. Third

## Links
[example url](https://example.com)

## Images
![example image](https://picsum.photos/200/300/?blur)

## Blockquotes
> This is a blockquote.

## Horizontal Rule
---

## Task Lists
- [x] Task 1
- [ ] Task 2
- [x] Task 3

`;

const editorSetup: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
};

export default function App() {
  return (
    <main className={mainStyle()}>
      <EditorHeader />
      <div
        className={css({
          display: "flex",
          gap: "4px",
        })}
      >
        <div
          className={css({
            width: "50%",
            border: "3px solid black",
            borderRadius: "10px",
            padding: "4px",
          })}
        >
          <CodeMirror
            value={code}
            basicSetup={editorSetup}
            extensions={[
              markdown({
                base: markdownLanguage,
                codeLanguages: languages,
              }),
            ]}
          />
        </div>
        <div
          className={css({
            width: "50%",
            border: "3px solid black",
            borderRadius: "10px",
            padding: "4px",
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
