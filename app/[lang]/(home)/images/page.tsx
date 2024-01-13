// app/[lang]/(home)/images/page.tsx

"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getDictionary, Dictionary } from "@/app/_utils/dictionary";
import { HomePageBody2 } from "@/app/_components/home_page_body2";

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

  return <HomePageBody2 dict={dict} />;
}
