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
    const req_json = await req.json();
    const commentText = req_json.comment;

    const comment = await prisma.comment.create({
      data: {
        commentText: commentText,
        photoId: params.unique,
        userId: session.user?.id,
      },
      include: {
        user: true,
        photo: true,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 },
    );
  }
}
