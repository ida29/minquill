// app/_components/Editor/HelpTab/index.tsx

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import "./styles.css";

export const HelpTab = ({ dict }: { dict: Dictionary }) => {
  return (
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
          {dict.help}
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
            {dict.help_text}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};
