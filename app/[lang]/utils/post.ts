// app/[lang]/post.ts

import { User } from "@/app/[lang]/utils/user";
import { nGram } from "n-gram";
//import moji from "moji";

export type Post = {
  title: string;
  content: string;
  authorId?: string;
  author: User;
  ulid?: string;
  coverImg?: string;
  likes?: [];
  comments?: [];
  tags?: [];
};

export async function getPost(unique: string): Promise<Post> {
  const response = await fetch(`/api/posts/${unique}`, {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get posts: ${response.statusText}`);
  }

  const post: Post = await response.json();
  return post;
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts", {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get posts: ${response.statusText}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByUsername(
  username: string,
  count: number,
  order: string,
): Promise<Post[]> {
  const url = new URL("/api/posts", window.location.origin);
  url.searchParams.append("username", username);
  url.searchParams.append("count", count.toString());
  url.searchParams.append("order", order);

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get posts: ${response.statusText}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}

export async function updatePost(newPost: Post, unique: string): Promise<Post> {
  const response = await fetch(`/api/posts/${unique}`, {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPost.title,
      tokenizedTitle: nGram(3)(
        newPost.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      content: newPost.content.slice(0, 2000),
      tokenizedContent: nGram(3)(
        newPost.content.toString() + "a".repeat(3 - 1),
      ).join(" "),
      coverImg: newPost.coverImg,
      tags: newPost.tags,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save post: ${response.statusText}`);
  }

  const post: Post = await response.json();
  return post;
}

export async function createPost(newPost: Post): Promise<Post> {
  const response = await fetch("/api/posts", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPost.title,
      tokenizedTitle: nGram(3)(
        newPost.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      content: newPost.content.slice(0, 2000),
      tokenizedContent: nGram(3)(
        newPost.content.toString() + "a".repeat(3 - 1),
      ).join(" "),
      coverImg: newPost.coverImg,
      tags: newPost.tags,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save post: ${response.statusText}`);
  }

  const post: Post = await response.json();
  return post;
}

export async function getRecommendedPosts(
  count: number,
  tags: string[],
): Promise<Post[]> {
  const url = new URL("/api/posts", window.location.origin);
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
    throw new Error(`Failed to get posts: ${response.statusText}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsWithToken(
  token: string,
  count: number,
): Promise<Post[]> {
  const url = new URL("/api/posts", window.location.origin);
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
    throw new Error(`Failed to get posts: ${response.statusText}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}
