// app/[lang]/[username]/articles/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { ArticlePageWrapper } from "@/app/_components/article_page_wrapper";
import { getArticle, Article } from "@/app/_utils/article";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  const article: Article = await getArticle(unique);
  return <ArticlePageWrapper dict={dict} article={article} />;
}
