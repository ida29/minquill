// app/[lang]/post.ts
export type Post = {
  title: string;
  content: string;
};

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

export async function savePost(newPost: Post): Promise<Post> {
  const response = await fetch("/api/posts", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPost.title,
      content: newPost.content.slice(0, 2000),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save post: ${response.statusText}`);
  }

  const post: Post = await response.json();
  return post;
}
