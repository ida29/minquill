// app/[lang]/[username]/images/[unique]/edit/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  return <>app/[lang]/[username]/images/[unique]/edit/page.tsx</>;
}
