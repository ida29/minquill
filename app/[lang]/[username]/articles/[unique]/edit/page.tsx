// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { EditArticleHeader } from "@/app/_components/edit_article_header";
import { EditArticleBody } from "@/app/_components/edit_article_body";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  const session = await getServerSession(auth);

  if (!session) {
    return redirect("/");
  }

  if (username !== session.user?.username) {
    return redirect("/");
  }

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
        <EditArticleHeader dict={dict} username={username} />
        <EditArticleBody dict={dict} username={username} unique={unique} />
      </div>
    </div>
  );
}
