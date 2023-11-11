// app/[lang]/posts/new/page.tsx
import { EditorHeader } from "@/components/editor_header";
import { EditorBody } from "@/components/editor_body";
import { cva } from "@/styled-system/css";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionary";

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
    <div className={mainStyle()}>
      <EditorHeader /*dict={dict}*/ />
      <EditorBody dict={dict} />
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "0 0.3rem 2rem 0.3rem",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw", padding: "0 0rem 2rem 0rem" },
    md: { width: "95vw", padding: "0 2rem 2rem 2rem" },
    lg: { width: "90vw", padding: "0 2rem 2rem 2rem" },
  },
});
