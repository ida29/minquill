// app/[lang]/(home)/photos/page.tsx

import React from "react";
import { getDictionary } from "@/app/_utils/dictionary";
import { HomePageBody2 } from "@/app/_components/home_page_body2";
import { getPhotosByUsername, Photo } from "@/app/_utils/photo";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  const photos: Photo[] = await getPhotosByUsername("", 30, "desc", 0);
  return <HomePageBody2 dict={dict} photos={photos} />;
}
