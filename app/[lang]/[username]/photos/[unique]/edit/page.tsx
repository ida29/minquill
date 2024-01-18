// app/[lang]/[username]/photos/[unique]/edit/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
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

  return <>app/[lang]/[username]/photos/[unique]/edit/page.tsx</>;
}
