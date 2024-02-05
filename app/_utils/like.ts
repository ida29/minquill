// app/_utils/like.ts

import { User } from "@/app/_utils/user";
import { Article } from "@/app/_utils/article";
import { Photo } from "@/app/_utils/photo";

export type Like = {
  user: User;
  article?: Article;
  photo?: Photo;
};
