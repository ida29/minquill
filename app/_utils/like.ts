// app/_utils/like.ts

export type Like = {
  userId: string;
  articleId?: string;
  photoId?: string;
  commentId?: string;
  createdAt: Date;
};
