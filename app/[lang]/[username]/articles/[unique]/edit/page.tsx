// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { EditArticle } from "@/app/_components/edit_article";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getArticle, Article } from "@/app/_utils/article";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  const session = await getServerSession(auth);

  if (!session || !session.user) {
    return redirect("/articles");
  }

  if (username !== session.user?.username) {
    return redirect("/articles");
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

  const article: Article = await getArticle(unique);

  return (
    <div
      data-theme="normal"
      data-color-mode="light"
      className={css({
        overflow: "auto",
        bg: "bg1",
      })}
    >
      <div
        className={css({
          marginRight: "auto",
          marginLeft: "auto",
          height: "100vh",
          width: "100vw",
        })}
      >
        <EditArticle dict={dict} article={article} user={user} />
      </div>
    </div>
  );
}
