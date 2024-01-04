// app/[lang]/[username]/posts/[unique]/page.tsx

import { getDictionary } from "@/app/[lang]/utils/dictionary";
import { PostPageWrapper } from "@/components/post_page_wrapper";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);

  return <PostPageWrapper dict={dict} username={username} unique={unique} />;
}
