// app/[lang]/[username]/photos/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { PhotoPage } from "@/app/_components/photo_page";
import { Photo, getPhoto } from "@/app/_utils/photo";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  const photo: Photo = await getPhoto(unique);
  return <PhotoPage dict={dict} photo={photo} />;
}
