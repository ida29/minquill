// app/[lang]/posts/new/page.tsx

import { EditorWrapper } from "@/components/editor_wrapper";
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
    <EditorWrapper
      dict={dict}
      username={session.user ? session.user.username : ""}
    />
  );
}
