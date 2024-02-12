// app/_components/Editor/PublishTab/index.tsx

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { YouTubeEmbed } from "@next/third-parties/google";
import "./styles.css";
import { User } from "@/app/_utils/user";
import { Article } from "@/app/_utils/article";
import { Tag } from "@/app/_utils/tag";
import Image from "next/image";
import Link from "next/link";
import HeartButton from "@/app/_components/heart_button";

export const PreviewTab = ({
  dict,
  userValue,
  handleLike,
  isLiked,
  likesCount,
  article,
}: {
  dict: Dictionary;
  userValue?: User;
  handleLike?: () => void;
  isLiked: boolean;
  likesCount: number;
  article: Article;
}) => {
  return (
    <>
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        })}
      >
        <div
          className={css({
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            bg: "bg2",
            md: { paddingTop: "calc(80vh - 4.4rem)" },
          })}
        >
          {article.coverImg && (
            <Image
              width="400"
              height="400"
              src={article.coverImg}
              alt="Cover Image"
              className={css({
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: "0.8",
                filter: "blur(3px)",
                top: "0",
                left: "0",
                objectFit: "cover",
                objectPosition: "center",
              })}
            />
          )}
          <div
            className={css({
              textAlign: "center",
              padding: "1rem 1rem .5rem 1rem",
              border: "6px solid",
              color: "text2",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontWeight: "700",
              fontSize: "2.2rem",
              overflowWrap: "break-word",
              width: "90%",
              sm: { fontSize: "2.4rem", width: "90%" },
              md: { fontSize: "2.6rem", width: "auto", maxWidth: "80%" },
              lg: { fontSize: "2.8rem", width: "auto", maxWidth: "80%" },
            })}
          >
            {article.title}
          </div>
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "flex-start",
          marginBottom: ".5rem",
          width: "90%",
          sm: { width: "80%" },
          md: { width: "80%" },
          lg: { width: "80%" },
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            bg: "bg3",
            width: "100%",
            padding: "1.6rem 2rem",
            borderRadius: "10px",
            gap: "2rem",
            marginTop: "1rem",
          })}
        >
          <div
            id="markdown-preview"
            className={css({
              borderRadius: "10px",
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
                h1: ({ node, ...props }) => (
                  <h1
                    id={node?.position?.start.line.toString()}
                    style={{ paddingTop: "4.4rem", marginTop: "-4.4rem" }}
                  >
                    <strong>{props.children}</strong>
                  </h1>
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    id={node?.position?.start.line.toString()}
                    style={{ paddingTop: "4.4rem", marginTop: "-4.4rem" }}
                  >
                    <strong>{props.children}</strong>
                  </h2>
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    id={node?.position?.start.line.toString()}
                    style={{ paddingTop: "4.4rem", marginTop: "-4.4rem" }}
                  >
                    <strong>{props.children}</strong>
                  </h3>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
          <div
            className={css({
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "1rem",
              color: "text3",
            })}
          >
            <div
              className={css({
                fontWeight: "700",
                padding: "calc(.1rem + 2px) 0",
              })}
            >
              {dict.tags}:
            </div>
            {article.tags &&
              article.tags.length > 0 &&
              article.tags.map((tag: Tag) => (
                <Link
                  key={tag.name}
                  href={`/articles/${tag.name}`}
                  className={css({
                    fontWeight: "700",
                    borderRadius: "9999px",
                    border: "2px solid",
                    padding: ".1rem .8rem",
                    boxShadow: "1px 1px 0",
                    _hover: {
                      color: "text4",
                    },
                  })}
                >
                  {tag.name}
                </Link>
              ))}
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              bg: "bg3",
              width: "100%",
              borderRadius: "10px",
              gap: "2rem",
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #ccc",
                width: "100%",
              })}
            >
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem 0",
                })}
              >
                <HeartButton
                  isLiked={isLiked}
                  onClick={handleLike ? handleLike : () => {}}
                />
                <div
                  className={css({
                    fontSize: "1rem",
                    color: "text3",
                  })}
                >
                  {likesCount}
                </div>
              </div>
            </div>
            <div
              className={css({
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                width: "100%",
              })}
            >
              <Link
                href={`/${article.author?.username}`}
                className={css({
                  display: "flex",
                  fontWeight: "700",
                  marginRight: ".5rem",
                  flexShrink: "0",
                  padding: ".5rem",
                  width: "100%",
                  justifyContent: "center",
                  sm: {
                    width: "auto",
                    justifyContent: "center",
                  },
                })}
              >
                {article.author && (
                  <Image
                    width="126"
                    height="126"
                    src={article.author.image}
                    alt="User Image"
                    className={css({
                      borderRadius: "50%",
                      marginRight: ".5rem",
                    })}
                  />
                )}
              </Link>
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  wordBreak: "break-word",
                  width: "100%",
                  sm: { width: "calc(100% - 126px - 2rem)" },
                })}
              >
                <p
                  className={css({
                    fontWeight: "700",
                    alignSelf: "center",
                    sm: { alignSelf: "auto" },
                  })}
                >
                  {article.author?.name}
                </p>
                <p>{dict.loren_ipsum}</p>
              </div>
            </div>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                width: "100%",
              })}
            >
              {dict.comments}:
              <div
                className={css({
                  display: "flex",
                  alignItems: "flex-start",
                  width: "100%",
                })}
              >
                <Link
                  href={`/${userValue?.username}`}
                  className={css({
                    display: "flex",
                    fontWeight: "700",
                    marginRight: ".5rem",
                    flexShrink: "0",
                    padding: ".5rem",
                    width: "100%",
                    justifyContent: "center",
                    sm: {
                      width: "auto",
                      justifyContent: "center",
                    },
                  })}
                >
                  {userValue && (
                    <Image
                      width="32"
                      height="32"
                      src={userValue?.image}
                      alt="User Image"
                      className={css({
                        borderRadius: "50%",
                        marginRight: ".5rem",
                      })}
                    />
                  )}
                </Link>
                <div className={css({})}></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={css({
            display: "none",
            lg: {
              display: "flex",
              flexDirection: "column",
              width: "40%",
              position: "sticky",
              top: "4.4rem",
              padding: "1rem 0 1rem 2rem",
            },
          })}
        >
          <div
            className={css({
              display: "flex",
              padding: "1rem",
              alignItems: "center",
              fontSize: "1rem",
              bg: "bg3",
              borderRadius: "10px",
              shadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
              sm: { fontSize: "1.2rem" },
            })}
          >
            <Link
              href={`/${article.author?.username}`}
              className={css({
                display: "flex",
                fontWeight: "700",
              })}
            >
              {article.author && (
                <Image
                  width="48"
                  height="48"
                  src={article.author?.image}
                  alt="User Image"
                  className={css({
                    borderRadius: "50%",
                    marginRight: ".5rem",
                  })}
                />
              )}
            </Link>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
              })}
            >
              <p>{article.author?.name}</p>
              <p>{article.author?.username}</p>
            </div>
          </div>
          <div
            className={css({
              bg: "bg3",
              borderRadius: "10px",
              marginTop: "1rem",
              padding: "1rem",
              shadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
            })}
          >
            <ReactMarkdown
              allowedElements={["h1", "h2", "h3"]}
              components={{
                h1: ({ node, ...props }) => (
                  <>
                    <a
                      href={"#" + node?.position?.start.line.toString()}
                      style={{ lineHeight: "1.6rem" }}
                    >
                      #{props.children}
                      <br />
                    </a>
                  </>
                ),
                h2: ({ node, ...props }) => (
                  <>
                    <a
                      href={"#" + node?.position?.start.line.toString()}
                      style={{ lineHeight: "1.6rem" }}
                    >
                      &nbsp;&nbsp;#{props.children}
                      <br />
                    </a>
                  </>
                ),
                h3: ({ node, ...props }) => (
                  <>
                    <a
                      href={"#" + node?.position?.start.line.toString()}
                      style={{ lineHeight: "1.6rem" }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;#{props.children}
                      <br />
                    </a>
                  </>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};
