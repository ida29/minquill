// app/page.tsx
import { HomePageWrapper } from "@/app/[lang]/components/home_page_wrapper";
import { LandingPageHeader } from "@/app/[lang]/components/landing_page_header";
import { LandingPageBody } from "@/app/[lang]/components/landing_page_body";
import { cva } from "@/styled-system/css";
import React from "react";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/[lang]/utils/dictionary";

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

  return (
    <HomePageWrapper
      dict={dict}
      username={session.user ? session.user.username : ""}
    />
  );
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
