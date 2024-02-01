// app/_utils/article.ts

import { User } from "@/app/_utils/user";
import { nGram } from "n-gram";
//import moji from "moji";

export type Article = {
  title: string;
  content: string;
  authorId?: string;
  author?: User;
  ulid?: string;
  coverImg?: string;
  likes?: [];
  comments?: [];
  tags?: [];
};

export async function getArticle(unique: string): Promise<Article> {
  const url = new URL(
    `/api/articles/${unique}`,
    process.env.NEXT_PUBLIC_WEBSITE_URL,
  );
  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get articles: ${response.statusText}`);
  }

  const article: Article = await response.json();
  return article;
}

export async function getArticles(): Promise<Article[]> {
  const url = new URL(`/api/articles`, process.env.NEXT_PUBLIC_WEBSITE_URL);
  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get articles: ${response.statusText}`);
  }

  const articles: Article[] = await response.json();
  return articles;
}

export async function getArticlesByUsername(
  username: string,
  count?: number,
  order?: string,
  page?: number,
): Promise<Article[]> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append("username", username);
  url.searchParams.append("count", count ? count.toString() : "20");
  url.searchParams.append("order", order ? order : "desc");
  url.searchParams.append("page", page ? page.toString() : "1");

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get articles: ${response.statusText}`);
  }

  const articles: Article[] = await response.json();
  return articles;
}

export async function updateArticle(
  newArticle: Article,
  unique: string,
): Promise<Article> {
  const response = await fetch(`/api/articles/${unique}`, {
    method: "Article",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newArticle.title,
      tokenizedTitle: nGram(3)(
        newArticle.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      content: newArticle.content.slice(0, 2000),
      tokenizedContent: nGram(3)(
        newArticle.content.toString() + "a".repeat(3 - 1),
      ).join(" "),
      coverImg: newArticle.coverImg,
      tags: newArticle.tags,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save article: ${response.statusText}`);
  }

  const article: Article = await response.json();
  return article;
}

export async function createArticle(newArticle: Article): Promise<Article> {
  const response = await fetch("/api/articles", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newArticle.title,
      tokenizedTitle: nGram(3)(
        newArticle.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      content: newArticle.content.slice(0, 2000),
      tokenizedContent: nGram(3)(
        newArticle.content.toString() + "a".repeat(3 - 1),
      ).join(" "),
      coverImg: newArticle.coverImg,
      tags: newArticle.tags,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save article: ${response.statusText}`);
  }

  const article: Article = await response.json();
  return article;
}

export async function getRecommendedArticles(
  count: number,
  tags: string[],
): Promise<Article[]> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append("mode", "tags");
  url.searchParams.append("count", count.toString());
  tags.forEach((tag) => {
    url.searchParams.append("tags", tag);
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get articles: ${response.statusText}`);
  }

  const articles: Article[] = await response.json();
  return articles;
}

export async function getArticlesWithToken(
  token: string,
  count: number,
): Promise<Article[]> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append(
    "token",
    token.length > 2 ? nGram(3)(token).join("* | ") + "*" : token + "*",
  );
  url.searchParams.append("count", count.toString());
  url.searchParams.append("mode", "fulltext");

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get articles: ${response.statusText}`);
  }

  const articles: Article[] = await response.json();
  return articles;
}
