// app/[lang]/[username]/page.tsx

import { UserPageWrapper } from "@/app/_components/user_page_wrapper";
import { getDictionary } from "@/app/_utils/dictionary";

export default async function App({
  params: { lang, username },
}: {
  params: { lang: string; username: string };
}) {
  const dict = await getDictionary(lang);
  return <UserPageWrapper dict={dict} username={username} />;
}
