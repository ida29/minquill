// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { unique: string };
  },
) {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  const post: Post | null = await prisma.post.findUnique({
    where: {
      ulid: params.unique,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
  return NextResponse.json(post);
}
