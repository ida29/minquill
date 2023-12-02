// app/[lang]/[username]/page.tsx
import { cva } from "@/styled-system/css";
import { UserPageWrapper } from "@/components/user_page_wrapper";
import { getDictionary } from "@/app/[lang]/dictionary";

export default async function App({
  params: { lang, username },
}: {
  params: { lang: string; username: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className={mainStyle()}>
      <UserPageWrapper dict={dict} username={username} />
    </div>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "0 0.3rem 1rem 0.3rem",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    width: "100vw",
    sm: { width: "100vw", padding: "0 0rem 2rem 0rem" },
    md: { width: "95vw", padding: "0 2rem 2rem 2rem" },
    lg: { width: "90vw", padding: "0 2rem 2rem 2rem" },
  },
});
