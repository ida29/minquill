// app/[lang]/(home)/articles/page.tsx

import React from "react";
import { getDictionary } from "@/app/_utils/dictionary";
import { HomePageBody } from "@/app/_components/home_page_body";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <HomePageBody dict={dict} />;
}
