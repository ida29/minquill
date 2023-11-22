// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";
import { ulid } from "ulid";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(auth);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") as string;
    const count = Number(searchParams.get("count")) || 20;
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";

    const where = username ? { authorId: username } : {};

    const posts: Post[] = await prisma.post.findMany({
      where,
      take: count,
      orderBy: {
        createdAt: order,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create post" },
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
    const post: Post = await prisma.post.create({
      data: {
        title: req_json.title,
        content: req_json.content,
        coverImg: req_json.coverImg,
        ulid: ulid(),
        author: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
    return new NextResponse(`${post.id}`, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
