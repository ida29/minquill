// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { ArticlePage } from "@/app/_components/article_page";
import { getArticle, Article } from "@/app/_utils/article";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { User } from "@/app/_utils/user";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  const session = await getServerSession(auth);
  const article: Article = await getArticle(unique);

  if (!session || !session.user) {
    return <ArticlePage dict={dict} article={article} />;
  }

  const user: User = {
    id: session.user.id,
    username: session.user.username,
    name: session.user.name,
    email: session.user.email as string,
    image: session.user.image,
    articles: [],
    photos: [],
    comments: [],
    likes: [],
    followers: [],
    followings: [],
  };

  const isLikedByUser = article.likes?.some(
    (like) => like.userId === session.user?.id,
  ) as boolean;

  return (
    <ArticlePage
      dict={dict}
      article={article}
      user={user}
      isLikedByUser={isLikedByUser}
    />
  );
}
