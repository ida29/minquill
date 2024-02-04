// app/[lang]/photos/new/page.tsx

import { NewPhoto } from "@/app/_components/new_photo";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/_utils/dictionary";
import { redirect } from "next/navigation";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  const session = await getServerSession(auth);

  if (!session) {
    return redirect("/articles");
  }

  return <NewPhoto dict={dict} />;
}
