// components/landing_page_body.tsx
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import Image from "next/image";
import { LoginBtn } from "@/components/login_btn";

export const LandingPageBody = async (params: { dict: Dictionary }) => {
  return (
    <main>
      <div className={div1Style()}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "100%",
              fontWeight: "700",
              fontSize: "2rem",
              lineHeight: "1",
              alignSelf: "center",
              sm: { width: "100%" },
              md: { width: "60%" },
              lg: { width: "60%" },
            })}
          >
            <section>
              <div className={css({})}>
                <h1
                  className={css({
                    width: "100%",
                  })}
                >
                  <div
                    className={css({
                      fontWeight: "700",
                      fontSize: "2rem",
                      lineHeight: "1",
                      margin: "1rem 0 1rem 0",
                      sm: { fontSize: "2.33rem" },
                      md: { fontSize: "2.66rem" },
                      lg: { fontSize: "3rem" },
                    })}
                  >
                    {params.dict.welcome_to_minquill}
                  </div>
                  <div
                    className={css({
                      width: "100%",
                      fontWeight: "700",
                      fontSize: "1.5rem",
                      lineHeight: "1",
                      margin: "0 0 2rem 0",
                      sm: { fontSize: "2rem" },
                      md: { fontSize: "2.5rem" },
                      lg: { fontSize: "3rem" },
                    })}
                  >
                    {params.dict.grow_your_world_of_miniature_painting}
                  </div>
                </h1>
                <h2
                  className={css({
                    width: "100%",
                    fontSize: "1rem",
                    paddingBottom: "2rem",
                    sm: { fontSize: "1.2rem" },
                    md: { fontSize: "1.4rem" },
                    lg: { fontSize: "1.6rem" },
                  })}
                >
                  {
                    params.dict
                      .publish_your_miniature_images_posts_and_share_your_painting_knowledge
                  }
                  <br />
                </h2>
                <div
                  className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 0 1rem 0",
                  })}
                >
                  <LoginBtn text={params.dict.signin} />
                </div>
              </div>
            </section>
          </div>
          <Image
            src="/lowpoly_whiz.png"
            alt="LowPoly Mage Image"
            width="400"
            height="400"
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
  );
};

const div1Style = cva({
  base: {
    margin: "0 calc(50% - 50vw)",
    height: "80wh",
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
    flexWrap: "wrap",
    padding: "0 1.5rem 0 1.5rem",
    width: "100vw",
    sm: { padding: "0 2rem 0 2rem", width: "100vw" },
    md: { padding: "0 2.5rem 0 2.5rem", width: "95vw" },
    lg: { padding: "0 3rem 0 3rem", width: "90vw" },
  },
});
