// app/_utils/article.ts

import { User } from "@/app/_utils/user";
import { Comment } from "@/app/_utils/comment";
import { Like } from "@/app/_utils/like";
import { nGram } from "n-gram";
import { Tag } from "@/app/_utils/tag";
//import moji from "moji";

export type Article = {
  title: string;
  content: string;
  authorId?: string;
  author?: User;
  ulid?: string;
  coverImg?: string;
  likes?: Like[];
  comments?: Comment[];
  tags?: Tag[];
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
  username: string = "",
  count: number = 20,
  order: string = "desc",
  page: number = 1,
  tags: string[] = [],
): Promise<Article[]> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  username !== "" ? url.searchParams.append("username", username) : null;
  url.searchParams.append("count", count.toString());
  url.searchParams.append("order", order);
  url.searchParams.append("page", page.toString());
  tags.length > 0 ? url.searchParams.append("tags", tags.join(",")) : null;

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
  const url = new URL(
    `/api/articles/${unique}`,
    process.env.NEXT_PUBLIC_WEBSITE_URL,
  );
  const response = await fetch(url.toString(), {
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
      tags: newArticle.tags?.map((tag) => tag.name),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save article: ${response.statusText}`);
  }

  const article: Article = await response.json();
  return article;
}

export async function createArticle(newArticle: Article): Promise<Article> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  const response = await fetch(url.toString(), {
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
): Promise<Article[]> {
  const url = new URL("/api/articles", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append("mode", "recommended");
  url.searchParams.append("count", count.toString());

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
