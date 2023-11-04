// app/[lang]/auth/signin
import { cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { getDictionary } from "@/app/[lang]/dictionary";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <main className={mainStyle()}>
      <SigninWithGoogleBtn text={dict.sign_in_with_google} />
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
