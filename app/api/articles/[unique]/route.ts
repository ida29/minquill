// app/api/articles/[unique]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { Article } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { unique: string };
  },
) {
  const article: Article | null = await prisma.article.findUnique({
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
  return NextResponse.json(article);
}

export async function POST(
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

  try {
    const req_json = await req.json();
    const article: Article = await prisma.article.update({
      where: {
        ulid: params.unique,
      },
      data: {
        title: req_json.title,
        tokenizedTitle: req_json.tokenizedTitle,
        content: req_json.content,
        tokenizedContent: req_json.tokenizedContent,
        coverImg: req_json.coverImg,
        author: {
          connect: {
            id: session?.user?.id,
          },
        },
        tags: {
          connectOrCreate: req_json.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
    return new NextResponse(`${article.id}`, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
