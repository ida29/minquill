// app/[lang]/user.ts

export type User = {
  username: string;
  name: string;
  email: string;
  image: string;
  articles: [];
  photos: [];
  comments: [];
  likes: [];
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
