// app/[lang]/posts/new/page.tsx

import { EditorHeader } from "@/app/[lang]/components/editor_header";
import { EditorBody } from "@/app/[lang]/components/editor_body";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/[lang]/utils/dictionary";
import { css } from "@/styled-system/css";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(auth);
  const dict = await getDictionary(lang);

  if (!session) {
    return redirect("/auth/signin");
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
        <EditorBody
          dict={dict}
          username={session.user ? session.user.username : ""}
        />
      </div>
    </div>
  );
}
