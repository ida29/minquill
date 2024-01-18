// app/[lang]/[username]/photos/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  return <>app/[lang]/[username]/photos/[unique]/page.tsx</>;
}
