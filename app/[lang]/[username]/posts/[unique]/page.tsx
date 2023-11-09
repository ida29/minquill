// app/[lang]/[username]/posts/[unique]/page.tsx
//import { css, cva } from "@/styled-system/css";
import { getDictionary } from "@/app/[lang]/dictionary";
import { PostPageBody } from "@/components/post_page_body";
import { PostPageHeader } from "@/components/post_page_header";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  console.log(username);

  return (
    <>
      <PostPageHeader dict={dict} />
      <PostPageBody dict={dict} unique={unique} />
    </>
  );
}
