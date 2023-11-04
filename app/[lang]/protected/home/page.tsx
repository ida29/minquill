// app/protected/home/page.tsx
import { HomePageHeader } from "@/components/home_page_header";
import { css, cva } from "@/styled-system/css";
//import Image, { ImageLoader } from "next/image";
//import Link from "next/link";
import React from "react";

//const cloudflareImagesLoader: ImageLoader = ({ src }) => {
//  return `https://imagedelivery.net/90UnnMaLhWJKCNGTLdt2Bg/${src}/public`;
//};

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <main className={mainStyle()}>
      <HomePageHeader lang={lang} />
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              font: "600 2rem/1 futura",
            })}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
              tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute
              iure reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint obcaecat cupiditat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          {
            //<Image
            //  src="a717cf59-f0ef-409a-d96b-904475a64c00"
            //  alt="LowPoly Mage Image"
            //  loader={cloudflareImagesLoader}
            //  width={0}
            //  height={0}
            //  className={css({
            //    width: "50%",
            //    marginLeft: "auto",
            //    alignSelf: "center",
            //  })}
            ///>
          }
        </div>
      </div>
      <div className={div1Style({ color: "secondary" })}></div>
      <div className={div1Style()}></div>
    </main>
  );
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
