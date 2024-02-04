// app/[lang]/articles/new/page.tsx

import { EditorHeader } from "@/app/_components/editor_header";
import { EditorBody } from "@/app/_components/editor_body";
import { css } from "@/styled-system/css";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/_utils/dictionary";
import { redirect } from "next/navigation";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(auth);
  const dict = await getDictionary(lang);

  if (!session) {
    return redirect("/articles");
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
        <EditorHeader dict={dict} />
        <EditorBody dict={dict} />
      </div>
    </div>
  );
}
