// app/[lang]/auth/signin
import { cva, css } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { getDictionary } from "@/app/[lang]/dictionary";
import { CloudflareImage } from "@/components/cloudflare_image";

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
        <CloudflareImage
          src="a717cf59-f0ef-409a-d96b-904475a64c00"
          alt="LowPoly Mage Image"
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
          variants="public"
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
