// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { User } from "@prisma/client";

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
      articles: {
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
