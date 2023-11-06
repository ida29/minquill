// app/api/images/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Image } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  const images: Image[] = await prisma.image.findMany();
  const res: NextResponse = NextResponse.json(images);
  return res;
}
