// app/[lang]/[account]/posts/[unique]/page.tsx
//import { css, cva } from "@/styled-system/css";
import { getDictionary } from "@/app/[lang]/dictionary";
import { PostPageBody } from "@/components/post_page_body";
import { PostPageHeader } from "@/components/post_page_header";

export default async function App({
  params: { lang, account, unique },
}: {
  params: { lang: string; account: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  console.log(account);

  return (
    <>
      <PostPageHeader dict={dict} />
      <PostPageBody dict={dict} unique={unique} />
    </>
  );
}
