// app/_utils/photo.ts

import { User } from "@/app/_utils/user";
import { Comment } from "@/app/_utils/comment";
import { nGram } from "n-gram";

export type Photo = {
  title: string;
  url: string;
  photographerId?: string;
  photographer?: User;
  ulid?: string;
  likes?: [];
  comments?: Comment[];
  tags?: [];
};

export async function getPhoto(unique: string): Promise<Photo> {
  const response = await fetch(`/api/photos/${unique}`, {
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

export async function createPhoto(newPhoto: Photo): Promise<Photo> {
  const response = await fetch("/api/photos", {
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

export async function getRecommendedPhotos(
  count: number,
  tags: string[],
): Promise<Photo[]> {
  const url = new URL("/api/photos", window.location.origin);
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
    throw new Error(`Failed to get photos: ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();
  return photos;
}

export async function getPhotosWithToken(
  token: string,
  count: number,
): Promise<Photo[]> {
  const url = new URL("/api/photos", window.location.origin);
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
