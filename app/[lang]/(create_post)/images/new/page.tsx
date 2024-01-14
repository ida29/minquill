// app/[lang]/images/new/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { NewImageHeader } from "@/app/_components/new_image_header";
import { NewImageBody } from "@/app/_components/new_image_body";

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
        <NewImageHeader dict={dict} />
        <NewImageBody dict={dict} />
      </div>
    </div>
  );
}