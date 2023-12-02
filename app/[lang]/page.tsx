// app/page.tsx
import { HomePageWrapper } from "@/components/home_page_wrapper";
import { LandingPageHeader } from "@/components/landing_page_header";
import { LandingPageBody } from "@/components/landing_page_body";
import { cva } from "@/styled-system/css";
import React from "react";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { getDictionary } from "@/app/[lang]/dictionary";

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
    <div className={mainStyle()}>
      <HomePageWrapper
        dict={dict}
        username={session.user ? session.user.username : ""}
      />
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw" },
    md: { width: "95vw" },
    lg: { width: "90vw" },
  },
});
