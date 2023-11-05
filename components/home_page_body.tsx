// components/home_page_body.tsx
import { css, cva } from "@/styled-system/css";
import { getDictionary } from "@/app/[lang]/dictionary";
//import { getServerSession } from "next-auth";
//import { auth } from "@/app/auth";

export const HomePageBody = async (params: { lang: string }) => {
  const dict = await getDictionary(params.lang);
  //const session = await getServerSession(auth);

  return (
    <main>
      <div className={div1Style({ color: "secondary" })}>
        <div className={div2Style()}>
          <div
            className={css({
              width: "20%",
              height: "100%",
              fontFamily: "futura",
            })}
          >
            {dict.start}
          </div>
          <div
            className={css({
              width: "50%",
              height: "100%",
              fontFamily: "futura",
            })}
          >
            posts
          </div>
          <div
            className={css({
              width: "30%",
              height: "100%",
              fontFamily: "futura",
            })}
          >
            some..
          </div>
        </div>
      </div>
    </main>
  );
};

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
    padding: "0 3rem 0 3rem",
    width: "1200px",
  },
});
