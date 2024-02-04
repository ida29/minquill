// app/[lang]/page.tsx

import { LandingPageHeader } from "@/app/_components/landing_page_header";
import { LandingPageBody } from "@/app/_components/landing_page_body";
import { cva } from "@/styled-system/css";
import React from "react";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/_utils/dictionary";
import { redirect } from "next/navigation";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(auth);
  const dict = await getDictionary(lang);

  if (!session) {
    return (
      <div className={mainStyle()}>
        <LandingPageHeader dict={dict} />
        <LandingPageBody dict={dict} />
      </div>
    );
  }

  return redirect("/articles");
}

const mainStyle = cva({
  base: {
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw" },
    md: { width: "95vw" },
    lg: { width: "90vw" },
  },
});
