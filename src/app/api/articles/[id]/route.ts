import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin !== true) {
      return NextResponse.json(
        { message: "unauthorized, only admin can create article" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as UpdateArticleDto;
    const article = await prisma.article.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin !== true) {
      return NextResponse.json(
        { message: "unauthorized, only admin can create article" },
        { status: 401 }
      );
    }
    const article = await prisma.article.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        comments: true,
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    await prisma.article.delete({
      where: {
        id: Number(params.id),
      },
    });
    const commentIds: number[] = article?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
