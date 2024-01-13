// app/[lang]/user.ts

export type User = {
  username: string;
  name: string;
  email: string;
  image: string;
  articles: [];
  comments: [];
  likes: [];
  followers: [];
  followings: [];
};

export async function getUser(unique: string): Promise<User> {
  const response = await fetch(`/api/users/${unique}`, {
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
