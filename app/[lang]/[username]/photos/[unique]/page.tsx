// app/[lang]/[username]/photos/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { PhotoPage } from "@/app/_components/photo_page";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  return <PhotoPage dict={dict} username={username} unique={unique} />;
}
