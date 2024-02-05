// app/[lang]/user.ts

import { Article } from "@/app/_utils/article";
import { Photo } from "@/app/_utils/photo";
import { Comment } from "@/app/_utils/comment";
import { Like } from "@/app/_utils/like";

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  articles: Article[];
  photos: Photo[];
  comments: Comment[];
  likes: Like[];
  followers: [];
  followings: [];
};

export async function getUser(unique: string): Promise<User> {
  const url = new URL(
    `/api/users/${unique}`,
    process.env.NEXT_PUBLIC_WEBSITE_URL,
  );
  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user: ${response.statusText}`);
  }

  const user: User = await response.json();
  return user;
}
