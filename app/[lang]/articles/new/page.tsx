// app/[lang]/articles/new/page.tsx

import { NewArticle } from "@/app/_components/new_article";
import { css } from "@/styled-system/css";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/_utils/dictionary";
import { redirect } from "next/navigation";
import { User } from "@/app/_utils/user";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(auth);
  const dict = await getDictionary(lang);

  if (!session || !session.user) {
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
        <NewArticle dict={dict} user={user} />
      </div>
    </div>
  );
}
