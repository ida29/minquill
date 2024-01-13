// app/[lang]/auth/signin
import { cva, css } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/app/_components/sign_in_with_google_btn";
import { getDictionary } from "@/app/_utils/dictionary";

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
        <SigninWithGoogleBtn text={dict.sign_in_with_google} />
      </div>
    </div>
  );
}

const mainStyle = cva({
  base: {
    bg: "bg1",
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
