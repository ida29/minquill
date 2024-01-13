// components/home_page_body.tsx
"use client";

import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";
import {
  getArticlesWithToken,
  getRecommendedArticles,
  Article,
} from "@/app/_utils/article";
import { useState, useEffect, useMemo } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";

export const HomePageBody = (params: { dict: Dictionary }) => {
  const [articlesValue, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tags = useMemo(() => ["Tips", "Review", "Painting Guide"], []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const articles: Article[] = await getRecommendedArticles(20, tags);
        setArticles(articles);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tags]);

  const handleSubmit = async (token: string) => {
    setIsLoading(true);
    try {
      const articles: Article[] =
        token === ""
          ? await getRecommendedArticles(20, tags)
          : await getArticlesWithToken(token, 30);
      setArticles(articles);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    handleSubmit((e.target as HTMLInputElement).value);
  };

  return (
    <main
      className={css({
        paddingTop: "4.4rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <ul
          className={css({
            display: "flex",
            color: "text1",
            fontWeight: "700",
            fontSize: "1rem",
            lineHeight: "1",
            marginTop: "3rem",

            padding: "0 1rem",
            gap: "0 2rem",
            sm: { fontSize: "1.2rem", gap: "0 4rem" },
            md: { fontSize: "1.4rem", gap: "0 6rem" },
            lg: { fontSize: "1.6rem", gap: "0 8rem" },
          })}
        >
          <Link href={`/articles`}>
            <li className={`${liStyle()} ${activeTab()}`}>Articles</li>
          </Link>
          <Link href={`/images`}>
            <li className={`${liStyle()}`}>Images</li>
          </Link>
        </ul>
        <div
          className={css({
            display: "flex",
            gap: "1rem",
            width: "100%",
          })}
        >
          <input
            type="search"
            id="full-text-search"
            name="full-text-search"
            onKeyDown={handleKeyDown}
            placeholder={params.dict.full_text_search_placeholder}
            autoComplete="off"
            className={css({
              color: "text1",
              bg: "bg3",
              textIndent: "1rem",
              borderRadius: "10px",
              width: "100%",
              fontWeight: "700",
              outline: "none",
              padding: "1rem 0.4rem 0.6rem 0",
              transition: "all 0.1s",
              fontSize: "1.4rem",
              margin: "3rem .5rem 1rem .5rem",
              border: "4px solid white",
              _focus: {
                border: "4px solid black",
              },
              sm: {
                fontSize: "1.4rem",
              },
              md: {
                fontSize: "1.6rem",
              },
              lg: {
                fontSize: "1.8rem",
              },
            })}
          />
        </div>
      </div>
      {articlesValue.length > 0 && !isLoading
        ? tags.map((tagName) => (
            <div key={tagName}>
              {articlesValue.filter(
                (article) =>
                  article.tags?.some(
                    (tag: { name: string }) => tag.name === tagName,
                  ),
              ).length > 0 && (
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3rem",
                  })}
                >
                  <h2
                    className={css({
                      fontSize: "2rem",
                      marginLeft: ".1rem",
                    })}
                  >
                    <strong>#{tagName}</strong>
                  </h2>
                </div>
              )}
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  margin: "0 .2rem",
                  gap: ".2rem",
                  sm: { gap: ".3rem" },
                  md: { gap: ".4rem" },
                  lg: { gap: ".5rem" },
                })}
              >
                {articlesValue
                  .filter(
                    (article) =>
                      article.tags?.some(
                        (tag: { name: string }) => tag.name === tagName,
                      ),
                  )
                  .concat([...Array(5)])
                  .slice(0, 5)
                  .map((article, index) =>
                    article ? (
                      <Link
                        key={index}
                        href={`/${article.authorId}/articles/${article.ulid}`}
                      >
                        <article
                          className={css({
                            fontWeight: "700",
                            margin: ".4rem",
                            borderRadius: "10px",
                            bg: "bg3",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s",
                            _hover: {
                              transform: "scale(1.05)",
                            },
                          })}
                        >
                          <div
                            className={css({
                              position: "relative",
                              width: "100%",
                              paddingTop: "60%",
                            })}
                          >
                            <Image
                              width="200"
                              height="200"
                              src={article.coverImg || ""}
                              alt="Cover Image"
                              className={css({
                                borderRadius: "10px 10px 0 0",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                objectFit: "cover",
                                objectPosition: "center",
                              })}
                            />
                          </div>
                          <div
                            className={css({
                              padding: ".8rem",
                            })}
                          >
                            <div
                              className={css({
                                height: "2rem",
                                fontSize: "1rem",
                              })}
                            >
                              {article?.title}
                            </div>
                            <div
                              className={css({
                                display: "-webkit-box",
                                boxOrient: "vertical",
                                WebkitLineClamp: "3",
                                overflow: "hidden",
                                height: "3.6rem",
                                fontSize: ".8rem",
                                marginBottom: ".5rem",
                                color: "text3",
                              })}
                            >
                              {article?.content}
                            </div>
                            <div
                              className={css({
                                display: "flex",
                                justifyContent: "flex-start",
                                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                              })}
                            >
                              <ul
                                id="reactions"
                                className={css({
                                  display: "flex",
                                  gap: "1rem",
                                  padding: ".5rem 0",
                                })}
                              >
                                <li>
                                  <div
                                    className={css({
                                      display: "flex",
                                      gap: ".2rem",
                                    })}
                                  >
                                    <FiThumbsUp
                                      className={css({
                                        fontSize: "1.5rem",
                                      })}
                                    />
                                    {article?.likes?.length}
                                  </div>
                                </li>
                                <li>
                                  <div
                                    className={css({
                                      display: "flex",
                                      gap: ".2rem",
                                    })}
                                  >
                                    <FiMessageSquare
                                      className={css({
                                        fontSize: "1.5rem",
                                      })}
                                    />
                                    {article?.comments?.length}
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div
                              className={css({
                                display: "flex",
                                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                                paddingTop: ".5rem",
                                alignItems: "center",
                              })}
                            >
                              <Image
                                width="40"
                                height="40"
                                src={article.author?.image || ""}
                                alt="User Image"
                                className={css({
                                  borderRadius: "50%",
                                  marginRight: ".5rem",
                                })}
                              />
                              <div
                                className={css({
                                  display: "flex",
                                  flexDirection: "column",
                                })}
                              >
                                <p>{article?.author?.name}</p>
                                <p>{article?.author?.username}</p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ) : (
                      <div key={`dummy-${index}`}></div>
                    ),
                  )}
              </div>
            </div>
          ))
        : tags.map((tagName) => (
            <div key={tagName}>
              <div
                className={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3rem",
                  sm: {
                    marginTop: "4rem",
                  },
                  md: {
                    marginTop: "5rem",
                  },
                  lg: {
                    marginTop: "6rem",
                  },
                })}
              >
                <h2
                  className={css({
                    fontSize: "2rem",
                    marginLeft: ".1rem",
                  })}
                >
                  <strong>Loading...</strong>
                </h2>
              </div>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                })}
              >
                {
                  // skelton screen
                  [...Array(5)].map((_, index) => (
                    <Link key={index} href="javascript:void(0)">
                      <article
                        className={css({
                          fontWeight: "700",
                          margin: "1rem",
                          borderRadius: "10px",
                          bg: "white",
                        })}
                      >
                        <div
                          className={css({
                            position: "relative",
                            width: "100%",
                            paddingTop: "50%",
                          })}
                        >
                          <div
                            className={css({
                              bg: "rgba(0, 0, 0, 0.1)",
                              borderRadius: "10px 10px 0 0",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              objectFit: "cover",
                              objectPosition: "center",
                            })}
                          ></div>
                        </div>
                        <div
                          className={css({
                            borderRadius: "10px 10px 0 0",
                            width: "100%",
                          })}
                        ></div>
                        <div
                          className={css({
                            padding: ".8rem",
                          })}
                        >
                          <div
                            className={css({
                              borderRadius: "10px",
                              width: "50%",
                              height: "1rem",
                              margin: "0.3rem 0",
                              bg: "rgba(0, 0, 0, 0.1)",
                            })}
                          ></div>
                          <ul
                            id="reactions"
                            className={css({
                              display: "flex",
                              gap: "0.5rem",
                            })}
                          >
                            <li>
                              <FiThumbsUp
                                className={css({
                                  fontSize: "1.5rem",
                                })}
                              />
                            </li>
                            <li>0</li>
                            <li>
                              <FiMessageSquare
                                className={css({
                                  fontSize: "1.5rem",
                                })}
                              />
                            </li>
                            <li>0</li>
                          </ul>
                        </div>
                      </article>
                    </Link>
                  ))
                }
              </div>
            </div>
          ))}
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        })}
      >
        <Image
          src="/lowpoly_whiz.png"
          alt="LowPoly Mage Image"
          width="250"
          height="250"
          className={css({
            margin: "1rem 0 2rem 0",
          })}
        />
      </div>
    </main>
  );
};

const liStyle = cva({
  base: {
    paddingBottom: "0.8rem",
    listStyle: "none",
  },
});

const activeTab = cva({
  base: {
    borderBottom: "4px solid",
    color: "text1",
  },
});
