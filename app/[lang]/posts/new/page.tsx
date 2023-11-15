// app/[lang]/posts/new/page.tsx
import { EditorWrapper } from "@/components/editor_wrapper";
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
      <EditorWrapper
        dict={dict}
        username={session.user ? session.user.username : ""}
      />
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "0 0.3rem 1rem 0.3rem",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw", padding: "0 0rem 1rem 0rem" },
    md: { width: "95vw", padding: "0 2rem 1rem 2rem" },
    lg: { width: "90vw", padding: "0 2rem 1rem 2rem" },
  },
});
