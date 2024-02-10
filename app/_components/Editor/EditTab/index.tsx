// app/_components/Editor/EditTab/index.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { css, cva } from "@/styled-system/css";
import { UploadImgNPreview } from "@/app/_components/upload_image_and_preview";
import { UploadImgDrop } from "@/app/_components/upload_img_drop";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import "./styles.css";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";
import { options } from "@/app/_constants/index";
import { ActionButton } from "@/app/_components/action_button";
import { useState } from "react";

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

export const EditTab = ({
  dict,
  handleSave,
  handlePublish,
  coverImg,
  setCoverImg,
  titleValue,
  setTitle,
  tagsValue,
  setTags,
  editorState,
  setEditorState,
  contentValue,
  setContent,
}: {
  dict: Dictionary;
  handleSave?: () => void;
  handlePublish?: () => void;
  coverImg: string;
  setCoverImg: (coverImg: string) => void;
  titleValue: string;
  setTitle: (title: string) => void;
  tagsValue: string;
  setTags: (tags: string) => void;
  editorState: string;
  setEditorState: (editorState: string) => void;
  contentValue: string;
  setContent: (content: string) => void;
}) => {
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

  return (
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
            text={dict.upload_a_cover_image}
            text2={dict.uploading}
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
          {dict.title}
        </label>
        <input
          type="text"
          id="title"
          value={titleValue}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={dict.title_placeholder}
          autoComplete="off"
          className={ulStyle()}
        />
        <label
          htmlFor="tags"
          className={css({
            fontSize: "12px",
            fontWeight: "700",
          })}
        >
          {dict.tags}
        </label>
        <div
          className={css({
            position: "relative",
          })}
        >
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
            placeholder={dict.tags_placeholder}
            autoComplete="off"
            className={ulStyle({
              focus: isFocus && filteredOptions.length > 0 ? "on" : "off",
            })}
          />
          {isFocus && filteredOptions.length > 0 && (
            <ul
              className={css({
                position: "absolute",
                top: "2rem",
                left: "0",
                width: "100%",
                zIndex: "1",
                fontWeight: "700",
                bg: "bg3",
                borderTop: "none",
                borderLeft: "4px solid black",
                borderRight: "4px solid black",
                borderBottom: "4px solid black",
                borderRadius: "0 0 10px 10px",
                textIndent: "0.4rem",
                fontSize: "1.2rem",
                sm: {
                  fontSize: "1.4rem",
                  padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  top: "3.2rem",
                },
                md: {
                  fontSize: "1.6rem",
                  padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  top: "3.4rem",
                },
                lg: {
                  fontSize: "1.8rem",
                  minHeight: "1.8rem",
                  padding: "0.8rem 0.4rem 0.6rem 0.4rem",
                  top: "3.6rem",
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
          )}
        </div>
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
            {dict.contents}
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
                setContent(value);

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
          {dict.upload_images}
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
            text={dict.drag_n_drop_some_images_here}
            text2={dict.click}
            contentValue={contentValue}
            setContent={setContent}
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
          {handlePublish && (
            <ActionButton text={dict.publish} onClick={handlePublish} />
          )}
          {handleSave && (
            <ActionButton text={dict.save_changes} onClick={handleSave} />
          )}
        </div>
      </div>
    </>
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
    fontSize: "1.2rem",
    minHeight: "1.2rem",
    border: "4px solid white",
    marginBottom: "1rem",
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
  variants: {
    focus: {
      on: {
        borderTop: "4px solid black",
        borderLeft: "4px solid black",
        borderRight: "4px solid black",
      },
      off: {},
    },
  },
});
