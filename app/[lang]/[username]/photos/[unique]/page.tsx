// app/[lang]/[username]/photos/[unique]/page.tsx

import { getDictionary } from "@/app/_utils/dictionary";
import { PhotoPage } from "@/app/_components/photo_page";
import { Photo, getPhoto } from "@/app/_utils/photo";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export default async function App({
  params: { lang, username, unique },
}: {
  params: { lang: string; username: string; unique: string };
}) {
  const dict = await getDictionary(lang);
  const session = await getServerSession(auth);
  const photo: Photo = await getPhoto(unique);

  let isLikedByUser = false;
  if (session) {
    isLikedByUser = photo.likes?.some(
      (like) => like.user.id === session.user?.id,
    ) as boolean;
  }

  return <PhotoPage dict={dict} photo={photo} isLikedByUser={isLikedByUser} />;
}
