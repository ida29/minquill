// app/api/images/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";
import { Image } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { ulid } from "ulid";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") as string;
    const count = Number(searchParams.get("count")) || 20;
    const token = searchParams.get("token") as string;
    const tags = searchParams.getAll("tags") as string[];
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const mode = searchParams.get("mode") || "latest";

    let images: Image[] = [];

    if (mode === "recommended") {
    } else if (mode === "tags") {
      images = await prisma.image.findMany({
        where: {
          tags: {
            some: {
              name: {
                in: tags,
              },
            },
          },
        },
        take: count,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    } else if (mode === "fulltext") {
      images = await prisma.image.findMany({
        where: {
          tokenizedTitle: {
            search: token,
          },
        },
        take: count,
        orderBy: {
          createdAt: order,
        },
        include: {
          user: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    } else {
      const where = username ? { username: username } : {};
      images = await prisma.image.findMany({
        where,
        take: count,
        orderBy: {
          createdAt: order,
        },
        include: {
          user: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    }

    return new NextResponse(JSON.stringify(images), { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to retrieve images" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  try {
    const req_json = await req.json();
    const image: Image = await prisma.image.create({
      data: {
        title: req_json.title,
        tokenizedTitle: req_json.tokenizedTitle,
        ulid: ulid(),
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
