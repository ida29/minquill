// app/[lang]/top/page.tsx

"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getDictionary, Dictionary } from "@/app/_utils/dictionary";
import { HomePageBody } from "@/app/_components/home_page_body";

export default function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [dict, setDict] = useState<Dictionary>({});

  useEffect(() => {
    (async () => {
      const dict = await getDictionary(lang);
      setDict(dict);
    })();
  }, [lang]);

  return <HomePageBody dict={dict} />;
}
