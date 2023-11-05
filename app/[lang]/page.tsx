// app/page.tsx
import { HomePageHeader } from "@/components/home_page_header";
import { HomePageBody } from "@/components/home_page_body";
import { LandingPageHeader } from "@/components/landing_page_header";
import { LandingPageBody } from "@/components/landing_page_body";
import { cva } from "@/styled-system/css";
import React from "react";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(auth);

  if (session) {
    return (
      <div className={mainStyle()}>
        <HomePageHeader lang={lang} />
        <HomePageBody lang={lang} />
      </div>
    );
  } else {
    return (
      <div className={mainStyle()}>
        <LandingPageHeader lang={lang} />
        <LandingPageBody lang={lang} />
      </div>
    );
  }
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "1rem 2rem 2rem 2rem",
    maxWidth: "1200px",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
  },
});
