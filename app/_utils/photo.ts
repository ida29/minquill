// app/_utils/photo.ts

import { User } from "@/app/_utils/user";
import { Comment } from "@/app/_utils/comment";
import { Like } from "@/app/_utils/like";
import { nGram } from "n-gram";

export type Photo = {
  title: string;
  url: string;
  photographerId?: string;
  photographer?: User;
  ulid?: string;
  likes?: Like[];
  comments?: Comment[];
  tags?: [];
};

export async function getPhoto(unique: string): Promise<Photo> {
  const url = new URL(
    `/api/photos/${unique}`,
    process.env.NEXT_PUBLIC_WEBSITE_URL,
  );
  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get photos: ${response.statusText}`);
  }

  const photo: Photo = await response.json();
  return photo;
}

export async function getPhotosByUsername(
  username?: string,
  count?: number,
  order?: string,
  page?: number,
): Promise<Photo[]> {
  const url = new URL("/api/photos", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append("username", username ? username : "");
  url.searchParams.append("count", count ? count.toString() : "20");
  url.searchParams.append("order", order ? order : "desc");
  url.searchParams.append("page", page ? page.toString() : "1");

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get photos: ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();
  return photos;
}

export async function createPhoto(newPhoto: Photo): Promise<Photo> {
  const url = new URL(`/api/photos`, process.env.NEXT_PUBLIC_WEBSITE_URL);
  const response = await fetch(url.toString(), {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPhoto.title,
      tokenizedTitle: nGram(3)(
        newPhoto.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      tags: newPhoto.tags,
      url: newPhoto.url,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save Photo: ${response.statusText}`);
  }

  const Photo: Photo = await response.json();
  return Photo;
}

export async function getRecommendedPhotos(count: number): Promise<Photo[]> {
  const url = new URL("/api/photos", process.env.NEXT_PUBLIC_WEBSITE_URL);
  url.searchParams.append("mode", "recommended");
  url.searchParams.append("count", count.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to get photos: ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();
  return photos;
}

export async function getPhotosWithToken(
  token: string,
  count: number,
): Promise<Photo[]> {
  const url = new URL("/api/photos", process.env.NEXT_PUBLIC_WEBSITE_URL);
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
    throw new Error(`Failed to get photos: ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();
  return photos;
}
