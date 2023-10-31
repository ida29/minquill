// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/options";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  const posts: Post[] = await prisma.post.findMany();
  const res: NextResponse = NextResponse.json({ posts });
  return res;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
  }

  try {
    const req_json = await req.json();
    const post: Post = await prisma.post.create({
      data: {
        title: req_json.title,
        content: req_json.content,
        author: {
          connect: {
            id: session.user.id,
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
