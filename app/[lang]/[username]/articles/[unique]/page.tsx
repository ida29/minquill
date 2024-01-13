// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { ArticlePageWrapper } from "@/app/_components/article_page_wrapper";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  return <ArticlePageWrapper dict={dict} username={username} unique={unique} />;
}
