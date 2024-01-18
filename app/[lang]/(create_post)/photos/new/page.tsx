// app/[lang]/photos/new/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { NewPhoto } from "@/app/_components/new_photo";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <NewPhoto dict={dict} />;
}
