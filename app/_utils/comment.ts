// app/_utils/comment.ts

import { User } from "@/app/_utils/user";
import { Article } from "@/app/_utils/article";
import { Photo } from "@/app/_utils/photo";

export type Comment = {
  commentText: string;
  user: User;
  article?: Article;
  photo?: Photo;
};
