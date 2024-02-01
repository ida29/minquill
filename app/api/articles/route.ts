// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";
import { Article } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { ulid } from "ulid";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") as string;
    const count = Number(searchParams.get("count")) || 20;
    const page = Number(searchParams.get("page")) || 1;
    const token = searchParams.get("token") as string;
    const tags = searchParams.getAll("tags") as string[];
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const mode = searchParams.get("mode") || "latest";

    let articles: Article[] = [];
    const skip = (page - 1) * count;

    if (mode === "recommended") {
    } else if (mode === "tags") {
      articles = await prisma.article.findMany({
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
          author: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    } else if (mode === "fulltext") {
      articles = await prisma.article.findMany({
        where: {
          tokenizedTitle: {
            search: token,
          },
          tokenizedContent: {
            search: token,
          },
        },
        take: count,
        orderBy: {
          createdAt: order,
        },
        include: {
          author: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    } else {
      const where = username ? { authorId: username } : {};
      articles = await prisma.article.findMany({
        where,
        skip,
        take: count,
        orderBy: {
          createdAt: order,
        },
        include: {
          author: true,
          comments: true,
          likes: true,
          tags: true,
        },
      });
    }

    return new NextResponse(JSON.stringify(articles), { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
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
    const article: Article = await prisma.article.create({
      data: {
        title: req_json.title,
        tokenizedTitle: req_json.tokenizedTitle,
        content: req_json.content,
        tokenizedContent: req_json.tokenizedContent,
        coverImg: req_json.coverImg,
        ulid: ulid(),
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
