// app/[lang]/[username]/posts/[unique]/page.tsx

import { getDictionary } from "@/app/[lang]/utils/dictionary";
import { css } from "@/styled-system/css";
import { EditPostHeader } from "@/components/edit_post_header";
import { EditPostBody } from "@/components/edit_post_body";

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
        <EditPostHeader dict={dict} username={username} />
        <EditPostBody dict={dict} username={username} unique={unique} />
      </div>
    </div>
  );
}
