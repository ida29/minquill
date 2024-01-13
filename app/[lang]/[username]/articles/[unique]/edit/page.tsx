// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { EditArticleHeader } from "@/app/_components/edit_article_header";
import { EditArticleBody } from "@/app/_components/edit_article_body";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

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
