// app/[lang]/[username]/posts/[unique]/page.tsx
import { cva } from "@/styled-system/css";
import { getDictionary } from "@/app/[lang]/dictionary";
import { PostPageBody } from "@/components/post_page_body";
import { PostPageHeader } from "@/components/post_page_header";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className={mainStyle()}>
      <PostPageHeader dict={dict} />
      <PostPageBody dict={dict} username={username} unique={unique} />
    </div>
  );
}

const mainStyle = cva({
  base: {
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
