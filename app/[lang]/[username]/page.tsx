// app/[lang]/[username]/page.tsx

import { UserPageWrapper } from "@/app/_components/user_page_wrapper";
import { getDictionary } from "@/app/_utils/dictionary";
import { getUser, User } from "@/app/_utils/user";

export default async function App({
  params: { lang, username },
}: {
  params: { lang: string; username: string };
}) {
  const dict = await getDictionary(lang);
  const user = await getUser(username);
  return <UserPageWrapper dict={dict} user={user} />;
}
