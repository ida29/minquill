// app/page.tsx
import { HomePageHeader } from "@/components/home_page_header";
import { HomePageBody } from "@/components/home_page_body";
import { LandingPageHeader } from "@/components/landing_page_header";
import { CloudflareImage } from "@/components/cloudflare_image";
import { css, cva } from "@/styled-system/css";
import React from "react";
import { getDictionary } from "@/app/[lang]/dictionary";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { LoginBtn } from "@/components/login_btn";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
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
        <main>
          <div className={div1Style()}>
            <div className={div2Style()}>
              <div
                className={css({
                  font: "600 2rem/1 futura",
                  width: "60%",
                  alignSelf: "center",
                })}
              >
                <section>
                  <div className={css({})}>
                    <h1
                      className={css({
                        width: "100%",
                        font: "600 4rem/1 futura",
                        paddingBottom: "2rem",
                      })}
                    >
                      <div
                        className={css({
                          font: "600 3rem/1 futura",
                          paddingBottom: "1rem",
                        })}
                      >
                        {dict.welcome_to_minquill}
                      </div>
                      {dict.grow_your_world_of_miniature_painting}
                    </h1>
                    <h2
                      className={css({
                        width: "100%",
                        fontSize: "1.6rem",
                        paddingBottom: "2rem",
                      })}
                    >
                      {
                        dict.publish_your_miniature_images_posts_and_share_your_painting_knowledge
                      }
                      <br />
                    </h2>
                    <div
                      className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      })}
                    >
                      <LoginBtn text={dict.signin} />
                    </div>
                  </div>
                </section>
              </div>
              <CloudflareImage
                src="a717cf59-f0ef-409a-d96b-904475a64c00"
                alt="LowPoly Mage Image"
                className={css({
                  width: "40%",
                  marginLeft: "auto",
                  alignSelf: "center",
                })}
                variants="public"
              />
            </div>
          </div>
          <div className={div1Style({ color: "secondary" })}>
            <ul>
              <li>
                <strong>投稿 & シェア</strong>:
                画像や記事を投稿し、知識を共有しましょう。
              </li>
              <li>
                <strong>価格設定</strong>:
                記事に任意の価格を設定して、収益を得ることもできます。
              </li>
              <li>
                <strong>コミュニティ参加</strong>:
                同じ興味を持つアーティストと繋がり、インスピレーションを得ましょう。
              </li>
            </ul>
          </div>
          <div className={div1Style()}></div>
        </main>
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

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    height: "80vh",
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
    padding: "3rem",
    width: "1200px",
  },
});
