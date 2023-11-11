// app/[lang]/auth/signin
import { cva, css } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { getDictionary } from "@/app/[lang]/dictionary";
import Image from "next/image";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className={mainStyle()}>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        })}
      >
        <Image
          src="/lowpoly_whiz.png"
          alt="LowPoly Mage Image"
          width="400"
          height="400"
          className={css({
            width: "50%",
            //marginLeft: "auto",
            alignSelf: "center",
            marginTop: "1.6rem",
            sm: { width: "40%" },
            md: { width: "30%" },
            lg: { width: "20%" },
            padding: "0 1rem 1rem 0",
          })}
        />
        <SigninWithGoogleBtn text={dict.sign_in_with_google} />
      </div>
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "1rem 0.3rem 2rem 0.3rem",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw", padding: "1rem 0rem 2rem 0rem" },
    md: { width: "95vw", padding: "1rem 2rem 2rem 2rem" },
    lg: { width: "90vw", padding: "1rem 2rem 2rem 2rem" },
  },
});
