// app/api/images/[unique]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { Image } from "@prisma/client";
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
  const image: Image | null = await prisma.image.findUnique({
    where: {
      ulid: params.unique,
    },
    include: {
      user: true,
      comments: true,
      likes: true,
      tags: true,
    },
  });
  return NextResponse.json(image);
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
    const image: Image = await prisma.image.update({
      where: {
        ulid: params.unique,
      },
      data: {
        title: req_json.title,
        tokenizedTitle: req_json.tokenizedTitle,
        user: {
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
        url: req_json.url,
      },
    });
    return new NextResponse(`${image.id}`, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create image" },
      { status: 500 },
    );
  }
}
