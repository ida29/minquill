// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { unique: string };
  },
) {
  const user: User | null = await prisma.user.findUnique({
    where: {
      username: params.unique,
    },
    include: {
      comments: true,
      likes: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          likes: true,
        },
      },
      followers: true,
      followings: true,
    },
  });
  return NextResponse.json(user);
}
