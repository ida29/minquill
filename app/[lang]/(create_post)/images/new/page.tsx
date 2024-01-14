// app/[lang]/images/new/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { NewImage } from "@/app/_components/new_image";

export default async function App({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div
      data-theme="normal"
      data-color-mode="light"
      className={css({
        overflow: "auto",
        bg: "bg1",
      })}
    >
      <div
        className={css({
          marginRight: "auto",
          marginLeft: "auto",
          height: "100vh",
          width: "100vw",
        })}
      >
        <NewImage dict={dict} />
      </div>
    </div>
  );
}
