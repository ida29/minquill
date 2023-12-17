// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Post } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { unique: string };
  },
) {
  const post: Post | null = await prisma.post.findUnique({
    where: {
      ulid: params.unique,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
      tags: true,
    },
  });
  return NextResponse.json(post);
}
