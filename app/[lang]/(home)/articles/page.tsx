// app/[lang]/(home)/articles/page.tsx

import React from "react";
import { getDictionary } from "@/app/_utils/dictionary";
import { HomePageBody } from "@/app/_components/home_page_body";
import { getArticlesByUsername, Article } from "@/app/_utils/article";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  const articles: Article[] = await getArticlesByUsername("", 20, "desc", 0);
  return <HomePageBody dict={dict} articles={articles} tags={[]} />;
}
