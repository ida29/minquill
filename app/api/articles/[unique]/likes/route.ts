import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { unique: string };
  },
) {
  const session = await getServerSession(auth);
  if (!session || !session.user || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reqJson = await req.json();
    const isLike = reqJson.like;

    const existingLike = await prisma.like.findFirst({
      where: {
        AND: [{ articleId: params.unique }, { userId: session.user.id }],
      },
    });

    if (isLike) {
      if (existingLike) {
        return NextResponse.json(existingLike, { status: 200 });
      } else {
        const like = await prisma.like.create({
          data: {
            articleId: params.unique,
            userId: session.user.id,
          },
          include: {
            user: true,
            article: true,
          },
        });
        return NextResponse.json(like, { status: 200 });
      }
    } else {
      if (existingLike) {
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return NextResponse.json({ message: "Like removed" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Like not found" }, { status: 404 });
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 },
    );
  }
}
