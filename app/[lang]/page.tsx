// app/page.tsx
import { HomePageHeader } from "@/components/home_page_header";
import { HomePageBody } from "@/components/home_page_body";
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
      <HomePageHeader dict={dict} />
      <HomePageBody dict={dict} />
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "0 0.3rem 1rem 0.3rem",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw", padding: "0 0rem 1rem 0rem" },
    md: { width: "95vw", padding: "0 2rem 1rem 2rem" },
    lg: { width: "90vw", padding: "0 2rem 1rem 2rem" },
  },
});
