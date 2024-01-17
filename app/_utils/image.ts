// app/_utils/images.ts

import { User } from "@/app/_utils/user";
import { nGram } from "n-gram";

export type Image = {
  title: string;
  url: string;
  username?: string;
  user?: User;
  ulid?: string;
  likes?: [];
  comments?: [];
  tags?: [];
};

export async function createImage(newImage: Image): Promise<Image> {
  const response = await fetch("/api/images", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newImage.title,
      tokenizedTitle: nGram(3)(
        newImage.title.toString() + "a".repeat(3 - 1),
      ).join(" "),
      tags: newImage.tags,
      url: newImage.url,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save Image: ${response.statusText}`);
  }

  const Image: Image = await response.json();
  return Image;
}

export async function getRecommendedImages(
  count: number,
  tags: string[],
): Promise<Image[]> {
  const url = new URL("/api/images", window.location.origin);
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
    throw new Error(`Failed to get images: ${response.statusText}`);
  }

  const images: Image[] = await response.json();
  return images;
}

export async function getImagesWithToken(
  token: string,
  count: number,
): Promise<Image[]> {
  const url = new URL("/api/images", window.location.origin);
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
    throw new Error(`Failed to get images: ${response.statusText}`);
  }

  const images: Image[] = await response.json();
  return images;
}
