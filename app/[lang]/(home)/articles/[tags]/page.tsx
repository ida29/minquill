// app/[lang]/(home)/articles/[tags]/page.tsx

import React from "react";
import { getDictionary } from "@/app/_utils/dictionary";
import { HomePageBody } from "@/app/_components/home_page_body";
import { getArticlesByUsername, Article } from "@/app/_utils/article";

export default async function App({
  params: { lang, tags },
}: {
  params: { lang: string; tags: string };
}) {
  const dict = await getDictionary(lang);
  const tagsArr = (tags as string)?.split(",").map((part) => part.trim());
  const articles: Article[] = await getArticlesByUsername(
    "",
    20,
    "desc",
    0,
    tagsArr,
  );
  return <HomePageBody dict={dict} articles={articles} tags={tagsArr} />;
}
