import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(auth);

  if (!session) {
    return redirect("/");
  }

  return <>{children}</>;
}