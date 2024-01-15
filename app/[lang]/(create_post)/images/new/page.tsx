// app/[lang]/images/new/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { NewImage } from "@/app/_components/new_image";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <NewImage dict={dict} />;
}
