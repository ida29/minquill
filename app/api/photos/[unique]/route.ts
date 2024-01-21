// app/api/photos/[unique]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { Photo } from "@prisma/client";
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
  const photo: Photo | null = await prisma.photo.findUnique({
    where: {
      ulid: params.unique,
    },
    include: {
      photographer: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
      tags: true,
    },
  });
  return NextResponse.json(photo);
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
    const photo: Photo = await prisma.photo.update({
      where: {
        ulid: params.unique,
      },
      data: {
        title: req_json.title,
        tokenizedTitle: req_json.tokenizedTitle,
        photographer: {
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
    return new NextResponse(`${photo.id}`, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create photo" },
      { status: 500 },
    );
  }
}
