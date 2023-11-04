// app/page.tsx
import { HomePageHeader } from "@/components/home_page_header";
import { LandingPageHeader } from "@/components/landing_page_header";
import { CloudflareImage } from "@/components/cloudflare_image";
import { css, cva } from "@/styled-system/css";
import React from "react";
//import { getDictionary } from "@/app/[lang]/dictionary";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  //const dict = await getDictionary(lang);
  const session = await getServerSession(auth);

  if (session) {
    return (
      <main className={mainStyle()}>
        <HomePageHeader lang={lang} />
        <div className={div1Style()}>
          <div className={div2Style()}>
            <div
              className={css({
                font: "600 2rem/1 futura",
              })}
            ></div>
          </div>
        </div>
        <div className={div1Style({ color: "secondary" })}></div>
        <div className={div1Style()}></div>
      </main>
    );
  } else {
    return (
      <main className={mainStyle()}>
        <LandingPageHeader lang={lang} />
        <div className={div1Style()}>
          <div className={div2Style()}>
            <div
              className={css({
                font: "600 2rem/1 futura",
              })}
            ></div>
            <CloudflareImage
              src="a717cf59-f0ef-409a-d96b-904475a64c00"
              alt="LowPoly Mage Image"
              className={css({
                width: "50%",
                marginLeft: "auto",
                alignSelf: "center",
              })}
            />
          </div>
        </div>
        <div className={div1Style({ color: "secondary" })}></div>
        <div className={div1Style()}></div>
      </main>
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

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    height: "100vh",
    bg: "lightslategrey",
    display: "flex",
    justifyContent: "center",
    borderTop: "3px solid black",
  },
  variants: {
    color: {
      primary: { bg: "lightslategrey" },
      secondary: { bg: "white" },
    },
  },
});

const div2Style = cva({
  base: {
    display: "flex",
    justifyContent: "space-between",
    padding: "3rem",
    alignItems: "flex-start",
    width: "1200px",
  },
});
