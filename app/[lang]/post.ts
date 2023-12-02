// app/[lang]/post.ts
export type Post = {
  title: string;
  content: string;
  authorId?: string;
  ulid?: string;
  coverImg?: string;
  likes?: [];
  comments?: [];
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

export async function savePost(newPost: Post): Promise<Post> {
  const response = await fetch("/api/posts", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPost.title,
      content: newPost.content.slice(0, 2000),
      coverImg: newPost.coverImg,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save post: ${response.statusText}`);
  }

  const post: Post = await response.json();
  return post;
}

export async function getRecommendedPosts(count: number): Promise<Post[]> {
  const url = new URL("/api/posts", window.location.origin);
  url.searchParams.append("count", count.toString());

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
